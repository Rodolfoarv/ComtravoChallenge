import {filterFlights} from "../apiServices/flightsService";

exports.get = async (req, res, next) => {
  try {
    const flightsResult = await filterFlights();
    return res.status(200).json({ flights });
  }catch (e){
    next (e);
  }
}