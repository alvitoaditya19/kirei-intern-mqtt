const mongoose = require("mongoose");

const onOfManual = mongoose.Schema({
  statusKontrol: {
    type: String,
    enum: ["ON", "OFF"],
    default: "ON",
  },
},{ timestamps: true });

module.exports = mongoose.model("onOfManual", onOfManual);
