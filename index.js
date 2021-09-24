const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log(error);

    return;
  }

  console.log('fetchMyIP: success');
  console.log('fetchMyIP result:', ip);

  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log(error);

      return;
    }

    console.log('fetchCoordsByIP: success');
    console.log('fetchCoordsByIP result:', data);
  });
});