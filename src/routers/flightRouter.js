const express = require('express')
const router = express.Router()

const controller = require("../controllers/flightsController");

/**
 * @swagger
 * /api/flights/:
 *   get:
 *     tags:
 *       - flights
 *     description: Endpoint listing all of the flights, removing duplicates, merging them and send them into the client. Returns within 1 seconds and return null if 3rd party providers fail in the action.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return a list of flights (removing duplicates and merging endpoints)
 *       500:
 *         description: Return internal server error
 */
 router.get('/', controller.get)

 module.exports = router