import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@components/styles/theme.scss" as *;`,
      },
    },
  },
  root: '.',
  publicDir: 'public',
  server: {
    port: 3000,
    open: '/standalone.html',
    proxy: {
      // Proxy all API requests to the backend
      '/job-tracker': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, '../components/src'),
    },
  },
  build: {
    outDir: 'dist-standalone',
    emptyOutDir: true,
    rollupOptions: {
      input: './standalone.html',
    },
  },
});

