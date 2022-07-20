const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
  status:{
    type: Boolean,
    require:[true, "Status harus diisi"],
    default:true
  }
},{ timestamps: true });

module.exports = mongoose.model("Userr123", userSchema);
