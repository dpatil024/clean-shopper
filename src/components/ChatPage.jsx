import { useState } from 'react'
import AssistantProductCard from './AssistantProductCard'
import Button from './Button'
import { sendChatMessage } from '../lib/api/chat'

function findMentionedProduct(reply, products) {
  return products.find((product) => reply.includes(product.name))
}

// Anthropic requires strict user/assistant alternation. Guard the payload
// against malformed turns (e.g. a dropped role, or two same-role turns in a
// row) by coercing every entry and merging adjacent same-role messages.
function toApiMessages(uiMessages) {
  const turns = []
  for (const message of uiMessages) {
    const role = message.role === 'assistant' ? 'assistant' : 'user'
    if (!message.content) continue
    const last = turns[turns.length - 1]
    if (last && last.role === role) {
      last.content += '\n\n' + message.content
    } else {
      turns.push({ role, content: message.content })
    }
  }
  return turns
}

export default function ChatPage({
  products,
  contextProducts,
  isFiltered,
  onToggleList,
  onHome,
}) {
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    const content = draft.trim()
    if (!content || isSending) return

    const nextMessages = [...messages, { role: 'user', content }]
    setMessages(nextMessages)
    setDraft('')
    setIsSending(true)
    setError(null)

    let assistantIndex = null

    try {
      const productIds = isFiltered
        ? contextProducts.map((product) => product.id)
        : undefined

      const reply = await sendChatMessage(toApiMessages(nextMessages), productIds, (accumulated) => {
        setMessages((current) => {
          if (assistantIndex === null) {
            assistantIndex = current.length
            return [...current, { role: 'assistant', content: accumulated }]
          }
          const updated = [...current]
          updated[assistantIndex] = { ...updated[assistantIndex], content: accumulated }
          return updated
        })
      })

      const mentionedProduct = findMentionedProduct(reply, products)
      if (assistantIndex !== null) {
        setMessages((current) => {
          const updated = [...current]
          updated[assistantIndex] = { ...updated[assistantIndex], product: mentionedProduct }
          return updated
        })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onHome}
          className="w-fit text-xs font-medium uppercase tracking-wide text-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Clean Shopper
        </button>
        <h1 className="font-display text-4xl leading-tight text-ink">
          Ask Clean Shopper
        </h1>
        <p className="max-w-[60ch] text-sm text-ink-soft">
          Ask about products in your library — fragrance-free options,
          whether something suits sensitive skin, or how two products
          compare.
        </p>
        {isFiltered && (
          <p className="w-fit rounded-pill border border-border-strong px-2.5 py-1 text-xs font-medium text-ink-soft">
            Scoped to your current filter — {contextProducts.length} product
            {contextProducts.length === 1 ? '' : 's'}
          </p>
        )}
      </header>

      <div className="flex flex-col gap-4">
        {messages.length === 0 && (
          <p className="text-sm text-ink-soft">
            Try: "Which of my clean products has fragrance?"
          </p>
        )}

        {messages.map((message, index) =>
          message.role === 'user' ? (
            <div key={index} className="flex justify-end">
              <p className="max-w-[70%] rounded-card bg-surface px-4 py-3 text-sm text-ink">
                {message.content}
              </p>
            </div>
          ) : (
            <div key={index} className="flex flex-col items-start gap-3">
              <p
                aria-live="polite"
                aria-atomic="true"
                className="max-w-[70%] rounded-card border border-border bg-panel px-4 py-3 text-sm leading-relaxed text-ink"
              >
                {message.content}
              </p>
              {message.product && (
                <div className="max-w-md">
                  <AssistantProductCard
                    image={message.product.image}
                    imageAlt={message.product.imageAlt}
                    brand={message.product.brand}
                    name={message.product.name}
                    verdict={message.product.verdict}
                    note={message.product.note}
                    onAddToList={() => onToggleList(message.product.id)}
                  />
                </div>
              )}
            </div>
          ),
        )}

        {isSending && messages[messages.length - 1]?.role !== 'assistant' && (
          <p className="text-sm text-ink-soft" role="status">
            Thinking…
          </p>
        )}

        {error && (
          <p className="text-sm text-avoid" role="alert">
            Couldn't reach the assistant ({error}). Try again.
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-pill border-2 border-border-strong bg-panel px-4 py-2.5 focus-within:border-ink"
      >
        <label htmlFor="chat-composer" className="sr-only">
          Ask a question
        </label>
        <input
          id="chat-composer"
          type="text"
          placeholder="Ask about a product or ingredient"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
        />
        <Button variant="primary" type="submit">
          Send
        </Button>
      </form>
    </div>
  )
}
