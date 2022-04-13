import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unplugin from '../src/vite'

export default defineConfig({
  plugins: [
    react(),
    Unplugin(),
  ],
})
