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
  const { userTags } = req.body;
  console.log(userTags);
  let schools = await Dojo.find({});

  await schools.forEach(async (school, i) => {
    const score = await userTags.filter((tag) => school.tags.includes(tag));

    school.score = score.length;
    // + Math.round(100 * Math.random()) / 100;
    scoredSchools.push({ school: school, score: school.score });
  });
  let sortedSchools = scoredSchools.sort(compare).map((a) => a.school.score);
  console.log(sortedSchools);
  console.log(
    sortedSchools.filter((school) => {
      return school.score != 0;
    })
  );

  return res.json(scoredSchools.slice(0, 10));
  return res.json(sortedSchools.slice(0, 10));
};

function compare(a, b) {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
}
