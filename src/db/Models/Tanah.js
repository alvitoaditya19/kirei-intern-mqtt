const mongoose = require("mongoose");

let tanahSchema = mongoose.Schema({
  kelembapanTanah: {
    type: String,
    require: [true, "Kelembapan Harus Diisi"],
  },
  nitratTanah: {
    type: String,
    require: [true, "Kelembapan Harus Diisi"],
  },
  kadarTanah: {
    type: String,
    require: [true, "Kelembapan Harus Diisi"],
  },
  phTanah: {
    type: String,
    require: [true, "Kelembapan Harus Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("Tanah", tanahSchema);
