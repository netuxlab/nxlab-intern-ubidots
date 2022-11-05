import Fastify from 'fastify'
import { routes } from './routes/index.js'

const Server = Fastify({
  logger: { level: 'info' },
})

routes(Server)
const start = async () => {
  try {
    await Server.ready()
    await Server.listen({ port: 7000 })
  } catch (err) {
    Server.log.error(err)
    process.exit(1)
  }
}
start()
