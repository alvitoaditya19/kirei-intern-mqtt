const WaterLevel = require("../../src/db/Models/Water")
const { Parser } = require("json2csv")

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMessage, status: alertStatus }
            const waterLevel = await WaterLevel.find()

            waterLevel.sort(function (a, b) {
                var keyA = new Date(a.updatedAt),
                    keyB = new Date(b.updatedAt)
                // Compare the 2 dates
                if (keyA < keyB) return 1
                if (keyA > keyB) return -1
                return 0
            })

            const waterLevelData = waterLevel.map((waterLevelDataMap) => {
                const waterLevelCalender = new Date(waterLevelDataMap.updatedAt)
                return {
                    waterlevel: waterLevelDataMap.waterlevel,
                    date:
                        waterLevelCalender.getDate() +
                        " - " +
                        (waterLevelCalender.getMonth() + 1) +
                        " - " +
                        waterLevelCalender.getFullYear(),
                    time:
                        waterLevelCalender.getHours() +
                        ":" +
                        waterLevelCalender.getMinutes() +
                        ":" +
                        waterLevelCalender.getSeconds(),
                }
            })

            res.render("admin/water_level/view_water_level", {
                alert,
                waterLevel,
                waterLevelData,
                name: req.session.admin.name,
                title: "Halaman Water Level",
            })
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger")
            res.redirect("/suhu")
        }
    },
    postData: async (req, res, next) => {
        try {
            const { waterlevel } = req.body

            const payload = {
                waterlevel: waterlevel,
            }

            const waterlev = new WaterLevel(payload)
            await waterlev.save()

            res.status(200).json({ data: waterlev })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`,
            })
        }
    },
    getData: async (req, res) => {
        try {
            const waterLevel = await WaterLevel.find()

            res.status(200).json({ data: waterLevel })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`,
            })
        }
    },
    updateData: async (req, res, next) => {
        try {
            const { waterlevel = "" } = req.body

            const payload = {}

            if (waterlevel.length) payload.waterlevel = waterlevel

            const waterlev = await WaterLevel.findOneAndUpdate(
                {
                    _id: "624e7d876be8258c9c80cd8f",
                },
                payload,
                { new: true, runValidators: true }
            )

            res.status(201).json({
                data: {
                    id: waterlev.id,
                    waterLevel: waterlev.waterlevel,
                },
            })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`,
            })
        }
    },
    actionConvertCSV: async (req, res) => {
        const waterLevel = await WaterLevel.find().select(
            "waterlevel createdAt updatedAt"
        )
        console.log(waterLevel.length)
        let resultsArray = []
        for (let i = 0; i < waterLevel.length; i++) {
            resultsArray.push(i)
        }

        const fields = ["_id", "waterlevel", "createdAt", "updatedAt"]

        const json2csvParser = new Parser({ fields })
        const csv = json2csvParser.parse(waterLevel)

        console.log(csv)

        res.header("Content-Type", "text/csv")
        res.attachment("data-ketinggian-air.csv")
        return res.send(csv)
    },
}
