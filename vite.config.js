// vite.config.js
export default {
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(import.meta.env.VITE_SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_KEY': JSON.stringify(import.meta.env.VITE_SUPABASE_KEY)
  }
}