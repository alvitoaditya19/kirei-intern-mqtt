const WaterLevel = require("../../src/db/Models/Water");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const waterLevel = await WaterLevel.find();

      res.render("admin/water_level/view_water_level", {
        alert,
        waterLevel,
        name: req.session.admin.name,
        title: "Halaman Water Level",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/suhu");
    }
  },
  postData: async (req, res, next) => {
    try {
      const { waterlevel } = req.body;

      const payload = {
        waterlevel: waterlevel,
      };

      const waterlev = new WaterLevel(payload);
      await waterlev.save();

      res.status(200).json({ data: waterlev });

    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`});
    }
  },
  getData: async(req, res)=>{
    try {
      const waterLevel = await WaterLevel.find();

        res.status(200).json({data: waterLevel});
    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`})
    }
  },
  updateData: async (req, res, next) => {
    try {
      const { waterlevel = "" } = req.body

      const payload = {}

      if (waterlevel.length) payload.waterlevel = waterlevel

      const waterlev = await WaterLevel.findOneAndUpdate({
        _id: "624e7d876be8258c9c80cd8f"
      }, payload, { new: true, runValidators: true })

      res.status(201).json({
        data: {
          id: waterlev.id,
          waterLevel: waterlev.waterlevel,
        }
      })
    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`});
    }
  },
};
