import { supabase as sharedSupabase } from '../../../lib/supabase';

export const hasPharmGuardSupabaseConfig = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const supabase = sharedSupabase;
