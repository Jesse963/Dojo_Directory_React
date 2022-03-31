const nodemailer = require("nodemailer");
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
