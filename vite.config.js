import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Local dev plugin to execute Netlify functions directly inside `npm run dev`
 * without requiring Netlify CLI to be running!
 */
function netlifyFunctionsPlugin() {
  return {
    name: 'netlify-functions-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (url.startsWith('/.netlify/functions/chat') || url.startsWith('/api/chat')) {
          try {
            const chunks = []
            for await (const chunk of req) {
              chunks.push(chunk)
            }
            const bodyStr = Buffer.concat(chunks).toString('utf-8')

            const { handler } = await import('./netlify/functions/chat.js')

            const event = {
              httpMethod: req.method,
              headers: req.headers,
              body: bodyStr,
            }

            const result = await handler(event)

            res.statusCode = result.statusCode || 200
            if (result.headers) {
              for (const [key, value] of Object.entries(result.headers)) {
                res.setHeader(key, value)
              }
            }
            res.end(result.body || '')
            return
          } catch (err) {
            console.error('[netlify-functions-dev error]:', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
            return
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || ''
  process.env.VITE_GEMINI_API_KEY = env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || ''

  return {
    plugins: [react(), netlifyFunctionsPlugin()],
  }
})
