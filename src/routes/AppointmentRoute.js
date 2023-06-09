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

  function filtrerDoublons(tableauDate) {
    return tableauDate.filter((date,index) => tableauDate.indexOf(date) === index)
  }

  app.get("/appointments/creneaux",async (req,res) => {
     let listAppointments = await db('appointments').orderBy('dateAppointment')

     let listJoursPris = await db('appointments').select('dateAppointment')
     listJoursPris = listJoursPris.map((element) => {
      return new Date(element.dateAppointment.toISOString  ().split("T")[0]).toISOString()
     })
     listJoursPris = filtrerDoublons(listJoursPris)

     let arrayToSend = Array()

     for (let i = 0; i <= listJoursPris.length;i++) {
      arrayToSend.push({"jour":listJoursPris.get(i).dateAppointment,"listAppointment":Array()})
      for (let j = 0; j <= listAppointments.length;j++) {
        
      }
     }
     
     
     

     if (result) {
      res.status(200).send(result)
     } else {
      res.status(404).send()
     }
    })



  app.get("/appointments",async (req,res) => {
    const appointments = await db('appointments')
    .innerJoin('medecins','appointments.idMedecin','medecins.id')
    .innerJoin('specialisations','medecins.idSpecialisation','specialisations.id')
    .select('appointments.id',
    'appointments.motif',
    'appointments.description',
    'appointments.idClient',
    'appointments.dateAppointment',
    'appointments.idRoom',
    'medecins.firstName',
    'medecins.lastName',
    'medecins.email',
    'medecins.phone',
    'medecins.idSpecialisation',
    'specialisations.label')

    res.status(200).send(appointments)
  })
}

module.exports = appointmentRoute