const cors = require('cors')
const express = require('express');
const responseTime = require('response-time')

// Import initialization of middlewares
const { initSwagger } = require('./middleware/swagger');

const initErrorHandler = (app) => {
  function errorHandler(e, req, res, next) {
    return res.status(500).json({
      status: 'error',
      message: e.message
    })
  }
  app.use(errorHandler);
}

// App configurations

const app = express();
app.disable('x-powered-by')
app.use(cors())
app.use(responseTime());
app.use(express.json({ type: 'application/json' }))
app.use('/api/flights', require('./routers/flightRouter')); // Merge this into a router file later on if we need more :) 
initErrorHandler(app);

// Middleware configurations

initSwagger(app);

module.exports = app;

