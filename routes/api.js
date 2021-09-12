const express = require("express");
const router = express.Router();

const { retrieveAllDBEntries } = require("../controllers/dojosController");

router.get("/getAll", retrieveAllDBEntries);

module.exports = router;
