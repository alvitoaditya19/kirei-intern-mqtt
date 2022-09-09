const req = require("express/lib/request");
const User = require("../../src/db/Models/Userr");
const Vegetable = require("../../src/db/Models/Setting");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const vegetable1 = await Vegetable.findById("62772ed88e95ab077ed764a3");
      const vegetable2 = await Vegetable.findById("62787d4f9f1c9d93d46815cd");

      res.render("admin/setting/view_setting", {
        alert,
        vegetable1,
        vegetable2,
        name: req.session.admin.name,
        title: "Halaman Setting",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/user");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const { name, sum } = req.body;

      await Vegetable.findOneAndUpdate(
        {
          _id: id,
        },
        { name, sum }
      );

      req.flash("alertMessage", `Berhasil Edit Sayur ${name}`);
      req.flash("alertStatus", "success");

      res.redirect("/setting");

    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/setting");
    }
  },
};
