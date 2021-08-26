const request = require("postman-request");

// const forecast = (latitude, longitude, callback) => {
//   const url =
//     "http://api.weatherstack.com/current?access_key=733e54947e7936493256a30d1d176fa7&query=" +
//     latitude +
//     "," +
//     longitude +
//     "&units=f";

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect to weather services!", undefined);
//     } else if (response.body.error) {
//       callback("Unable to find location. Try another search.", undefined);
//     } else {
//       callback(
//         undefined,
//         response.body.current.weather_descriptions[0] +
//           `. It is currently ` +
//           response.body.current.temperature +
//           ` degrees out.`
//       );
//     }
//   });
// };

// module.exports = forecast;

//////////// USING DESTRUCTURING AND SHORTHAND

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=733e54947e7936493256a30d1d176fa7&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          `. It is currently ` +
          body.current.temperature +
          ` degrees out.`
      );
    }
  });
};

module.exports = forecast;
