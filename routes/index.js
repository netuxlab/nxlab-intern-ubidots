import { execSync } from 'child_process'

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
}

export { generateRoutes }
