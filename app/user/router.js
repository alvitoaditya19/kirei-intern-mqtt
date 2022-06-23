var express = require("express");
var router = express.Router();
var {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  getUser,
  // postUser
} = require("./controller");

// const { isLoginAdmin } = require("../middleware/auth");

/* GET home page. */
// router.use(isLoginAdmin);

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actionEdit);
router.delete("/delete/:id", actionDelete);

router.get("/get", getUser);
// router.get("/post", postUser);


module.exports = router;
