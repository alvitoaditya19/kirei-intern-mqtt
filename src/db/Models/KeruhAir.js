const mongoose = require("mongoose");

const kekeruhanAirSchema = mongoose.Schema({
  kekeruhanAir: {
    type: String,
    require: [true, "KekeruhanAir Humidity Harus Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("TdsAir", kekeruhanAirSchema);
