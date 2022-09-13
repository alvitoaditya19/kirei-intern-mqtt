const Air = require("../../src/db/Models/Air")
const { Parser } = require("json2csv")

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMessage, status: alertStatus }
            const keruhAir = await Air.find()

            keruhAir.sort(function (a, b) {
                var keyA = new Date(a.updatedAt),
                    keyB = new Date(b.updatedAt)
                // Compare the 2 dates
                if (keyA < keyB) return 1
                if (keyA > keyB) return -1
                return 0
            })

            // keruhAir.sort(function(a, b) {
            //   var keyA = new Date(a.updatedAt),
            //     keyB = new Date(b.updatedAt);
            //   // Compare the 2 dates
            //   if (keyA < keyB) return -1;
            //   if (keyA > keyB) return 1;
            //   return 0;
            // });

            const keruhAirData = keruhAir.map((keruhAirDataMap) => {
                const keruhAirCalender = new Date(keruhAirDataMap.updatedAt)
                return {
                    kekeruhanAir: keruhAirDataMap.kekeruhanAir,
                    phAir: keruhAirDataMap.phAir,
                    oksigen: keruhAirDataMap.oksigen,

                    date:
                        keruhAirCalender.getDate() +
                        " - " +
                        (keruhAirCalender.getMonth() + 1) +
                        " - " +
                        keruhAirCalender.getFullYear(),
                    time:
                        keruhAirCalender.getHours() +
                        ":" +
                        keruhAirCalender.getMinutes() +
                        ":" +
                        keruhAirCalender.getSeconds(),
                }
            })

            res.render("admin/keruhAir/view_keruhair", {
                alert,
                keruhAir,
                keruhAirData,
                name: req.session.admin.name,
                title: "Halaman User",
            })
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger")
            res.redirect("/suhu")
        }
    },
    getTds: async (req, res) => {
        try {
            const air = await Air.find()
            air.sort(function (a, b) {
                var keyA = new Date(a.updatedAt),
                    keyB = new Date(b.updatedAt)
                // Compare the 2 dates
                if (keyA < keyB) return -1
                if (keyA > keyB) return 1
                return 0
            })
            res.status(200).json({ data: air })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`,
            })
        }
    },
    postTds: async (req, res) => {
        try {
            const { kekeruhanAir, phAir, oksigen } = req.body

            const payload = {
                kekeruhanAir: kekeruhanAir,
                phAir: phAir,
                oksigen: oksigen,
            }

            const air = new Air(payload)
            await air.save()

            res.status(200).json({ data: air })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`,
            })
        }
    },
    updateTds: async (req, res) => {
        try {
            // const { id } = req.params;
            const { kekeruhanAir = "", phAir = "", oksigen = "" } = req.body

            const payload = {}

            if (kekeruhanAir.length) payload.kekeruhanAir = kekeruhanAir
            if (phAir.length) payload.kekeruhanAir = phAir
            if (oksigen.length) payload.kekeruhanAir = oksigen

            const keruhAir = await Air.findOneAndUpdate(
                {
                    _id: "6255747f5b79b549bf92242e",
                },
                payload,
                { new: true, runValidators: true }
            )

            res.status(201).json({
                data: {
                    id: keruhAir.id,
                    kekeruhanAir: keruhAir.kekeruhanAir,
                    phAir: keruhAir.phAir,
                    oksigen: keruhAir.oksigen,
                },
            })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`,
            })
        }
    },
    actionConvertCSV: async (req, res) => {
        const air = await Air.find().select(
            "kekeruhanAir phAir oksigen createdAt updatedAt"
        )

        const fields = [
            "kekeruhanAir",
            "phAir",
            "oksigen",
            "createdAt",
            "updatedAt",
        ]

        const json2csvParser = new Parser({ fields })
        const csv = json2csvParser.parse(air)

        console.log(csv)

        res.header("Content-Type", "text/csv")
        res.attachment("data-airr.csv")
        return res.send(csv)
    },
}
