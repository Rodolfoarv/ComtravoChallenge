const flightService = require ('../apiServices/flightsService');

exports.get = async (req, res, next) => {
  try {
    const flightsResult = await flightService.filterFlights();
    return res.status(200).json({ flightsResult });
  }catch (e){
    next (e);
  }
}