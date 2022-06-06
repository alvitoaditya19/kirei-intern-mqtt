const response = require("../helpers/response");
const client = require("../mqtt")
module.exports = {
    commandHandler: (req,res) => {
        client.publish("intern-KIREI/IOT",JSON.stringify(req.body),(err)=>{
            if(err) {
                console.error(err.message);
                response.bad(err?.message || "Failed to publish",res)
            }
            response.ok({...req.body,isSent:true},res)
        })
    }
}