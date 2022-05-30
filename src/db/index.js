const mongoose = require("mongoose")
const {DB_HOST,DB_NAME,DB_PASS,DB_USER} = process.env
const db = mongoose.connect(
	DB_HOST,
	{ user: DB_USER, pass: DB_PASS, dbName: DB_NAME },
	(err) => {
		if (err) throw err

		console.log("DB Connected")
	}
)

module.exports = db
