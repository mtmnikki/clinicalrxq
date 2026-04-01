import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = import.meta.env.VITE_PHARMGUARD_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = import.meta.env.VITE_PHARMGUARD_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasPharmGuardSupabaseConfig = Boolean(rawSupabaseUrl && rawSupabaseAnonKey);

const supabaseUrl = rawSupabaseUrl || 'https://invalid.local';
const supabaseAnonKey = rawSupabaseAnonKey || 'missing-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
