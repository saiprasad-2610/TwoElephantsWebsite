import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
    holdUntilResolved: true,
  },
  server: {
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    }
  }
})
