import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Edit `base` before deploying to GitHub Pages if needed
export default defineConfig({
  plugins: [react()],
  base: '/AI-PM-Assistant-React/'
})
