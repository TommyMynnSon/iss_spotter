
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// Require(s)
const request = require('request');

// Use request to fetch IP address from JSON API
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, body);
    }

    const object = JSON.parse(body);
    const ip = object['ip'];

    callback(error, ip);
  });
};

module.exports = { fetchMyIP };