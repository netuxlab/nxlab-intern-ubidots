import { config } from './config/environment.js'
import fastify from 'fastify'
import axios from 'axios'

const updServer = fastify({
  logger: { level: 'info' },
  ignoreDuplicateSlashes: true,
})

updServer.get('/ok', (request, reply) => {
  reply.status(204).send()
})

updServer.post('/devices', async (request, reply) => {

  const deviceId = request.query.id
  const device = await axios.get(`https://industrial.api.ubidots.com/api/v2.0/devices/${deviceId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': config.ubidotsToken,
      },
    },)
  console.log(device)
})

updServer.patch('/devices', async (request, reply) => {
  const { name, description, properties:modelo, properties:lat, properties:lng } = request.body
  const deviceId = request.query.id
  const device = await axios.get(`https://industrial.api.ubidots.com/api/v2.0/devices/${deviceId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': config.ubidotsToken,
      },
    },)
  if (device) {
    axios.patch(`https://industrial.api.ubidots.com/api/v2.0/devices/${deviceId}`,
      { name, description, properties:modelo, properties:lat, },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': config.ubidotsToken,
        }
      }
    )
    console.log("Campos actualizados correctamente");
  } else {
    console.log("El dispositivo no existe");
  }
})



const start = async () => {
  try {
    await updServer.ready()
    await updServer.listen(8000, '0.0.0.0')
  }
  catch (err) {
    updServer.log.error(err)
    process.exit(1)
  }
}

start()





console.log(config)
