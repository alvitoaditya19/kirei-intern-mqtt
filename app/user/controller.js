
const User = require("../../app/auth/model");
// const json2csv = require('json2csv').parse;
const fs = require('fs');
const  { Parser } = require('json2csv');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const user = await User.find();
      res.render("admin/user/view_user", {
        alert,
        user,
        name: req.session.admin.name,
        title: "Halaman User",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/user");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const user = await User.find();

      res.render("admin/user/create", {
        user,
        name: req.session.admin.name,
        title: "Halaman Tambah User",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/user");
    }
  },
  

  actionCreate: async (req, res) => {
    try {
      const { name, email, username, password } = req.body;

      let user = await User({ name, email, username, password });
      await user.save();

      req.flash("alertMessage", "Berhasil Tambah User");
      req.flash("alertStatus", "success");

      res.redirect("/user");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/user");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: id });

      res.render("admin/user/edit", {
        user,
        name: req.session.admin.name,
        title: "Halaman Ubah User",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/user");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, username, password } = req.body;

      await User.findOneAndUpdate(
        {
          _id: id,
        },
        { name, email, username, password }
      );

      req.flash("alertMessage", "Berhasil Ubah User");
      req.flash("alertStatus", "success");

      res.redirect("/user");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/user");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findOneAndRemove({
        _id: id,
      });

      req.flash("alertMessage", "Berhasil Hapus User");
      req.flash("alertStatus", "success");

      res.redirect("/user");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/user");
    }
  },
  actionConvertCSV:async(req,res) => {
    const user = await User.find().select('name username password phoneNumber');

    const fields = ['name', 'username', 'password', 'phoneNumber'];
    
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(user);
    
    console.log(csv);

    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    return res.send(csv);
  },
  getUser: async(req, res)=>{
    try {
      const user = await User.find();

      const userData = user.map((userDataMap) => {
        const userCalender = new Date(userDataMap.createdAt)
        return {
          name:userDataMap.name,
          username:userDataMap.username,
          email:userDataMap.email,

          tes:userCalender.getDate()
        }
      })

      res.status(200).json(userData);
    } catch (eSrr) {
      res.status(500).json({message: err.message || `Internal Server Error`})
    }
  },

  
};
