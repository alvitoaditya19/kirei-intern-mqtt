const Sensor = require("../db/Models/Sensor")
const response = require("../helpers/response")

module.exports = {
    findData: async (req,res) => {
        try {
            const {from, to, device_id} = req.query

            const condition = {}
            if(device_id){
                condition.device_id = device_id
            }
            if(from && to){
                const fromISO = await new Date(from)
                const toISO = await new Date(to)
                condition.created_at = {
                    $gt:fromISO,
                    $lt:toISO
                }
            }
            const result = await Sensor.find(condition).select('device_id temperature humidity created_at')
            if(result.length > 0){
                response.ok(result,res)
            } else {
                response.notFound("No data found",res)
            }
        } catch (error) {
            response.bad(error.message,res)
        }
    }
}