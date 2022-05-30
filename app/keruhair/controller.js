const KekeruhanAir = require("../../src/db/Models/KeruhAir");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const keruhAir = await KekeruhanAir.find();

      keruhAir.sort(function(a, b) {
        var keyA = new Date(a.updatedAt),
          keyB = new Date(b.updatedAt);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      res.render("admin/keruhAir/view_keruhair", {
        alert,
        keruhAir,
        name: req.session.admin.name,
        title: "Halaman User",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/suhu");
    }
  },
  getTds: async (req, res) => {
    try {
      const keruhAir = await KekeruhanAir.find();
      keruhAir.sort(function(a, b) {
        var keyA = new Date(a.updatedAt),
          keyB = new Date(b.updatedAt);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      res.status(200).json({ data: keruhAir });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
  },
  postTds: async (req, res) => {
    try {
      const { kekeruhanAir } = req.body;

      const payload = {
        kekeruhanAir: kekeruhanAir,
      };

      const keruhAir = new KekeruhanAir(payload);
      await keruhAir.save();

      res.status(200).json({ data: keruhAir });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
  },
  updateTds: async (req, res) => {
    try {
      // const { id } = req.params;
      const { kekeruhanAir = "" } = req.body;

      const payload = {};

      if (kekeruhanAir.length) payload.kekeruhanAir = kekeruhanAir;

      const keruhAir = await KekeruhanAir.findOneAndUpdate(
        {
          _id: "6255747f5b79b549bf92242e",
        },
        payload,
        { new: true, runValidators: true }
      );

      res.status(201).json({
        data: {
          id: keruhAir.id,
          kekeruhanAir: keruhAir.kekeruhanAir,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
  },
};
