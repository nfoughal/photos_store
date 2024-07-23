'use client'

import { createBrowserClient } from "@supabase/ssr";

console.log('Supabase URL1111111:', process.env.NABIL);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createBrowserClient(supabaseUrl,supabaseAnonKey)

export { supabase }