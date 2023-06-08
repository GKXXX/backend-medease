const {Model} = require('objection')

class Appointment extends Model {
  static get tableName(){
    return 'appointments'
  }
}

module.exports = Appointment