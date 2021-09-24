const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./printPassTimes');

nextISSTimesForMyLocation()
  .then(printPassTimes)
  .catch((error) => {
    console.log('nextISSTimesForMyLocation error:', error.message);
  });