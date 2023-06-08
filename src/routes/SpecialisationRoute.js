const Appointment = require("../models/Appointment")
const Specialisation = require("../models/Specialisation")
const auth = require("../middleware/Auth")

const specialisationroute = ({app,db}) => {
  app.post("/specialisations",auth,async (req,res) => {
    const {
      body: {label}
    } = req

    const specialisationModel = Specialisation.bindKnex(db)
    const insertedSpecialisation = await specialisationModel.query().insertAndFetch({
      label:label
    })
    if (insertedSpecialisation) {
      res.send(insertedSpecialisation)
    } else {
      res.status(500).send()
    }
  })

  app.get("/specialisations",async (req,res) => {
    const specialisation = await db('specialisations')

    res.send(specialisation)
  })
}

module.exports = specialisationroute