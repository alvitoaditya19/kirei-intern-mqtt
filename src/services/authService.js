const User = require("../db/Models/User")
const { hash, verifyHash } = require("../helpers/crypto")
const { generateJWT, decodeJWT } = require("../helpers/jwt")
const response = require("../helpers/response")

module.exports = {
    registerUser: async (req, res) => {
        const { username, email, password } = req.body
        try {
            const isUserExist = await User.findOne({
                $or: [{ username: username }, { email: email }]
            })
            if(isUserExist){
                response.alreadyExist("Email or Username already exist",res)
            } else {
                const hashedPassword = await hash(password)
                const newUser = await new User({...req.body, password:hashedPassword}).save()
                response.ok(`${email} - Has been added as new user`, res)
            }
        } catch (error) {
            response.bad(error.message,res)
        }
    },
    login: async (req,res) => {
        try {
            const {username,password} = req.body
            const isUserExist = await User.findOne({username:username}).select(`name email username role_id password`)
            if(isUserExist){
                const isPassowrdMatch = await verifyHash(password,isUserExist.password)
                if(isPassowrdMatch){
                    const user = {...isUserExist._doc}
                    delete user.password
                    const userCredential = {accessToken:await generateJWT(user)}
                    response.ok(userCredential,res)
                } else {
                    response.bad("Wrong password",res)
                }
            } else {
                response.notFound({message:"User not found"},res)
            }
        } catch (error) {
            console.error(error);
            response.bad(error.message,res)
        }
    },
    decodeToken: async (req,res) => {
        response.ok(req.user,res)
    }
}
