const axios = require("axios").default;
require("dotenv").config();

exports.postcodeToCoordinates = async (req, res) => {
  const { postcode } = req.body;
  const options = {
    method: "GET",
    url: `https://digitalapi.auspost.com.au/locations/v2/points/postcode/${postcode}`,
    headers: {
      "AUTH-KEY": process.env.AUSPOST_API_KEY,
      //   "Content-Type": "application/json",
    },
  };
  let response;
  let data;
  try {
    response = await axios(options);
    data = await response.data.points[0].geo_location;
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(400);
  }
  console.log(data);
  return res.json(data);
};
