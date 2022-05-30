const mqtt = require("mqtt");
const { storeData, getDataLampu,getDataButtonManual,getDataPump } = require("./dataHandler");

// const { storeDataLampu } = require("./dataHandler");
const { storeDataSuhu } = require("./dataHandler");
const { storeDataKelembapanTanah } = require("./dataHandler");
const { storeDataKeruhAir } = require("./dataHandler");
const { storeDataWaterLevel } = require("./dataHandler");
// const { storeDataButtonManual } = require("./dataHandler");

const client = mqtt.connect(process.env.MQTT_HOST)

client.on('connect',()=> {
    console.log("MQTT Broker connected");
    client.subscribe('kirei/IOT',() => console.log('kirei/IOT subscribed'));
    client.subscribe('kirei/IOT/KeruhAir',() => console.log('kirei/IOT/KeruhAir subscribed'));
    client.subscribe('kirei/IOT/ButtonManual',() => console.log('kirei/IOT/ButtonManual subscribed'));
    client.subscribe('kirei/IOT/Lampu',() => console.log('kirei/IOT/Lampu subscribed'));
    client.subscribe('kirei/IOT/KelembapanTanah',() => console.log('kirei/IOT/KelembapanTanah subscribed'));4
    client.subscribe('kirei/IOT/WaterLevel',() => console.log('kirei/IOT/WaterLevel subscribed'));
    client.subscribe('kirei/IOT/Suhu',() => console.log('kirei/IOT/Suhu subscribed'));
    client.subscribe('kirei/IOT/Pump',() => console.log('kirei/IOT/Pump subscribed'));

})

//Device message should be in JSON string format
client.on('message',(topic,payload) => {
    if(topic === 'kirei/IOT'){
        storeData(payload)
    }else if(topic === 'kirei/IOT/KeruhAir'){
        storeDataKeruhAir(payload)
    }else if(topic === 'kirei/IOT/ButtonManual'){
        // storeDataLampu(payload)
        getDataButtonManual(payload)
    }
    else if(topic === 'kirei/IOT/Lampu'){
        // storeDataLampu(payload)
        getDataLampu(payload)
    }else if(topic === 'kirei/IOT/Pump'){
        // storeDataLampu(payload)
        getDataPump(payload)
    }else if(topic === 'kirei/IOT/KelembapanTanah'){
        storeDataKelembapanTanah(payload)
    }
    else if(topic === 'kirei/IOT/WaterLevel'){
        storeDataWaterLevel(payload)
    }
    else if(topic === 'kirei/IOT/Suhu'){
        storeDataSuhu(payload)
    }
})

module.exports = client