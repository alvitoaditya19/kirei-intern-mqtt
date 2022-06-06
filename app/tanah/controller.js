const Tanah = require("../../src/db/Models/Tanah");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const tanah = await Tanah.find();

      res.render("admin/tanah/view_tanah", {
        alert,
        tanah,
        name: req.session.admin.name,
        title: "Halaman User",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/tanah");
    }
  },
  postData: async (req, res) => {
    try {
      const { kelembapanTanah, nitratTanah, kadarTanah, phTanah  } = req.body;

      const payload = {
        kelembapanTanah: kelembapanTanah,
        nitratTanah:nitratTanah,
        kadarTanah: kadarTanah,
        phTanah:phTanah
      };

      const tanah = new Tanah(payload);
      await tanah.save();

      res.status(200).json({ data: tanah });

    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`});
    }
  },
  getData: async(req, res)=>{
    try {
      const tanah = await Tanah.find();

        res.status(200).json({data: tanah});
    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`})
    }
  },
  updateTanah: async (req, res) => {
    try {
      const { kelembapanTanah = "",nitratTanah = "", kadarTanah = "", phTanah= "" } = req.body

      const payload = {}

      if (kelembapanTanah.length) payload.kelembapanTanah = kelembapanTanah
      if (nitratTanah.length) payload.kelembapanTanah = nitratTanah
      if (kadarTanah.length) payload.kelembapanTanah = kadarTanah
      if (phTanah.length) payload.kelembapanTanah = phTanah


      const kelemtan = await Tanah.findOneAndUpdate({
        _id: "6237ce9d0e0c2df0964e1272"
      }, payload, { new: true, runValidators: true })

      res.status(201).json({
        data: {
          id: kelemtan.id,
          kelembapanTanah: kelemtan.kelembapanTanah,
          nitratTanah: kelemtan.nitratTanah,
          kadarTanah: kelemtan.kadarTanah,
          phTanah: kelemtan.phTanah,
        }
      })
    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`});
    }
  },
};
