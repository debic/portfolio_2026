import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Priorizar .tsx y .ts sobre .jsx y .js
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
})
