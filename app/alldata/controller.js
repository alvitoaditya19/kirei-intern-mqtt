const Tanah = require("../../src/db/Models/Tanah")
const Suhu = require("../../src/db/Models/Suhu")
const WaterLevel = require("../../src/db/Models/Water")
const TDSLevel = require("../../src/db/Models/Air")
const Vegetable = require("../../src/db/Models/Setting")
const User = require("../auth/model")

module.exports = {
    getData: async (req, res, next) => {
        try {
            const suhu = await Suhu.find()
            const waterLevel = await WaterLevel.find()
            const tanah = await Tanah.find()
            const air = await TDSLevel.find()

            suhu.sort(function (a, b) {
                var keyA = new Date(a.updatedAt),
                    keyB = new Date(b.updatedAt)
                // Compare the 2 dates
                if (keyA < keyB) return 1
                if (keyA > keyB) return -1
                return 0
            })

            waterLevel.sort(function (a, b) {
                var keyA = new Date(a.updatedAt),
                    keyB = new Date(b.updatedAt)
                // Compare the 2 dates
                if (keyA < keyB) return 1
                if (keyA > keyB) return -1
                return 0
            })

            tanah.sort(function (a, b) {
                var keyA = new Date(a.updatedAt),
                    keyB = new Date(b.updatedAt)
                // Compare the 2 dates
                if (keyA < keyB) return 1
                if (keyA > keyB) return -1
                return 0
            })

            air.sort(function (a, b) {
                var keyA = new Date(a.updatedAt),
                    keyB = new Date(b.updatedAt)
                // Compare the 2 dates
                if (keyA < keyB) return 1
                if (keyA > keyB) return -1
                return 0
            })

            const dataSuhu = suhu.slice(0, 5)
            const datawaterLevel = waterLevel.slice(0, 5)
            const dataTanah = tanah.slice(0, 5)
            const dataAir = air.slice(0, 5)

            const data = dataSuhu
                .concat(datawaterLevel)
                .concat(dataTanah)
                .concat(dataAir)

            res.status(200).json({ data: data })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`,
            })
        }
    },
}
