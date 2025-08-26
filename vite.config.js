// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Forzamos la lectura de variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.VITE_SUPABASE_KEY || '';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_KEY': JSON.stringify(SUPABASE_KEY),
  },
  // Aseguramos que Vite no falle en modo producción
  build: {
    sourcemap: false,
    minify: true,
  },
});