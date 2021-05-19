const config = require('../config');

const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const initSwagger = (app) => {
  const options = {
    swaggerDefinition: {
      info: {
        description: 'Swagger documentation for Comtravos backend challenge ',
        title: "Comtravo's Backend API Challenge :)",
        version: '1.0.0',
      },
      produces: ['application/json', 'application/xml'],
      host: config.server_host,
      schemes: [config.server_scheme],
      tags: [
        {
          name: 'List of flights',
          description: 'Flight endpoints',
        },
      ],
    },
    apis: ['./src/routers' + '/**/*.js'],
  }

  const swaggerDocument = swaggerJsdoc(options);

  //Begin using Swagger
  app.use('/api-comtravo-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument))
  app.get('/', function (req, res) {
    res.redirect('/api-comtravo-docs')
  })
};

module.exports = { initSwagger };
