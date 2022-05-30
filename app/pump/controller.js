const Pump = require("../../src/db/Models/Pump");

module.exports = {
  pumpAPI: async (req, res, next) => {
    try {
      const pump = await Pump.find();

      res.status(200).json({ data: pump });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
  },
  actionCreate: async (req, res, next) => {
    try {
      const { pump1, pump2 } = req.body;

      const payload = {
        pump1: pump1,
        pump2: pump2,
      };

      const pump = new Pump(payload);
      await pump.save();

      res.status(200).json({ data: pump });
    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`});
    }
  },

  updatePump: async (req, res, next) => {
    try {
      const {id} = req.params
      const { pump1 = "", pump2 = "" } = req.body;

      const payload = {};

      if (pump1.length) payload.pump1 = pump1;
      if (pump2.length) payload.pump2 = pump2;

      const pump = await Pump.findOneAndUpdate(
        {
          _id: id,
        },
        payload,
        { new: true, runValidators: true }
      );

      res.status(201).json({
        data: {
          id: pump.id,
          pump1: pump.pump1,
          pump2: pump.pump2,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
  },
};
