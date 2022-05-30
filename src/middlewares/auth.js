const { decodeJWT } = require("../helpers/jwt")
const response = require("../helpers/response")

module.exports = {
    checkToken: async (req,res,next) => {
        try {
            if(req.headers.authorization){
                const authHeader = req.headers.authorization.split(" ")
                if(authHeader[0] === "Bearer"){
                    const accessToken = await decodeJWT(authHeader[1])
                    req.user = accessToken
                    next()
                } else {
                    response.unauthorized(res);
                }
            } else {
                response.unauthorized(res)
            }
        } catch (error) {
            response.bad(error.message,res)
        }
    }
}