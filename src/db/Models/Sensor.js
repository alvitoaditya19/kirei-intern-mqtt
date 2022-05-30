const moongose = require('mongoose')

// Sensor data schema
// Adjust this Schema based on sensor that used
const SensorSchema = moongose.Schema({
    device_id: {
        type: String,
        required: true
    }, 
    temperature:{
        type: Number
    },
    humidity: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Sensor = moongose.model("Sensor", SensorSchema)

module.exports = Sensor