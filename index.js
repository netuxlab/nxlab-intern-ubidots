// Import modules
import { config } from './config/environment.js'
import fastify from 'fastify'
import { generateRoutes } from './routes/index.js'

const { port } = config

// Configure fastify server
const server = fastify({
  logger: { level: 'info' },
})

generateRoutes(server)

// Start fastify server
try {
  await server.listen({ port })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
