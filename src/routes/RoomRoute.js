const Room = require("../models/Room")
const auth = require("../middleware/Auth")

const roomRoute = ({app,db}) => {
  app.post("/rooms",auth,async (req,res) => {
    const {
      body: {label,idBuilding}
    } = req

    const roomModel = Room.bindKnex(db)
    const insertedRoom = await roomModel.query().insertAndFetch({
      label:label,
      idBuilding:idBuilding
    })
    if (insertedRoom) {
      res.send(insertedRoom)
    } else {
      res.status(500).send()
    }
  })

  app.get("/rooms",async (req,res) => {
    const buildings = await db('rooms')

    res.send(buildings)
  })
}

module.exports = roomRoute