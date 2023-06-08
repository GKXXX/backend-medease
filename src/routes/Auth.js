const HashPassword = require('../HashPassword')
const Medecin = require('../models/Medecin')
const jwt = require("jsonwebtoken");
require('dotenv').config()

const auth = async ({ app, db }) => {
  app.post('/connect',async (req,res) => {
    let {
      body:{email,password},
    } = req

    const connectingMedecin = await db('medecins').select('id','encodedPassword','passwordSalt').where('email',"%" +email +"%" )
    let connectingUser = await db('clients').select('id','encodedPassword','passwordSalt').whereLike("email","%" +email +"%")


    if(connectingMedecin[0] != undefined) {
      if (HashPassword(password,connectingMedecin.passwordSalt)) {
        const token = jwt.sign(
          {
            user_id:connectingMedecin.id,email,isMedecin:true
          },
          process.env.TOKEN_KEY,
          {expiresIn:"2h"})
        res.status(200).send(token)
      }
    } else if (connectingUser[0] != undefined){
      if (HashPassword(password,connectingUser.passwordSalt)) {
        const token = jwt.sign(
          {
            user_id:connectingUser.id,email,isMedecin:true
          },
          process.env.TOKEN_KEY,
          {expiresIn:"2h"})
        res.status(200).send(token)
      }
    } else {
      res.status(404).send("Utilisateur introuvable")
    }
  })

  
}

module.exports = auth