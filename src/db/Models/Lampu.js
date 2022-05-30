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
    enum: ["Y", "N"],
    default: "Y",
  },
},{ timestamps: true });

module.exports = mongoose.model("Lampu", lampuSchema);
