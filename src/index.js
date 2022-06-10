/* eslint-disable no-undef */
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
var cors = require('cors')

// const port = process.env.PORT || 3030


// const dashboardRouter = require("./app/dashboard/router");
const route = require("./routes")
const authRouter = require("../app/auth/router");

const adminRouter = require("../app/admin/router");
const dashboardRouter = require("../app/dashboard/router");
const lampuRouter = require("../app/lampu/router");
const userRouter = require("../app/user/router");
const settingRouter = require("../app/setting/router");
const suhuRouter = require("../app/suhu/router");
const waterRouter = require("../app/water/router");
const keruhRouter = require("../app/air/router");
const onOfControlRouter = require("../app/onOfManual/router");
const tanahRouter = require("../app/tanah/router");

const pumpRouter = require("../app/pump/router");




const app = express();
const URL = `/api/v1`;
app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);
app.use(flash());
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/adminlte",
  express.static(path.join(__dirname, "../node_modules/admin-lte/"))
);

app.use('/sb-admin-2', express.static(path.join(__dirname, '../node_modules/startbootstrap-sb-admin-2/')));

// MQTT
route(app)

// AKHIR MQTT

app.use("/", adminRouter);
app.use("/dashboard", dashboardRouter);
app.use("/lampu", lampuRouter);
app.use("/user", userRouter);
app.use("/setting", settingRouter);
app.use("/suhu", suhuRouter);
app.use("/water", waterRouter);
app.use("/tanah", tanahRouter);
app.use("/keruhair", keruhRouter);

// app.use("/dashboard", dashboardRouter);

// API
// API
// app.use(`${URL}/players`, playerRouter);
app.use(`${URL}/auth`, authRouter);
app.use(`${URL}/suhu`, suhuRouter);
app.use(`${URL}/lampu`, lampuRouter);
app.use(`${URL}/tanah`, tanahRouter);
// app.use(`${URL}/cuaca`, cuacaRouter);
app.use(`${URL}/pump`, pumpRouter);
app.use(`${URL}/water`, waterRouter);
app.use(`${URL}/keruhair`, keruhRouter);
app.use(`${URL}/onOfManual`, onOfControlRouter);

// Akhir API
// app.use(`${URL}/setting`, settingRouter);

// Akhir API

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.listen(port, () => {
// 	console.log(`App run on :${port}`)
// })

module.exports = app;
