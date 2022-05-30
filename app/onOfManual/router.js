var express = require("express");
var router = express.Router();
const { actionCreate, getData,updateOtomatis } = require("./controller");
const multer = require("multer");
const os = require("os");

router.get("/", getData);
router.post("/", actionCreate);
router.put("/:id", updateOtomatis);


module.exports = router;
 