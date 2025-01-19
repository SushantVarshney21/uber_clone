const axios = require('axios');
const captainModel = require('../models/captain.model')

module.exports.getCoordinates = async (address) => {
  try {
    const apiKey = process.env.MAPS_API;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
    const response = await axios.get(url);

    if (response.data.status === "OK" && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng
      };
    } else {
      throw new Error(`Geocoding error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};







module.exports.getDistanceTime = async (origins, destinations) => {
    try {
        if (!origins || !destinations) {
            throw new Error("Origin and destination must be provided.");
        }

        const apiKey = process.env.MAPS_API;

        const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(destinations)}&origins=${encodeURIComponent(origins)}&key=${apiKey}`;

        const response = await axios.get(url);
        const  data = response.data;

        if (data.status === "OK") {
            const result = data.rows[0];
            const distance = result.elements[0].distance; // Confirm these fields in the response structure.
            const duration = result.elements[0].duration; // Confirm these fields in the response structure.

            return { distance, duration };
        } else {
            throw new Error(`API response error: ${data.status || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error fetching distance and time:", error.message);
        throw new Error("Unable to fetch distance and time. Please verify the API configuration.");
    }
};




module.exports.getSuggestions = async(input)=>{
  try{
    const apiKey = process.env.MAPS_API;
    const encodedInputs = encodeURIComponent(input);
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodedInputs}&key=${apiKey}`;
    const response = await axios.get(url);
    if(response.data.status === "OK"){
      return response.data.predictions;
    }else{
      throw new Error(`API response error: ${response.data.status || "Unknown error"}`);
    }
    }catch(error){
    console.error("Error fetching suggestions:", error.message);
    throw error;
    }
}


module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

  // radius in km


  const captains = await captainModel.find({
      location: {
          $geoWithin: {
              $centerSphere: [ [ ltd, lng ], radius / 6371 ]
          }
      }
  });

  return captains;


}