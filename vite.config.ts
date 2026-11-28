import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

export default defineConfig(({ command }) => ({
  plugins: [
    {
      name: 'published-education-only',
      enforce: 'pre',
      load(id) {
        const path = id.split('?')[0];
        if (command === 'build' && path.endsWith('/src/data/education.json')) {
          const data = JSON.parse(readFileSync(path, 'utf8'));
          return JSON.stringify(data.filter((article: { status: string }) => article.status === 'published'));
        }
      },
    },
    react(),
  ],
  server: { allowedHosts: ['terminal.local'] },
}))
