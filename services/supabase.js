import { createClient } from "@supabase/supabase-js";

const { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } = import.meta.env;

console.log(import.meta.env);
// console.log("key", VITE_SUPABASE_KEY, "url", VITE_SUPABASE_URL);

export const supabaseUrl = VITE_SUPABASE_URL;
const supabaseKey = VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
