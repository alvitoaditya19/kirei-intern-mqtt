// const { default: mongoose } = require("mongoose")
const User = require("../db/Models/User")
const response = require("../helpers/response")

module.exports = {
	findUser: async (req, res) => {
		const { name } = req.params
		const user = await User.findOne({ name: name })
		if (user) {
			response.ok(user,res)
		} else {
			response.notFound({user:"Not Found"},res)
		}
	}
}
