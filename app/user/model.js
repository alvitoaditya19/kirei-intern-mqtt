const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Nama Kategori Harus Diisi"],
  },
  email: {
    type: String,
    require: [true, "Nama Email Harus Diisi"],
  },
  username: {
    type: String,
    require: [true, "Nama Username Harus Diisi"],
  },
  password: {
    type: String,
    require: [true, "Nama Password Harus Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("Userrrrrrr", userSchema);
