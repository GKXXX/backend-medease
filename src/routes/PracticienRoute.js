const HashPassword = require('../HashPassword')
const Medecin = require('../models/Medecin')
const auth = require('../middleware/Auth')

const practicienRoute = ({ app, db }) => {
  app.post('/medecin',async (req,res) => {
    let {
      body:{firstName,lastName,email,birthDate,phone,adress,city,postalCode,sexe,password},
    } = req

    const [passwordHash,passwordSalt] = HashPassword(password)
    console.log(req.body);
    const medecinObjection = Medecin.bindKnex(db);
    const insertedPracticien = await medecinObjection.query().insertAndFetch({
      firstName:firstName,
      lastName:lastName,
      email:email,
      birthdate:birthDate,
      phone:phone,
      adress:adress,
      city:city,
      postalCode:postalCode,
      sexe:sexe,
      encodedPassword:passwordHash,
      passwordSalt:passwordSalt
    })

    if (insertedPracticien) {
      res.status(200).send(insertedPracticien)
    } else {
      res.status(500).send()
    }
  })

  app.get("/medecin/:idMedecin",auth,async (req,res) => {
    const {
      params:{idMedecin}
    } = req

    const medecinModel = Medecin.bindKnex(db)
    const result = medecinModel.where('id',idMedecin)

    

    if (result) {
      res.status(200).send(result)
    } else {
      res.status(404).send()
    }
  })

  
}

module.exports = practicienRoute