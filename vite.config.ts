import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// In development, Vite runs inside the Express server (server/index.ts), so
// `npm run dev` serves both the website and the /api routes on one port.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
