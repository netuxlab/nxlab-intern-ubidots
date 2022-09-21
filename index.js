// Import modules
import { config } from './config/environment.js'
import fastify from 'fastify'

const { port } = config

// Configure fastify server
const server = fastify({
  logger: { level: 'info' },
})

server.get('/ok', (request, reply) => {
  reply.status(204).send()
})

// Start fastify server
try {
  await server.listen({ port })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
