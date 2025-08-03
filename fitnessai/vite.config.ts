import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'node:url': path.resolve(__dirname, 'src/shims/minurl.js'),
      '#minpath': path.resolve(__dirname, 'src/shims/minpath.js'),
      '#minproc': path.resolve(__dirname, 'src/shims/minproc.js'),
      '#minurl': path.resolve(__dirname, 'src/shims/minurl.js'),
    }
  }
});
