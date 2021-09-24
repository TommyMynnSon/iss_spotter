// Require(s)
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);

      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);

      return;
    }

    const { ip } = JSON.parse(body);

    callback(null, ip);
  });
};

/**
 * Makes a single API request to retrieve the coordinates (latitude, longitude) associated with the given IP address.
 * Input:
 *   - A string ip that represents the user's IP address
 *   - A callback (to pass back an error or the resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The latitude and longitude of the given IP address as an object
 */
const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);

      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates by IP. Response: ${body}`;
      callback(Error(msg), null);

      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = (coords, callback) => {
  const { latitude, longitude } = coords;

  request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);

      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times by coordinates. Response: ${body}`;
      callback(Error(msg), null);

      return;
    }

    const object = JSON.parse(body);
    const times = object.response;

    callback(null, times);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);

      return;
    }

    console.log('fetchMyIP: success');
    console.log('fetchMyIP result:', ip);

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        callback(error, null);

        return;
      }

      console.log('fetchCoordsByIP: success');
      console.log('fetchCoordsByIP result:', coordinates);

      fetchISSFlyOverTimes(coordinates, (error, times) => {
        if (error) {
          callback(error, null);

          return;
        }

        console.log('fetchISSFlyOverTimes: success');

        callback(null, times);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};