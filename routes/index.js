import { config } from './../config/environment.js'
import axios from 'axios'

const generateRoutes = (server) => {
  server.get(`/devices/:variableId`, async (request, reply) => {
    const { variableId } = request.params

    const data = await axios.get(`https://industrial.api.ubidots.com/api/v1.6/variables/${variableId}/values`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': 'BBFF-LIhoV202JzmTundHfb3xVfki6QfuEb',
      },
    }) //para sacar los datos de la variable
    const values = data.data.results.map((element) => {
      return element.value
    })
    console.log('values', values)

    //  muestra los datos de la variable
    const media_calculada = calculateMean(data.data.results)
    const longitud = data.length
    console.log('longitud del array' + data.length)
    reply.send({ media: media_calculada, longitud })
  })
}
// total de datos que se encuentran en la variable
const calculateMean = (data) => {
  if (data) {
    var total = 0
    const longitud = data.length
    console.log('longitud', longitud)
    for (const dato = 0; dato < longitud; dato++) {
      total += data[dato]
    }
    const media = total / longitud
    return media
  } else {
    return null
  }
  // sumatoria de todos los datos
  const suma = [values]
  let sum = 0
  for (let i = 0; i < suma.length; i++) {
    sum += suma[i]
  }
  console.log('resultado', resultado)
  // resultado de la sumatoria divido 2 que seria la media aritmetrica
  var resultado = Function(suma / 2)
}
export { generateRoutes }
