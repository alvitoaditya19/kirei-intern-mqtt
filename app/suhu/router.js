var express = require("express");
var router = express.Router();
const { index, updateSuhu, getSuhu, postSuhu, actionConvertCSV } = require("./controller");
const { isLoginAdmin } = require('../middleware/auth');
const multer = require("multer");
const os = require("os");

// PAGES
router.get("/",isLoginAdmin, index);

// API
router.get("/get", getSuhu);
router.post("/post", postSuhu);
router.put("/put", updateSuhu);
router.get("/csv", actionConvertCSV);


module.exports = router;
 