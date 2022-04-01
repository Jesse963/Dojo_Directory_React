const Dojo = require("../models/dojos");
const Tag = require("../models/tags");
const router = require("../routes/api");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieName = process.env.COOKIE_NAME;

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
      street: dojo.street,
      location: dojo.location,
      tags: dojo.tags,
    });
    await school.save();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error uploading new school to database - " + error.message,
    });
  }
  console.log("Successfully added new school");
  return res.status(200).json({ success: true }); //finally

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

exports.populateTestData = async (req, res) => {
  // Generate random list of 10 tags from DB
  const tagsFull = await Tag.find({});

  const postcodes = [
    2137, 2138, 2140, 2132, 2141, 2000, 2020, 2131, 2040, 3000, 3015,
  ];
  const locations = [
    [151.103139, -33.857232],
    [151.0870241, -33.84829279],
    [151.084423, -33.86724],
    [151.1167, -33.883013],
    [151.031592, -33.87126],
    [151.2079551, -33.86494842],
    [151.193901, -33.931282],
    [151.124242, -33.889591],
    [151.084423, -33.86724],
    [144.9645642, -37.81669333],
    [144.884349, -37.843856],
  ];

  for (let index = 0; index < 10; index++) {
    let tags = tagsFull.map((element) => element.tag);
    tags = tags.sort(() => 0.5 - Math.random()).slice(0, 10);
    const school = new Dojo({
      name: `Test School ${index}`,
      password: "Unhashed Test Password",
      email: `testschool${index}@hotmail.com`,
      sensei: "John Smith",
      phone: "0415 927 738",
      postcode: postcodes[index],
      street: `${index} Fake Street`,
      location: {
        type: "Point",
        coordinates: locations[index],
      },
      tags: tags,
      valid: true,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium omnis quisquam distinctio quidem tempora consequuntur! Aspernatur exercitationem maiores voluptatem velit odio impedit corrupti, nam, officia fuga soluta in quaerat assumenda?\
      Officiis explicabo placeat voluptas repudiandae, rerum itaque dicta odit, et aperiam commodi tempora eaque. Excepturi accusamus molestiae dolorem assumenda. Aliquam corporis accusamus illum omnis iure, dignissimos harum odio est tempore.\
      Velit qui blanditiis reprehenderit mollitia facere eius delectus aspernatur atque, consequatur dolorum? Laborum fugit consequuntur modi, reprehenderit facere nemo ad aliquid. Tenetur facere ipsum voluptatum ex blanditiis nostrum ratione fuga!\
      Asperiores exercitationem ducimus, quos soluta, voluptatibus reprehenderit qui tempore dicta perspiciatis natus eligendi. Neque est exercitationem deserunt aliquid. Aspernatur, sapiente. Accusamus culpa modi explicabo voluptates quis quaerat aspernatur quibusdam minima.\
      Possimus quibusdam doloribus harum, repellendus a molestiae voluptatibus accusamus labore! Corporis veritatis cumque perspiciatis dolores voluptatum explicabo ipsam, tempore harum doloribus quibusdam! Veniam eaque at autem atque, hic recusandae incidunt!",
    });
    try {
      await school.save();
    } catch (err) {
      console.log(err.message);
    }
  }
  return res.json({ status: "OK" });
};

exports.updateSchool = async (req, res) => {
  console.log("Started Update school");
  const update = req.body;
  const currentCookies = req.headers.cookie;
  if (
    !currentCookies ||
    (currentCookies && !currentCookies.includes(cookieName))
  ) {
    console.log("not logged in");
    return res.status(400).json({ error: "User is not logged in" });
  }

  let token = currentCookies.split(cookieName + "=")[1].split(";")[0];
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
  const school_id = verifiedToken.school_id;
  console.log(school_id);
  await Dojo.findByIdAndUpdate(school_id, update);
  const school = await Dojo.findById(school_id);
  console.log(school);
  console.log("Finished Update school");
  return res.status(200).json({ success: true, school });
};
