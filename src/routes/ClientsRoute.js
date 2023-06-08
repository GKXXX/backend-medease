const HashPassword = require('../HashPassword')
const Client = require('../models/Client')
const auth = require("../middleware/Auth")


const clientRoute = ({ app, db }) => {
  app.post('/client',async (req,res) => {
    let {
      body:{firstName,lastName,email,birthDate,phone,adress,city,postalCode,sexe,vitalNum,password},
    } = req

    const [hashedPassword,passwordSalt] = HashPassword(password)
    const [vitalNumHashed,vitalNumSalt] = HashPassword(vitalNum)
    const ClientModel = Client.bindKnex(db)
    const insertedClient = await ClientModel.query().insertAndFetch({
      firstName:firstName,
      lastName:lastName,
      email:email,
      birthdate:birthDate,
      phone:phone,
      adress:adress,
      city:city,
      postalCode:postalCode,
      sexe:sexe,
      encodedPassword:hashedPassword,
      passwordSalt:passwordSalt,
      encodedVitalNum:vitalNumHashed,
      vitalNumSalt:vitalNumSalt
    })
    if (insertedClient) {
      res.status(200).send(insertedClient)
    } else {
      res.status(500).send()
    }
  })

  app.get("/client/:idClient",auth,async (req,res) => {
    const {
      params:{idClient}
    } = req

    const clientModel = Client.bindKnex(db)
    const result = ClientModel.where('id',idClient)

    if (result) {
      res.status(200).send(result)
    } else {
      res.status(404).send()
    }
  })
}

module.exports = clientRoute