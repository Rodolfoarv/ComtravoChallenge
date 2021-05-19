describe('Testing server starting and shutting down', function () {
  const server = require('../src/index')

  it('Should startup and stop server', async function () {
    await server.stopServer()
  })
})
