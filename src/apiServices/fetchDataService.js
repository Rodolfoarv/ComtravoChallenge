const config = require('../config');
const superagent = require('superagent');


const fetchData = async (url, auth = false) => {
  try {
    const request = superagent.get(url)
      .set('user-agent', 'comtravo-comsumer')

    if (auth) {
      request.auth(config.username, config.password)
    }

    const res = await Promise.race([request, new Promise(resolve => setTimeout(() => resolve(null), 980))])

    if (!res) {
      console.warn(`${url} has timeouted (limit: 980ms). Minimum request time is 1 second`)
      return null
    }

    if (res.status !== 200) {
      console.info('Error while processing flights', res)
      throw new Error('Status should be handled')
    }
    const { text } = res
    const { flights } = JSON.parse(text)

    console.info(`The endpoint ${url} has returned a total of (${flights.length}) flights.`)

    return flights
  } catch (err) {
    if (err.status === 401) {
      console.error(`${url} Authentication Failure (401).`)
      return null
    }

    if (err.status === 403) {
      console.error(`${url} Rate Limit Error (403).`)
      return null
    }

    if (err.status === 404) {
      console.error(`${url} Resource Not Found (404).`)
      return null
    }

    if (err.status >= 500) {
      console.error(`Server is not available. ${url} returned Server error (500).`)
      return null
    }

    console.error(`${url} throwed error.`)
    // throw other unhandled errors
    throw err
  }
}

module.exports = {
  fetchData
}
