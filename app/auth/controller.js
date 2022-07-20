/* eslint-disable no-unused-vars */
const User = require('./model');
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtKey } = require('../../config');

module.exports = {
  signup : async (req, res, next) => {
    try {
      const payload = req.body

      if(req.file){
        let tmp_path = req.file.path;
        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const user = new User({ ...payload, avatar: filename });

            await user.save();

            
            delete user._doc.password

            res.status(201).json({ data : user })

          } catch (err) {
            if(err && err.name === "ValidationError"){
              return res.status(422).json({
                error: 1,
                message: err.message,
                fields: err.errors,
              })
            }
            next(err)
          }
        });
      }else{
        let user = new User(payload)

        await user.save()

        delete user._doc.password

        res.status(201).json({ data : user })
      }

    } catch (err) {
      if(err && err.name === "ValidationError"){
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        })
      }
      next(err)
    }
  },

  signin : (req, res) => {
    const { email, password } = req.body

    User.findOne({ email : email }).then((user) => {
      if(user){
        const checkPassword = bcrypt.compareSync(password, user.password)
        if(checkPassword){
          const token = jwt.sign({
            user : {
              id: user.id,
              username: user.username,
              email: user.email,
              name : user.name,
              role: user.role,
              phoneNumber : user.phoneNumber,
              avatar: user.avatar ?? "Image Not Found",
            }
          }, config.jwtKey)

          res.status(200).json({
            data:{ token }
          })
        }else{
          res.status(403).json({
            message: 'password yang anda masukkan salah'
          })
        }
      } else{
        res.status(403).json({
          message: 'email yang anda masukan belum terdaftar'
        })
      }
    }).catch((err)=>{
      message: err.message || 'Internal Server Error'
    })
  }
}