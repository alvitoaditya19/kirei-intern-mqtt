const Lampu = require("../../src/db/Models/Lampu");
const Pump = require("../../src/db/Models/Pump");

const OnOffManual = require("../../src/db/Models/OnOffManual");

module.exports = {
  actionCreate: async (req, res) => {
    try {
      const { lampu1, lampu2 } = req.body;

      const payload = {
        lampu1: lampu1,
        lampu2: lampu2,
      };

      const lampu = new Lampu(payload);
      await lampu.save();

      res.status(200).json({ data: lampu });
    } catch (err) {
      res.status(500).json({message: err.message || `Internal Server Error`});
    }
  },

  actionStatusLampu1: async (req, res) => {
    try {
      const { id } = req.params;
      let lampu = await Lampu.findOne({ _id: id });
      let lampu1 = lampu.lampu1 === "ON" ? "OFF" : "ON";

      lampu = await Lampu.findOneAndUpdate(
        {
          _id: id,
        },
        { lampu1 }
      );

      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");

      res.redirect("/lampu");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lampu");
    }
  },

  actionStatusLampu2: async (req, res) => {
    try {
      const { id } = req.params;
      let lampu = await Lampu.findOne({ _id: id });
      let lampu2 = lampu.lampu2 === "ON" ? "OFF" : "ON";

      lampu = await Lampu.findOneAndUpdate(
        {
          _id: id,
        },
        { lampu2 }
      );

      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");

      res.redirect("/lampu");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lampu");
    }
  },
  lampu: async (req, res) => {
    try {
      const status = await OnOffManual.find().select('_id statusKontrol');
      
      const lampu = await Lampu.find().select('_id lampu1 lampu2');
      const data = {lampu, status}

      res.status(200).json({ data: data });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
},

  updateLampu: async (req, res) => {
    try {
      const {id} = req.params
      const { lampu1 = "", lampu2 = "" } = req.body;

      const payload = {};

      if (lampu1.length) payload.lampu1 = lampu1;
      if (lampu2.length) payload.lampu2 = lampu2;

      const lampu = await Lampu.findOneAndUpdate(
        {
          _id: id,
        },
        payload,
        { new: true, runValidators: true }
      );

      res.status(201).json({
        data: {
          id: lampu.id,
          lampu1: lampu.lampu1,
          lampu2: lampu.lampu2,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
  },

  updateLampu1:async (req, res) => {
    const { id } = req.params;

      // let statusKontrol = onOfManual.statusKontrol;

      let lampu = await Lampu.findOne({}); //{ _id: "62414bbd1a431cac0b339833" }
      let pump = await Pump.findOne({}); //_id: "62430c4028e1eef562010284"

      let lampuStatus = lampu.status;

      let lampu1Status = lampu.lampu1 === "ON" ? "OFF" : "ON";
      let lampu2Status = lampu.lampu2;

      let pumpStatus = pump.status;

      let pump1Status = pump.pump1;
      let pump2Status = pump.pump2;

      lampu = await Lampu.findOneAndUpdate(
        {
          _id: id,
        },
        { 
          // status: lampuStatus,
          lampu1: lampu1Status,
          // lampu2: lampu2Status,
        }
      );

      pump = await Pump.findOneAndUpdate(
        {
          _id: "62430c4028e1eef562010284",
        },
        { 
          // status: pumpStatus,
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
          id: lampu.id,
          lampu1: lampu.lampu1,
        },
      });
  },
  updateLampu2:async (req, res) => {
    const { id } = req.params;

      // let statusKontrol = onOfManual.statusKontrol;

      let lampu = await Lampu.findOne({}); //{ _id: "62414bbd1a431cac0b339833" }
      let pump = await Pump.findOne({}); //_id: "62430c4028e1eef562010284"

      let lampuStatus = lampu.status;

      let lampu1Status = lampu.lampu1;
      let lampu2Status = lampu.lampu2 === "ON" ? "OFF" : "ON";

      let pumpStatus = pump.status;

      let pump1Status = pump.pump1;
      let pump2Status = pump.pump2;

      lampu = await Lampu.findOneAndUpdate(
        {
          _id: id,
        },
        { 
          // status: lampuStatus,
          // lampu1: lampu1Status,
          lampu2: lampu2Status,
        }
      );

      pump = await Pump.findOneAndUpdate(
        {
          _id: id,
        },
        { 
          // status: pumpStatus,
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
          id: lampu.id,
          lampu2: lampu.lampu2,
        },
      });
  }
};
