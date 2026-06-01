import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/saludableya-dashboard/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          plotly: ['plotly.js-basic-dist-min'],
          react:  ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1600,
  },
  optimizeDeps: {
    include: ['plotly.js-basic-dist-min'],
  },
})
