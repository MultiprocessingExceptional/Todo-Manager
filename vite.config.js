import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// Vite configuration
export default defineConfig({
  plugins: [
    react(),
    visualizer({ 
      open: true, // Open the bundle analyzer report in the browser
      gzipSize: true, 
      brotliSize: true
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Additional chunking as needed
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Set chunk size warning limit (in KiB)
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') // Example alias for shorter imports
    }
  }
});
