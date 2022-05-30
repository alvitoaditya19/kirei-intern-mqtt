const mongoose = require("mongoose");

let vegetableSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Nama Vegetable Kategori Harus Diisi"],
  },
  sum: {
    type: Number,
    require: [true, "Jumlah Vegetable Email Harus Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("Vegetable", vegetableSchema);
