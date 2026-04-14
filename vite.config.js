import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
plugins: [react()],
optimizeDeps: {
include: ['three', '@react-three/fiber', '@react-three/drei'],
holdUntilResolved: true,
},
server: {
host: true,
port: 5173,
strictPort: true,


// allow cloudflare tunnel
allowedHosts: 'all',

hmr: {
  overlay: false,
},
watch: {
  usePolling: true,
  interval: 1000,
}


}
})
