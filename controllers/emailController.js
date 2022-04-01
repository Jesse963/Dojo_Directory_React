const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { findByIdAndUpdate } = require("../models/dojos");
const Dojo = require("../models/dojos");
require("dotenv").config();

// ---------- TRANSPORTER ---------- //
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ----------  EMAIL RESULTS  ---------- //
exports.emailResultsToUser = async (req, res) => {
  const { schools, email } = req.body;
  let mapped = [];
  schools.map((school) => {
    const { email, sensei, name } = school.school;
    let { score, distance } = school;
    distance = Math.round(distance / 100) / 10;
    score = Math.round(score * 100) / 100;

    // mapped.push({ name, email, sensei, score, distance });
    const emailBody = `<div>
    <h1>${name}</h1>
    <h2>${sensei}</h2>
    <div>
    <p>Score: ${score}</p>
    <p>Distance: ${distance}km</p>
    </div>
    <div>
    <p>Contact: ${email}</p>
    </div>
    </div>`;
    mapped.push(emailBody);
  });
  const fullBody = mapped.join("<br/>");
  let info;
  console.warn("!!! Emailing is disabled !!!");
  //   try {
  //     info = await transporter.sendMail({
  //       from: '"Dojo Directory" <jesse-jenkins@hotmail.com>', // sender address
  //       to: "jesse-jenkins@hotmail.com", // list of receivers
  //       subject: "Your Results!", // Subject line
  //       html: fullBody, // html body
  //     });
  //   } catch (error) {
  //     res.json(error.message);
  //   }
  res.json(info);
};

exports.sendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const school = await Dojo.findOne({ email });
  const school_id = school._id;

  const method = "validate";
  const token = jwt.sign(
    { school_id: school_id, method: method, source: "Send verification email" },
    process.env.JWT_TOKEN_SECRET
  );

  if (!school_id)
    return res
      .status(400)
      .json({ success: false, error: "No school id provided" });

  try {
    info = await transporter.sendMail({
      from: '"Dojo Directory" <jesse-jenkins@hotmail.com>', // sender address
      to: "jesse-jenkins@hotmail.com", // list of receivers
      subject: "Verify your account", // Subject line
      text: `http://localhost:3000/api/verifyEmail?token=${token}`,
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }

  console.log(token);
  return res.json({ success: true, token });
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  const { school_id, method } = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  console.log(school_id);
  let school;
  if (method != "validate")
    return res.status(400).json({ success: false, error: "Incorrect method" });
  try {
    school = await Dojo.findByIdAndUpdate(school_id, { valid: true });
    console.log(school);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, error: error.message });
  }

  const newToken = jwt.sign(
    { school_id: school_id, source: "Verify email" },
    process.env.JWT_TOKEN_SECRET
  );
  return res
    .status(200)
    .cookie("dd_loginToken", newToken, {
      httpOnly: true,
    })
    .json({ success: true, school });
};
