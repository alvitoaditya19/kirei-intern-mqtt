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
    enum: ["ON", "OFF"],
    default: "ON",
  },
},{ timestamps: true });

module.exports = mongoose.model("Pump", pumpSchema);
