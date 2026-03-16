import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Output to 'build' instead of 'dist' for Render
    chunkSizeWarningLimit: 1500, // Suppress the warning by increasing limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-syntax-highlighter')) return 'syntax-highlighter';
            if (id.includes('react-markdown') || id.includes('remark')) return 'markdown';
            return 'vendor';
          }
        }
      }
    }
  }
})
