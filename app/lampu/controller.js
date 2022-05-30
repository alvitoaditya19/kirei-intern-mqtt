const Lampu = require("../../src/db/Models/Lampu");

module.exports = {
  actionCreate: async (req, res) => {
    try {
      const { lampu1, lampu2 } = req.body;

      const payload = {
        lampu1: lampu1,
        lampu2: lampu2,
      };

      const lampu = new Lampu(payload);
      await lampu.save();

      res.status(200).json({ data: lampu });
    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`});
    }
  },

  actionStatusLampu1: async (req, res) => {
    try {
      const { id } = req.params;
      let lampu = await Lampu.findOne({ _id: id });
      let lampu1 = lampu.lampu1 === "ON" ? "OFF" : "ON";

      lampu = await Lampu.findOneAndUpdate(
        {
          _id: id,
        },
        { lampu1 }
      );

      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");

      res.redirect("/lampu");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lampu");
    }
  },

  actionStatusLampu2: async (req, res) => {
    try {
      const { id } = req.params;
      let lampu = await Lampu.findOne({ _id: id });
      let lampu2 = lampu.lampu2 === "ON" ? "OFF" : "ON";

      lampu = await Lampu.findOneAndUpdate(
        {
          _id: id,
        },
        { lampu2 }
      );

      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");

      res.redirect("/lampu");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lampu");
    }
  },
  lampu: async (req, res) => {
    try {
      const lampu = await Lampu.find();

      res.status(200).json({ data: lampu });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
},

  updateLampu: async (req, res) => {
    try {
      const {id} = req.params
      const { lampu1 = "", lampu2 = "" } = req.body;

      const payload = {};

      if (lampu1.length) payload.lampu1 = lampu1;
      if (lampu2.length) payload.lampu2 = lampu2;

      const lampu = await Lampu.findOneAndUpdate(
        {
          _id: id,
        },
        payload,
        { new: true, runValidators: true }
      );

      res.status(201).json({
        data: {
          id: lampu.id,
          lampu1: lampu.lampu1,
          lampu2: lampu.lampu2,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
  },
};
