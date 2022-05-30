var express = require("express");
var router = express.Router();
const { getData, postData, updateData, index } = require("./controller");
const { isLoginAdmin } = require('../middleware/auth');
const multer = require("multer");
const os = require("os");

// PAGES
router.get("/", isLoginAdmin,index);

//API
router.get("/get", getData);
router.post("/post", postData);
router.put("/put", updateData);

module.exports = router;
