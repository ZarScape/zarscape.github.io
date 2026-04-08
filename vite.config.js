import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@react-three/drei')) {
            return 'three-drei';
          }

          if (id.includes('@react-three/fiber')) {
            return 'three-fiber';
          }

          if (id.includes('\\three\\') || id.includes('/three/')) {
            return 'three-core';
          }

          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
