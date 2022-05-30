const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY,JWT_EXPIRE_PERIOD } = process.env

module.exports = {
    generateJWT: async (data) => {
        return await jwt.sign(data,JWT_SECRET_KEY,{expiresIn:JWT_EXPIRE_PERIOD})
    },
    decodeJWT: async (data) => {
        return await jwt.verify(data,JWT_SECRET_KEY)
    }
}