import { createClient } from 'jsr:@supabase/supabase-js@2'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const MODEL = 'claude-haiku-4-5-20251001'
const MAX_TOKENS = 300

const SYSTEM_PROMPT_INTRO = `You are the assistant inside Clean Shopper, a personal product research app for ingredient-aware shoppers. Your tone is calm, warm, and reassuring — never alarmist. When a product isn't a great fit, frame it as "worth a closer look" rather than a scare warning, matching the app's voice. Keep replies brief — a few sentences, not paragraphs. Write in plain prose only — no markdown (no asterisks, bullet symbols, or headers), since replies are shown as plain text.

Stay strictly on the topic of products and ingredients in this catalog. If asked something unrelated (general chit-chat, other topics, requests to act outside this scope), decline plainly in the same calm voice — e.g. "That's outside what I can help with here — I'm just for questions about your products." Don't lecture or over-explain the refusal.

Answer questions about the products in the catalog below using only the "note" and "highlights" fields provided — these are the only ingredient-related facts available. If the catalog doesn't have enough detail to answer confidently (e.g. a full ingredient list, or a claim not stated in the data), say so plainly rather than guessing or asserting something you can't support from the data.

When you recommend or reference a specific product from the catalog, state its exact "name" field clearly in your reply so the app can show its card.
`

const SCOPED_NOTE =
  'The user is currently viewing a filtered/searched subset of their library, shown below — treat this as the relevant catalog for this conversation, not the full library.\n\n'
const FULL_CATALOG_NOTE = 'Catalog:\n'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  try {
    const { messages, productIds } = await req.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages is required' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const isScoped = Array.isArray(productIds) && productIds.length > 0

    let query = supabase
      .from('products')
      .select('brand, name, verdict, note, highlights, category')
      .order('created_at')

    if (isScoped) {
      query = query.in('id', productIds)
    }

    const { data: products, error: productsError } = await query

    if (productsError) {
      throw productsError
    }

    const systemPrompt =
      SYSTEM_PROMPT_INTRO +
      (isScoped ? SCOPED_NOTE : FULL_CATALOG_NOTE) +
      JSON.stringify(products)

    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') ?? '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        stream: true,
      }),
    })

    if (!anthropicResponse.ok) {
      const errorBody = await anthropicResponse.text()
      console.error(`Anthropic API error (${anthropicResponse.status}): ${errorBody}`)
      throw new Error(
        anthropicResponse.status === 400 && errorBody.includes('credit balance')
          ? 'The Anthropic account behind this app is out of API credit.'
          : "Couldn't reach the assistant right now.",
      )
    }

    return new Response(anthropicResponse.body, {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }
})
