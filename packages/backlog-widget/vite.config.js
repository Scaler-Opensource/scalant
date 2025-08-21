import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,

    lib: {
      entry: 'src/index.js',
      name: 'BacklogWidget',
      fileName: (format) => `backlog-widget.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
