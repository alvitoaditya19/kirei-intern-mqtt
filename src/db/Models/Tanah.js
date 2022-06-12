const mongoose = require("mongoose");

let tanahSchema = mongoose.Schema({
  kelembapanTanah: {
    type: String,
    require: [false, "kelembapanTanah Diisi"],
  },
  nitratTanah: {
    type: String,
    require: [false, "nitratTanah Diisi"],
  },
  kadarTanah: {
    type: String,
    require: [false, "kadarTanah Diisi"],
  },
  phTanah: {
    type: String,
    require: [false, "phTanah Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("Tanah", tanahSchema);
