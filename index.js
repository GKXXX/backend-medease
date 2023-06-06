const express = require('express')
const morgan = require('morgan')
const {Model} = require('objection')
const Knex = require('knex')
const knexfilejs = require('./knexfile')
const axios = require('axios')

const app = express()

app.use(morgan("dev"))
app.use(express.json())

const db = knex(knexfilejs)



app.listen(3002,() => console.log("Listening on port 3002"))