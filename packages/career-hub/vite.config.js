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
  build: {
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: false,
    lib: {
      entry: 'src/index.js',
      name: 'CareerHub',
      fileName: (format) => `career-hub.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@reduxjs/toolkit', 'react-redux'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@reduxjs/toolkit': 'ReduxToolkit',
          'react-redux': 'ReactRedux',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, '../components/src'),
    },
  },
});
