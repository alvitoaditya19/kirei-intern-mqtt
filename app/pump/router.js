var express = require("express");
var router = express.Router();
const {pumpAPI, updatePump, actionCreate } = require("./controller");


router.get("/", pumpAPI);
router.put("/:id", updatePump);

router.post("/", actionCreate);

module.exports = router;
 