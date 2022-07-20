
const User = require("../../app/auth/model");

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
  getUser: async(req, res)=>{
    try {
      const user = await User.find();

      res.status(200).json({data: user});
    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`})
    }
  },

  
};
