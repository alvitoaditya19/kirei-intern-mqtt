const OnOfManual = require("../../src/db/Models/OnOffManual");

module.exports = {
  getData: async (req, res, next) => {
    try {
      const onOfKontrol = await OnOfManual.find();

      res.status(200).json({ data: onOfKontrol });
    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`});
    }
  },
  actionCreate: async (req, res, next) => {
    try {
      const { statusKontrol } = req.body;

      const payload = {
        statusKontrol: statusKontrol,
      };

      const onOfKontrol = new OnOfManual(payload);

      await onOfKontrol.save();

      res.status(200).json({ data: onOfKontrol });
    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`});
    }
  },
  updateOtomatis: async (req, res, next) => {
    try {
      const {id} = req.params
      const { statusKontrol = "" } = req.body;

      const payload = {};

      if (statusKontrol.length) payload.statusKontrol = statusKontrol;

      const status = await OnOfManual.findOneAndUpdate(
        {
          _id: id,
        },
        payload,
        { new: true, runValidators: true }
      );
      res.status(201).json({
        data: {
          id: status.id,
          statusKontrol: status.statusKontrol
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
  },
};
