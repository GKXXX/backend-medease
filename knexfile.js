require('dotenv').config()

module.exports = {
  client:"pg",
  connection: {
    host:process.env.DB_HOST,
    port:5432,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PWD,
    database:process.env.DB_NAME
  }
}