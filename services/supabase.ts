import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
        console.warn('Supabase credentials missing. Local persistence will be used.');
    }
}

// Ensure createClient is only called with a valid URL to avoid build-time crashes
export const supabase = (supabaseUrl && supabaseUrl.startsWith('http'))
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({ select: () => ({ order: () => ({ limit: () => Promise.resolve({ data: [] }) }), eq: () => ({ single: () => Promise.resolve({ data: null }) }), upsert: () => Promise.resolve({}), insert: () => Promise.resolve({}) }), update: () => ({ eq: () => Promise.resolve({}) }) }),
        auth: {
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            getUser: () => Promise.resolve({ data: { user: null } }),
            signInWithPassword: () => Promise.resolve({ error: new Error('Supabase not configured') }),
            signUp: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        },
        channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
        removeChannel: () => { }
    } as any;
