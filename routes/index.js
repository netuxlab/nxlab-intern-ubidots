import { config } from './../config/environment.js'
import axios from 'axios'

function routes(Server) {
  Server.post('/device', async (request, reply) => {
    const { temperature } = request.body
    let response
    if (temperature > 0) {
      response = await axios.post(
        'https://industrial.api.ubidots.com/api/v1.6/devices/test-intern/temperatura/values',
        { value: temperature },

        {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': config.ubidotsToken,
          },
        },
      )
      response = response.data
    } else {
      response = { error: 'dato fuera del rango' }
    }
    reply.send(response)
  })
}

export { routes }
