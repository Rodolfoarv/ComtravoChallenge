// File that contains all the initial configuration of the project

const serverPort = process.env.PORT
  ? process.env.PORT
  : 8080

const config = {
  server_port : serverPort,
  username: process.env.USER,
  password: process.env.PASSWORD
}

module.exports = config