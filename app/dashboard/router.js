var express = require("express");
var router = express.Router();
const { index,actionStatusLampu1, actionStatusLampu2, actionStatusPump1, actionStatusPump2, actionStatusControl  } = require("./controller");
//actionStatusLampu1, actionStatusLampu2, actionStatusPump1, actionStatusPump2, actionStatusControl
const { isLoginAdmin }= require('../middleware/auth'); 

/* GET home page. */
router.use(isLoginAdmin);
router.get("/", index);
router.put("/lampu1/:id", actionStatusLampu1);
router.put("/lampu2/:id", actionStatusLampu2);

router.put("/pump1/:id", actionStatusPump1);
router.put("/pump2/:id", actionStatusPump2);

router.put("/onOfManual/:id", actionStatusControl);

module.exports = router;
