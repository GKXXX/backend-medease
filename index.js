const express = require("express");
const morgan = require("morgan");
const { Model } = require("objection");
const Knex = require("knex");
const knexfilejs = require("./knexfile");
const axios = require("axios");
const buildingRoute = require("./src/routes/BuildingRoute");
const clientsRoute = require("./src/routes/ClientsRoute");
const practicienRoute = require("./src/routes/PracticienRoute");
const auth = require("./src/routes/Auth");
const roomRoute = require("./src/routes/RoomRoute");
const specialisationRoute = require("./src/routes/SpecialisationRoute");
const appointmentRoute = require("./src/routes/AppointmentRoute");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const db = Knex(knexfilejs);

buildingRoute({ app, db });
clientsRoute({ app, db });
practicienRoute({ app, db });
auth({ app, db });
roomRoute({ app, db });
specialisationRoute({ app, db });
appointmentRoute({ app, db });

app.listen(process.env.LISTENING_PORT, () =>
  console.log("Listening on port " + process.env.LISTENING_PORT)
);
