const Building = require("../models/Building")
const auth = require("../middleware/Auth")

const buildingRoute = ({app,db}) => {
  app.post("/buildings",auth,async (req,res) => {
    const {
      body: {label,adress,city,postalCode}
    } = req

    const BuildingModel = Building.bindKnex(db)
    const insertedBuilding = await BuildingModel.query().insertAndFetch({
      label:label,
      adress:adress,
      city:city,
      postalCode:postalCode
    })

    res.send(insertedBuilding)
    
  })

  app.get("/buildings",async (req,res) => {
    const buildings = await db('buildings')

    res.send(buildings)
  })
}

module.exports = buildingRoute