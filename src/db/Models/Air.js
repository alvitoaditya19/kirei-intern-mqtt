const mongoose = require("mongoose");

const kekeruhanAirSchema = mongoose.Schema({
  kekeruhanAir: {
    type: String,
    require: [true, "KekeruhanAir Humidity Harus Diisi"],
  },
  phAir: {
    type: String,
    require: [true, "PH Air Harus Diisi"],
  },
  oksigen: {
    type: String,
    require: [true, "Oksigen Air Harus Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("Air", kekeruhanAirSchema);
