import { execSync } from 'child_process'
import { config } from './../config/environment.js'
import axios from 'axios'

const generateRoutes = (server) => {
  server.get('/ok', (request, reply) => {
    reply.status(204).send()
  })

  server.get('/date', (request, reply) => {
    const dateString = execSync('date', {
      encoding: 'utf-8',
      ...(process.platform === 'win32' ? { shell: 'C:\\Program Files\\Git\\bin\\bash.exe' } : {}),
    })

    reply.send({ data: dateString.slice(0, -1) })
  })

  server.post('/devices', async (request, reply) => {
    const { name } = request.body
    const response = await axios.post(
      'https://industrial.api.ubidots.com/api/v2.0/devices/',
      { name },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': config.ubidotsToken,
        },
      },
    )
    reply.send(response.data)
  })
}

export { generateRoutes }
