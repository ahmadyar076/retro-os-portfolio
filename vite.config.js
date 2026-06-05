import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // react-draggable (used by react-rnd) reads `process.env.DRAGGABLE_DEBUG`
  // inside its drag handler. `process` doesn't exist in the browser, so without
  // this the reference throws "process is not defined" and dragging silently
  // fails. Replace it at build time (and pre-bundle) so the reference is gone.
  define: {
    'process.env.DRAGGABLE_DEBUG': 'false',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        'process.env.DRAGGABLE_DEBUG': 'false',
      },
    },
  },
})
