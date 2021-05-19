const fetchDataService  = require("./fetchDataService");

const getFlights = async () => {
  try {
    // Add more endpoints if needed
    const requests = [
      fetchDataService.fetchData('https://discovery-stub.comtravo.com/source1'),
      fetchDataService.fetchData('https://discovery-stub.comtravo.com/source2', true)
    ]

    const results = await Promise.all(requests)

    return results
  } catch (err) {
    console.error(`Error in getFlights function: ${err.message}`)

    // throw other unhandled errors
    throw err
  }
}

const filterFlights = async () => {
  try {
    // TODO maybe work this out in a set with the keys

    // Fetch all of the flights from all of the endpoints
    const results = await getFlights()

    const flightStringIDs = []
    const flights = []
    let erasedDuplicateCount = 0;

    for (const result of results) {
      if (!result) { continue }

      for (const flight of result) {
        const str = JSON.stringify(flight)
        if (!flightStringIDs.includes(str)){
          flightStringIDs.push(str)
          flights.push(flight)
        }else{
          erasedDuplicateCount++
        }
      }
    }

    if (erasedDuplicateCount > 0) console.warn(`Removed a total of ${erasedDuplicateCount} duplicates`)

    return flights
  } catch (err) {
    console.error(`Error trying to merge: ${err.message}`)
    throw err
  }
}



module.exports = {
  filterFlights,
  getFlights
}
