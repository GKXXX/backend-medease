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
    const connectingUser = await db('clients').select('id','encodedPassword','passwordSalt').whereLike("email","%" +email +"%")

    console.log(connectingUser)

    if(connectingMedecin[0] != undefined) {
      if (HashPassword(password,connectingMedecin[0].passwordSalt)[0] === connectingMedecin[0].encodedPassword) {
        const token = jwt.sign(
          {
            user_id:connectingMedecin[0].id,email,isMedecin:true
          },
          process.env.TOKEN_KEY,
          {expiresIn:"2h"})
        res.status(200).send(token)
      } else {
        res.status(404).send("Utilisateur introuvable")
      }
    } else if (connectingUser[0] != undefined){
      console.log(HashPassword(password,connectingUser.passwordSalt)[0])
      console.log(connectingUser.encodedPassword)
      if (HashPassword(password,connectingUser[0].passwordSalt)[0] === connectingUser[0].encodedPassword) {
        const token = jwt.sign(
          {
            user_id:connectingUser[0].id,email,isMedecin:true
          },
          process.env.TOKEN_KEY,
          {expiresIn:"2h"})
        res.status(200).send(token)
      } else {
        res.status(404).send("Utilisateur introuvable")
      }
    } else {
      res.status(404).send("Utilisateur introuvable")
    }
  })

  
}

module.exports = auth