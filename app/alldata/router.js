var express = require("express");
var router = express.Router();
const { getData } = require("./controller");
const { isLoginAdmin } = require('../middleware/auth');
const multer = require("multer");
const os = require("os");

// API
router.get("/", getData);


module.exports = router;
 