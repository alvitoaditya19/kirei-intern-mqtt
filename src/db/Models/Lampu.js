const mongoose = require("mongoose");

const lampuSchema = mongoose.Schema({
  lampu1: {
    type: String,
    enum: ["ON", "OFF"],
    default: "ON",
  },
  lampu2: {
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

module.exports = mongoose.model("Lampu", lampuSchema);
