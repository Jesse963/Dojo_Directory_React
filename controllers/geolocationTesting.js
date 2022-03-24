const Location = require("../models/australias");

exports.retrieveLocations = async (req, res) => {
  let altered = [];
  let suburbs = await Location.find({});
  suburbs.forEach((suburb, i) => {
    suburbs[i].location = [suburb.lon, suburb.lat];
    altered.push(suburb);
    console.log(suburbs[i].location);
    // if (i == suburbs.length - 1) {
    //   // console.log(altered);
    // }
  });
  //   console.log(altered);
  return res.json("Finished");
};

exports.postSuburb = async (req, res) => {
  //   const postcode = new Location({
  //     postcode: 90000,
  //     suburb: "Test",
  //     state: "NSW",
  //     lat: -35.277272,
  //     lon: 149.117136,
  //   });
  //   await postcode.save();
  //   res.json("success");
};

// lat:-33.857857,lon:151.103502
