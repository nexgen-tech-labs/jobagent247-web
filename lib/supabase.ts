'use server'

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Browser client — uses anon key, respects RLS
// Import from @/lib/supabase-browser on the client side
export function createBrowserClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Server client with Clerk JWT — used in API routes and Server Components
// Pass the Clerk session token so Supabase RLS resolves auth.uid() correctly
export function createServerClient(clerkToken: string) {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${clerkToken}`,
      },
    },
  })
}

// Service role client — bypasses RLS, only for admin operations
// (scraper writes, webhook handlers, migrations)
export function createAdminClient() {
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  })
}
