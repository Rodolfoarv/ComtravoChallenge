const config = require('./config')

let server;

async function initializeServer () {
  try {
    const app = require('./app');
    server = app.listen(config.server_port);
    const port = server.address().port

    console.log(`App started listening at port: ${port}`)
  } catch (e){
    console.error(`Express failed to initiate at port ${port}` + e);
  }
}

exports.stopServer = async () => {
  await server.close()
}