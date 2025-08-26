// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.VITE_SUPABASE_KEY || '';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_KEY': JSON.stringify(SUPABASE_KEY),
  },
});