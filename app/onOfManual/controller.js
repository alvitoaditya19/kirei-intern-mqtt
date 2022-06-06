const OnOfManual = require("../../src/db/Models/OnOffManual");
const Lampu = require("../../src/db/Models/Lampu");
const Pump = require("../../src/db/Models/Pump");


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
      let lampu = await Lampu.findOne({}); //{ _id: "62414bbd1a431cac0b339833" }
      let pump = await Pump.findOne({}); //_id: "62430c4028e1eef562010284"

      let lampuStatus = lampu.status === "ON" ? "OFF" : "ON";

      let lampu1Status = lampu.lampu1;
      let lampu2Status = lampu.lampu2;

      let pumpStatus = pump.status === "ON" ? "OFF" : "ON";

      let pump1Status = pump.pump1;
      let pump2Status = pump.pump2;

      const status = await OnOfManual.findOneAndUpdate(
        {
          _id: id,
        },
        payload,
        { new: true, runValidators: true }
      );

      lampu = await Lampu.findOneAndUpdate(
        {
          _id: "62414bbd1a431cac0b339833",
        },
        { 
          status: lampuStatus,
          // lampu1: lampu1Status,
          // lampu2: lampu2Status,
        }
      );

      pump = await Pump.findOneAndUpdate(
        {
          _id: "62430c4028e1eef562010284",
        },
        { 
          status: pumpStatus,
          // pump1: pump1Status,
          // pump2: pump2Status,
        }
      );

      const mqtt = require('mqtt')

      const host = 'tos.kirei.co.id'
      // const port = '1883'
      const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

      const connectUrl = `mqtt://${host}}`

      const topicLamp = 'intern-KIREI/IOT/Lampu'
      const topicPump = 'intern-KIREI/IOT/Pump'

      const payloadLampu = {
        lampu1: lampu1Status,
        lampu2: lampu2Status,
        status: lampuStatus
      }
      const payloadPump = {
        status: pumpStatus,
        pump1: pump1Status,
        pump2: pump2Status
      }

      const dataJsonLampu = await JSON.stringify(payloadLampu)
      const dataJsonPump = await JSON.stringify(payloadPump)

      const client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        // username: 'emqx',
        // password: 'public',
        // reconnectPeriod: 1000,
      })
      client.on('connect', () => {
        // console.log('Connected')
        // client.subscribe([topic], () => {
        //   console.log(`Subscribe to topic '${topic}'`)
        // }) 

        client.publish(topicLamp, dataJsonLampu, { qos: 1, retain: true }, (error) => {
          if (error) {
            console.error(error)
          }

        })

        client.publish(topicPump, dataJsonPump, { qos: 1, retain: true }, (error) => {
       if (error) {
            console.error(error)
          }

        })
      })
      client.on('message', (topic, payload) => {
        // console.log('Received Message:', topic, payload.toString())
      })

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
