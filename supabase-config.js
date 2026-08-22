// ============================================
// CONFIGURATION SUPABASE
// ============================================
// Remplace les valeurs ci-dessous par celles de ton projet Supabase.
// Tu les trouves dans : Supabase Dashboard > Project Settings > API
//
// ATTENTION : la clé "anon/public" peut être exposée côté client (c'est prévu
// pour ça), mais la sécurité réelle se fait via les règles RLS (Row Level
// Security) dans Supabase, comme pour l'appli famille.

const SUPABASE_URL = "https://rczjinjvhbwfdeyioawy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjemppbmp2aGJ3ZmRleWlvYXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczOTg1ODUsImV4cCI6MjEwMjk3NDU4NX0.oC8g37v8yrJM5yIWQcV7OSCEMU2TE_V1EI2NCemiKqg";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
