import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Terminal from 'vite-plugin-terminal'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), Terminal({console: 'terminal'})],
  server: {
    proxy: {
      '/pokeapi/': {
        target: 'https://pokeapi.co/api/v2/',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/pokeapi/, '');
        },
      },
      '/rest/': {
        target: 'https://vivobook.local:8080/rest',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/rest/, '');
        },
      }
    }
  }
})
