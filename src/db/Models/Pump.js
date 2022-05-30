const mongoose = require("mongoose");


const pumpSchema = mongoose.Schema({
  pump1: {
    type: String,
    enum: ["ON", "OFF"],
    default: "ON",
  },
  pump2: {
    type: String,
    enum: ["ON", "OFF"],
    default: "ON",
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
},{ timestamps: true });

module.exports = mongoose.model("Pump", pumpSchema);
