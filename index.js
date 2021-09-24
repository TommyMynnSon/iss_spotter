const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log(error);

    return;
  }

  console.log('fetchMyIP: success');
  console.log('fetchMyIP result:', ip);

  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log(error);

      return;
    }

    console.log('fetchCoordsByIP: success');
    console.log('fetchCoordsByIP result:', coordinates);

    fetchISSFlyOverTimes(coordinates, (error, times) => {
      if (error) {
        console.log(error);

        return;
      }

      console.log('fetchISSFlyOverTimes: success');
      console.log('fetchISSFlyOverTimes result:', times);
    });
  });
});