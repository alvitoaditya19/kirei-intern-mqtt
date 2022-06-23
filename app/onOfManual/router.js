var express = require("express");
var router = express.Router();
const { actionCreate, getData,updateOtomatis } = require("./controller");

router.get("/", getData);
router.post("/", actionCreate);
router.put("/button/:id", updateOtomatis);



module.exports = router;
 