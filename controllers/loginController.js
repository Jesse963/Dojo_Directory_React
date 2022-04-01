const Dojo = require("../models/dojos");
const Tag = require("../models/tags");
const router = require("../routes/api");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const cookieName = process.env.COOKIE_NAME;

// ----------------  LOGIN  ---------------- //
exports.login = async (req, res) => {
  const currentCookies = req.headers.cookie;
  if (currentCookies && currentCookies.includes(cookieName))
    return res.status(200).json({
      success: true,
      message: "Already Logged in",
    });
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });
  if (!password) return res.status(400).json({ error: "Password required" });

  const school = await Dojo.findOne({ email: email });
  if (!school)
    return res.status(400).json({
      success: false,
      message: "Email does not match any school account",
    });

  const match = await bcrypt.compare(password, school.password);
  if (match)
    return res
      .status(400)
      .json({ success: false, message: "Incorrect email or password" });
  const token = jwt.sign(
    { school_id: school._id, source: "login" },
    process.env.JWT_TOKEN_SECRET
  );
  console.log(token);

  const cookieOptions = {
    httpOnly: true,
  };
  return res
    .status(200)
    .cookie(cookieName, token, cookieOptions)
    .json({ success: true, token, name: school.sensei });
};

// ----------------  LOGOUT  ---------------- //
exports.logout = async (req, res) => {
  console.log("Logging out");
  return res.clearCookie(cookieName).location("/").json({ success: true });
};

// ----------------  RENDER LOGGED IN SCHOOL  ---------------- //
exports.retrieveLoggedInSchool = async (req, res) => {
  console.log("Starting retrieveLoggedInSchool");
  const currentCookies = req.headers.cookie;
  if (
    !currentCookies ||
    (currentCookies && !currentCookies.includes(cookieName))
  ) {
    console.log("not logged in");
    return res
      .status(400)
      .json({ success: false, error: "User is not logged in" });
  }

  let token = currentCookies.split(cookieName + "=")[1].split(";")[0];
  let verifiedToken;
  let school_id;
  try {
    verifiedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    console.log(verifiedToken);
    school_id = verifiedToken.school_id;
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, error: error.message });
  }
  console.log(school_id);
  const school = await Dojo.findById(school_id);
  console.log(school);
  //   const school_id = verifiedToken.id;
  console.log("Finished retrieveLoggedInSchool");
  return res.status(200).json({ success: true, school: school });
};
