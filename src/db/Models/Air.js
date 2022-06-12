const mongoose = require("mongoose");

const kekeruhanAirSchema = mongoose.Schema({
  kekeruhanAir: {
    type: String,
    require: [false, "KekeruhanAir Diisi"],
  },
  phAir: {
    type: String,
    require: [false, "PH Air Diisi"],
  },
  oksigen: {
    type: String,
    require: [false, "Oksigen Air Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("Air", kekeruhanAirSchema);
