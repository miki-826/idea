import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const HAS_SUPABASE = Boolean(url && anonKey);

export const supabase = HAS_SUPABASE ? createClient(url!, anonKey!) : null;
