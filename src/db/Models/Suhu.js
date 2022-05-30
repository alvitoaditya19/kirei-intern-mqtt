const mongoose = require("mongoose");

let suhuSchema = mongoose.Schema({
  humidity: {
    type: String,
    require: [true, "Suhu Humidity Harus Diisi"],
    
  },
  celcius: {
    type: String,
    require: [true, "Suhu Celcius Harus Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("Suhu", suhuSchema);
