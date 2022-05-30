var express = require("express");
var router = express.Router();
const {pumpAPI,index, updatePump, actionStatusLampu2, actionStatusLampu1, actionCreate } = require("./controller");
const multer = require("multer");
const os = require("os");

router.get("/", pumpAPI);
router.put("/:id", updatePump);

router.post("/", actionCreate);

module.exports = router;
 