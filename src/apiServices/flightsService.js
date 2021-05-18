const { logger } = require('../middlewares/logger')
const { fetchDataService } = require("./fetchDataService");

const getFlights = async () => {
  try {
    const requestEndpoints = [
      fetchDataService.fetchData('https://discovery-stub.comtravo.com/source1'),
      fetchDataService.fetchData('https://discovery-stub.comtravo.com/source2', true)
    ];
    
    const results = await Promise.all(requests);
    return results;
  }catch (e){
    logger.error(`Cannot fetch getFlights, getFlights function produced the following error ${e.message}`);
    throw e;
  }
}

const filterFlights = async () => {
  // Function in charge of Merging, Removing duplicates and sending them back
  try {
    const results = await getFlights();
    const flights = [];
    const stringifiedFlights = [];

    // TODO: Make this either a Hashmap with a filter of key.
    for (const flightArray in results){
      if (!flightArray) continue
      for (const flight in flightArray){
        const strData = JSON.stringify(flight);
        if (!stringifiedFlights.includes(strData)){
          stringifiedFlights.push(strData);
          flights.push(flight);
        }
      }
    }
    return flights;
  } catch (e){
    logger.error(`Error filtering flights ${e.message}`);
    throw e;
  }
}

module.exports = {
  getFlights,
  filterFlights
}