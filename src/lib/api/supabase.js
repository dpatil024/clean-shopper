import { createClient } from '@supabase/supabase-js'

// Fall back to a syntactically-valid placeholder so createClient doesn't
// throw at import time when env vars aren't set yet — the resulting network
// failure is caught in fetchProducts() instead, producing a real error state
// rather than crashing the whole app before React can render anything.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
