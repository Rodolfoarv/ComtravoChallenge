const {configureRequestLogger, configureErrorLogger, logger} = require("./middleware/logger");

const express = require('express');
const app = express();
// Initial configurations for the project, TODO: Cors policy and Swagger
configureRequestLogger(app);
configureErrorLogger(app);

module.exports = app;

