const Lampu = require("../../src/db/Models/Lampu");
const Pump = require("../../src/db/Models/Pump");
const Tanah = require("../../src/db/Models/Tanah");
const OnOfManual = require("../../src/db/Models/OnOffManual");
const Suhu = require("../../src/db/Models/Suhu");
const WaterLevel = require("../../src/db/Models/Water");
const TDSLevel = require("../../src/db/Models/Air");
const Vegetable = require("../../src/db/Models/Setting");
const Userr = require("../../src/db/Models/Userr");

module.exports = {
  index: async (req, res) => {
    try {      
      const lampu = await Lampu.findOne()
      const suhu = await Suhu.findOne()
      const pump = await Pump.findOne()
      const tanah = await Tanah.findOne()
      const onOfManual = await OnOfManual.findOne()  
      const waterlevel = await WaterLevel.findOne()
      const tdsLevel = await TDSLevel.find().sort({created_at: -1}).limit(1);
      const vegetable1 = await Vegetable.findById("62772ed88e95ab077ed764a3");
      const vegetable2 = await Vegetable.findById("62787d4f9f1c9d93d46815cd");
      const user = await Userr.countDocuments();
      
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      res.render("admin/dashboard/view_dashboard",{
        name : req.session.admin.name,
        title: "Halaman Dashboard",
        count: {
          user
        },
        vegetable1,
        vegetable2,
        lampu,
        pump,
        suhu,
        tanah,
        onOfManual,
        waterlevel,
        tdsLevel,
        user,
        alert
      });
    } catch (err) {
      console.log(err);
    }
  },
  
  actionStatusLampu1: async (req, res) => {
    try {
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

      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");

      res.redirect("/dashboard");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboard");
    }
  },

  actionStatusLampu2: async (req, res) => {
    try {
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

      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");

      res.redirect("/dashboard");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboard");
    }
  },
  actionStatusPump1: async (req, res) => {
    try {
      const { id } = req.params;

      // let statusKontrol = onOfManual.statusKontrol;

      let lampu = await Lampu.findOne({}); //{ _id: "62414bbd1a431cac0b339833" }
      let pump = await Pump.findOne({}); //_id: "62430c4028e1eef562010284"

      let lampuStatus = lampu.status;

      let lampu1Status = lampu.lampu1;
      let lampu2Status = lampu.lampu2 ;

      let pumpStatus = pump.status;

      let pump1Status = pump.pump1 === "ON" ? "OFF" : "ON";
      let pump2Status = pump.pump2;

      lampu = await Lampu.findOneAndUpdate(
        {
          _id: id,
        },
        { 
          // status: lampuStatus,
          // lampu1: lampu1Status,
          // lampu2: lampu2Status,
        }
      );

      pump = await Pump.findOneAndUpdate(
        {
          _id: "62430c4028e1eef562010284",
        },
        { 
          // status: pumpStatus,
          pump1: pump1Status,
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

      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");

      res.redirect("/dashboard");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboard");
    }
  },
  actionStatusPump2: async (req, res) => {
    try {
      const { id } = req.params;

      // let statusKontrol = onOfManual.statusKontrol;

      let lampu = await Lampu.findOne({}); //{ _id: "62414bbd1a431cac0b339833" }
      let pump = await Pump.findOne({}); //_id: "62430c4028e1eef562010284"

      let lampuStatus = lampu.status;

      let lampu1Status = lampu.lampu1;
      let lampu2Status = lampu.lampu2 ;

      let pumpStatus = pump.status;

      let pump1Status = pump.pump1;
      let pump2Status = pump.pump2 === "ON" ? "OFF" : "ON";

      lampu = await Lampu.findOneAndUpdate(
        {
          _id: id,
        },
        { 
          // status: lampuStatus,
          // lampu1: lampu1Status,
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
          pump2: pump2Status,
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

      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");

      res.redirect("/dashboard");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboard");
    }

    },
    
  actionStatusControl: async (req, res) => {
    try {
      const { id } = req.params;

      let onOfManual = await OnOfManual.findOne({ _id: id });
      let statusKontrol = onOfManual.statusKontrol === "ON" ? "OFF" : "ON";

      let lampu = await Lampu.findOne({}); //{ _id: "62414bbd1a431cac0b339833" }
      let pump = await Pump.findOne({}); //_id: "62430c4028e1eef562010284"

      let lampuStatus = lampu.status === "ON" ? "OFF" : "ON";

      let lampu1Status = lampu.lampu1;
      let lampu2Status = lampu.lampu2;

      let pumpStatus = pump.status === "ON" ? "OFF" : "ON";

      let pump1Status = pump.pump1;
      let pump2Status = pump.pump2;

      onOfManual = await OnOfManual.findOneAndUpdate(
        {
          _id: id,
        },
        { statusKontrol }
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

      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");

      res.redirect("/dashboard");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboard");
    }
  },
  };
