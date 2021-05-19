// File that contains all the initial configuration of the project
require('dotenv').config();

const serverPort = process.env.PORT
  ? process.env.PORT
  : 8080

const serverHost = process.env.PORT ?
  process.env.SWAGGER_HOST : 'localhost:8080'

const config = {
  server_host : serverHost,
  server_port : serverPort,
  server_scheme : 'http',
  username: process.env.API_USER,
  password: process.env.API_PASSWORD
}

module.exports = config