const generateRoutes = (server) => {
  server.get('/ok', (request, reply) => {
    reply.status(204).send()
  })
}

export { generateRoutes }
