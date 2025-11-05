import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import Terminal from 'vite-plugin-terminal'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), Terminal({ console: 'terminal' })],
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
          target: 'http://vivobook.local:8080/rest',
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(/^\/rest/, '');
          },
          configure: (proxy, _options) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              proxyReq.setHeader('authorization', `Basic ${Buffer.from(`${env.API_TOKEN}:`).toString('base64')}`)
            });
          }
        }
      }
    }
  }
})
