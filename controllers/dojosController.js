const Dojo = require("../models/dojos");
const router = require("../routes/api");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.retrieveAllDBEntries = async (req, res) => {
  const schools = await Dojo.find({});
  // console.log(schools);
  return res.json({ schools: schools });
};

exports.addNewSchool = async (req, res) => {
  //check for existing school before creating a new one
  const dojo = req.body;
  console.log(dojo.email);

  //Match against email
  const emailExists = await Dojo.findOne({ email: dojo.email });
  console.log(emailExists);
  if (emailExists != null) {
    console.log("email already exists", emailExists);
    return res
      .status(400)
      .json({ result: "An account already exists with this email address" });
  }

  //Match against school Name
  const nameExists = await Dojo.findOne({ name: dojo.school_name });
  console.log(nameExists);
  if (nameExists != null) {
    console.log("school name already exists", nameExists);
    return res
      .status(400)
      .json({ result: "A school with this name already exists" });
  }

  const hashedPassword = await bcrypt.hash(dojo.password, 10);
  console.log(hashedPassword);
  try {
    const school = new Dojo({
      name: dojo.school_name,
      password: hashedPassword,
      email: dojo.email,
      sensei: dojo.first_name + " " + dojo.last_name,
      phone: dojo.phone,
      postcode: dojo.postcode,
    });
    await school.save();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: true,
      message: "Error uploading new school to database - ",
      error,
    });
  }
  return res.status(200); //finally

  //Send Verification email and return success message
  //Create JWT for email verification
  // const payload = { school_id: school_id };
  // const secret = process.env.JWT_TOKEN_SECRET;
  // const token = jwt.sign(payload, secret);

  // //set email options
  // const emailOptions = {
  //   from: process.env.SENDER_EMAIL,
  //   to: process.env.SENDER_EMAIL,
  //   subject: "Dojo Management Email Verification",
  //   text: `Hello, this is an automated email to verify your account.\n\nClick the link below to verify and log in.
  //   \n\n${process.env.BASE_URL}/api/verifyNewAccount?token=${token}`,
  // };
};

exports.searchByName = async (req, res) => {
  console.log(req.body);
  const response = await Dojo.find({
    $or: [
      {
        name: { $regex: req.body.search, $options: "i" },
      },
      {
        address: { $regex: req.body.search, $options: "i" },
      },
      {
        sensei: { $regex: req.body.search, $options: "i" },
      },
    ],
  });
  console.log(response);
  return res.json(response);
};

exports.checkEmailExists = async (req, res) => {
  console.log(req.body);
  const response = await Dojo.find(req.body);
  return res.json(response.length === 0);
};
