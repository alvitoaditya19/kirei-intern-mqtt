const express = require("express")
const { checkToken } = require("../middlewares/auth")
const { registerUser, login, decodeToken } = require("../services/authService")
const { commandHandler } = require("../services/deviceService")
const { findData } = require("../services/sensorService")
const { findUser } = require("../services/userService")
// const keruhRouter = require("./app/keruhair/router");

module.exports = (app) => {
	const urlAPI = `/api/v1`;

	const user = express.Router()
	const device = express.Router()
	const auth = express.Router()
	const sensor = express.Router()

	// ALVITO CODE
	// app.use(`${urlAPI}/keruhair`, keruhRouter);


	// AKHIR ALVITO CODE

	app.use("/user", user)
	app.use("/device", device)
	app.use("/auth", auth)
	app.use("/sensor", sensor)

	// user.get("/", (req, res) => res.send({ hello: "user route" }))
	user.get("/get/:name", findUser)

	device.put("/command",commandHandler)

	auth.post("/register",registerUser)
	auth.post("/login",login)
	auth.get("/decode",checkToken,decodeToken)

	// use checkToken middleware to secure the route for authenticated user only (use Bearer Token JWT)
	sensor.get("/",checkToken,findData)

}
