import Fastify from 'fastify'
import { generateRoutes } from './routes/index.js'
import { config } from './config/environment.js'

const server = Fastify({
  logger: { lavel: 'info' },
})

const port = config.port
generateRoutes(server)

try {
  await server.listen({ port })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
