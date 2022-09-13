const Tanah = require("../../src/db/Models/Tanah");
const  { Parser } = require('json2csv');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const tanah = await Tanah.find();

      tanah.sort(function (a, b) {
        var keyA = new Date(a.updatedAt),
            keyB = new Date(b.updatedAt)
        // Compare the 2 dates
        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
        return 0
    })

      const tanahData = tanah.map((tanahDataMap) => {
        const tanahCalender = new Date(tanahDataMap.updatedAt)
        return {
          kelembapanTanah: tanahDataMap.kelembapanTanah,
          kadarTanah: tanahDataMap.kadarTanah,
          nitratTanah: tanahDataMap.nitratTanah,

            date:
                tanahCalender.getDate() +
                " - " +
                (tanahCalender.getMonth() + 1) +
                " - " +
                tanahCalender.getFullYear(),
            time:
                tanahCalender.getHours() +
                ":" +
                tanahCalender.getMinutes() +
                ":" +
                tanahCalender.getSeconds(),
        }
    })

      res.render("admin/tanah/view_tanah", {
        alert,
        tanah,
        tanahData,
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
  actionConvertCSV:async(req,res) => {
    const kelembapanTanah = await Tanah.find().select('_id kelembapanTanah kadarTanah nitratTanah createdAt updatedAt');
    console.log(kelembapanTanah);

    const fields = ['_id', 'kelembapanTanah','kadarTanah', 'nitratTanah' ,'createdAt', 'updatedAt'];
    
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(kelembapanTanah);
    
    console.log(csv);

    res.header('Content-Type', 'text/csv');
    res.attachment('data-tanah.csv');
    return res.send(csv);
  },
};
