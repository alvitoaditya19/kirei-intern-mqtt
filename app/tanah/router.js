var express = require("express");
var router = express.Router();
const { updateTanah, index, getData, postData } = require("./controller");
const { isLoginAdmin } = require('../middleware/auth');

// PAGES
router.get("/",isLoginAdmin, index);

// API
router.get("/get", getData);
router.post("/post", postData);
router.put("/put", updateTanah);

module.exports = router;
 