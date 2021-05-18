const config = require('../config');
const superagent = require('superagent');
const logger = require('../middleware/logger');

const fetchData = async (url, auth = false) => {
  try {
    const request = superagent.get(url).set('user-agent', 'comtravo-user');

    // This part will be used for source2
    if (auth) request.auth(config.username, config.password);

    // Response in 1 second
    const response = await Promise.race([
      request,
      new Promise((resolve) => setTimeout(() => resolve(null), 980)),
    ]);

    if (!response) {
      logger.warn(`source ${url} has time out. The limit is ${980}`);
      return null;
    }

    if (response.status !== 200) {
      logger.info('Handle status must be done', response);
      throw new Error('Status should be handled');
    }

    // Destructure the response
    const { data } = response;
    const { flightsInformation } = JSON.parse(data);
    return flightsInformation;
  } catch (e) {
    if (e.status === 401) {
      logger.error(`${url} returned Unauthorized response, (401)`);
      return null;
    } else if (e.status === 403) {
      logger.error(`${url} returned Forbidden, (403) Hint: Might be CORS 
      policy `);
      return null;
    } else if (e.status === 404) {
      logger.error(`${url} returned Not found, (404)`);
      return null;
    } else if (e.status === 500) {
      logger.error(`${url} Error from server, (500)`);
      return null;
    } else {
      logger.error(`${url} returned Error on response, (401)`);
    }
    throw e;
  }
};

module.exports = {
  fetchData,
};
