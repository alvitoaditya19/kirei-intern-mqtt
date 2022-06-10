var express = require("express");
var router = express.Router();
const { index, getTds, postTds, updateTds } = require("./controller");
const { isLoginAdmin } = require('../middleware/auth');

// PAGES
router.get("/", isLoginAdmin,index);
// router.get("/suhu", getAllSuhu);
// router.post("/", postAllSuhu);

// API
router.get("/get", getTds);
router.post("/post", postTds);
router.put("/put", updateTds);

module.exports = router;
 