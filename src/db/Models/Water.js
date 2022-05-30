const mongoose = require("mongoose");

let waterSchema = mongoose.Schema({
  waterlevel: {
    type: String,
    require: [true, "Water Level Harus Diisi"], 
  },
},{ timestamps: true });

module.exports = mongoose.model("Water", waterSchema);
