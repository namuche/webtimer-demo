// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Lee las variables aquí (Node.js)
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_KEY || '';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
    'import.meta.env.VITE_SUPABASE_KEY': JSON.stringify(supabaseKey),
  },
});
