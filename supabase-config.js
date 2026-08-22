// ============================================
// CONFIGURATION SUPABASE
// ============================================
// Remplace les valeurs ci-dessous par celles de ton projet Supabase.
// Tu les trouves dans : Supabase Dashboard > Project Settings > API
//
// ATTENTION : la clé "anon/public" peut être exposée côté client (c'est prévu
// pour ça), mais la sécurité réelle se fait via les règles RLS (Row Level
// Security) dans Supabase, comme pour l'appli famille.

const SUPABASE_URL = "https://TON-PROJET.supabase.co";
const SUPABASE_ANON_KEY = "TA_CLE_ANON_PUBLIC";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
