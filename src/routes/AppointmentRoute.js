const Appointment = require("../models/Appointment")
const auth = require("../middleware/Auth")

const appointmentRoute = ({app,db}) => {
  app.post("/appointments",auth,async (req,res) => {
    const {
      body: {title,description,idMedecin,idClient,idRoom,dateAppointment}
    } = req

    const AppointmentModel = Appointment.bindKnex(db)
    const insertedAppointment = await AppointmentModel.query().insertAndFetch({
      motif:title,
      description:description,
      idMedecin:idMedecin,
      idClient:idClient,
      idRoom:idRoom,
      dateAppointment:dateAppointment
    })
    if (insertedAppointment) {
      res.send(insertedAppointment)
    } else {
      res.status(500).send()
    }
  })

  app.get("/appointments/client/:idClient",auth,async (req,res) => {
    const {
      params:{idClient},
    } = req

    const AppointmentModel = Appointment.bindKnex(db)
    const result = await db("appointments").where('idClient',idClient)

    if (result) {
      res.send(result)
    } else {
      res.status(404).send()
    }
  })

  app.get("/appointments/medecins/:idMedecin",auth,async (req,res) => {
    const {
      params:{idMedecin},
    } = req

    const AppointmentModel = Appointment.bindKnex(db)
    const result = await db("appointments").where('idMedecin',idMedecin)

    if (result) {
      res.send(result)
    } else {
      res.status(404).send()
    }
  })

  app.get("/appointments/creneaux",async (req,res) => {
     const AppointmentModel = Appointment.bindKnex(db)
     const listAppointments = await db('appointments').orderBy('dateAppointment')

     const listJoursPris = await db('appointments').select('dateAppointment')
     console.log(listJoursPris)
     listJoursPris.map((element) => {
      element.dateAppointment = element.dateAppointment.toISOString().split("T")[0]
     }).filter((date,index) => listJoursPris.indexOf(date) === index)
     console.log(listJoursPris)

     if (result) {
      res.status(200).send(result)
     } else {
      res.status(404).send()
     }
    })

  app.get("/appointments",async (req,res) => {
    const appointments = await db('appointments')

    res.send(appointments)
  })
}

module.exports = appointmentRoute