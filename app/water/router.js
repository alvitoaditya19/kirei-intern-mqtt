var express = require("express");
var router = express.Router();
const { getData, postData, updateData, index, actionConvertCSV } = require("./controller");
const { isLoginAdmin } = require('../middleware/auth');
// PAGES
router.get("/", isLoginAdmin,index);
router.get("/csv", actionConvertCSV);

//API
router.get("/get", getData);
router.post("/post", postData);
router.put("/put", updateData);

module.exports = router;
