const Tag = require("../models/tags");
const Dojo = require("../models/dojos");
const { retrieveAllDBEntries } = require("./dojosController");
require("dotenv").config();

exports.submitTagsArray = async (req, res) => {
  const { tags } = req.body;
  tags.forEach(async (tag) => {
    try {
      const tagSubmission = new Tag({
        tag: tag,
      });
      await tagSubmission.save();
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: `Error adding new tag to database: ${error}`,
      });
    }
  });
  return res.status(200).json({ success: "True" });
};

exports.getTags = async (req, res) => {
  return res.json({ tags: await Tag.find({}) });
};

exports.generateScores = async (req, res) => {
  let scoredSchools = [];
  console.log(req.body);
  const { userTags } = req.body;
  // let schools = await Dojo.find({});

  // Find all schools within a max distance (10km def) from user coords
  console.log("new request");
  // const { coordinates = [151.103139, -33.857232], maxDistance = 100000 } =
  const { coordinates, maxDistance } = req.body;
  console.log(coordinates, maxDistance);
  let schools = await Dojo.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        $maxDistance: maxDistance,
      },
    },
  });

  await schools.forEach(async (school, i) => {
    const matchArray = await userTags.filter((tag) =>
      school.tags.includes(tag)
    );
    const matchCount = matchArray.length;
    const missCount = school.tags.length - matchCount;
    // const score = 41.7 * Math.log(matchCount + 1);
    const score =
      (900 * Math.exp(-0.5 * (matchCount - 10))) /
      (2 * Math.pow(1 + Math.exp(-0.5 * (matchCount - 10)), 2));

    // const score = Math.exp(matchCount) - 0.25 * Math.exp(missCount);
    // console.log(school.tags, matchCount, missCount, score);

    const distance = distanceBetweenCoordinates(
      coordinates,
      school.location.coordinates
    );

    const distancePercentage = 1 - distance / maxDistance;

    const distanceFactor = 0.1 * Math.exp(distancePercentage) + 0.8;
    const finalScore = distanceFactor * score;

    console.log(school.tags, score);
    school.score = finalScore;
    school.distance = distance;
    scoredSchools.push({
      school: school,
      score: school.score,
      distance: school.distance,
    });
  });
  return res.json(scoredSchools.sort(compare).slice(0, 10));
};

function distanceBetweenCoordinates(location1, location2) {
  const [lon1, lat1] = location1;
  const [lon2, lat2] = location2;
  var R = 6371000; // Radius of the earth in m
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in m
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function compare(a, b) {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
}
