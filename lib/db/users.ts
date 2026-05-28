import type { SupabaseClient } from '@supabase/supabase-js'
import type { User } from '../types/database'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = SupabaseClient<any>

export async function getUserByClerkId(db: Client, clerkId: string): Promise<User | null> {
  const { data } = await db
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single()
  return data as User | null
}

export async function upsertUser(
  db: Client,
  payload: Omit<User, 'id' | 'created_at'>
): Promise<User> {
  const { data, error } = await db
    .from('users')
    .upsert(payload, { onConflict: 'clerk_id' })
    .select()
    .single()
  if (error) throw error
  return data as User
}

export async function updateUser(
  db: Client,
  clerkId: string,
  updates: Partial<Omit<User, 'id' | 'clerk_id' | 'created_at'>>
): Promise<User> {
  const { data, error } = await db
    .from('users')
    .update(updates)
    .eq('clerk_id', clerkId)
    .select()
    .single()
  if (error) throw error
  return data as User
}
