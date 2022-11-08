import { execSync } from 'child_process'
import { config } from './../config/environment.js'
import axios from 'axios'

const generateRoutes = (server) => {
  server.post('/devices', async (request, reply) => {
    console.log(request.body)
    const data = request.body
    console.log('Acá llegó', config.ubidotsToken)
    const response = await axios.post(
      'https://industrial.api.ubidots.com/api/v2.0/devices/',
      data,

      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': config.ubidotsToken,
        },
      },
    )
    reply.send(response.data)
  })

  server.post('/devices/:deviceId/variables/_/bulk/create', async (request, reply) => {
    const data = request.body
    const deviceId = request.params.deviceId

    const response = await axios.post(
      `https://industrial.api.ubidots.com/api/v2.0/devices/${deviceId}/variables/_/bulk/create`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': config.ubidotsToken,
          'X-Bulk-Operation': true,
        },
      },
    )
    reply.send(response.data)
  })
}
export { generateRoutes }
