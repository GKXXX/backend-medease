const practicienRoute = ({ app, db }) => {
  app.post('/medecin',async (req,res) => {
    let {
      body:{firstName,lastName,email,birthDate,phone,adress,city,postalCode,sexe,idSpecialisation,password},
    } = req

    
  })
}

module.exports = practicienRoute