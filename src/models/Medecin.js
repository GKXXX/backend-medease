const {Model} = require('objection')

class Medecin extends Model {
  static get tableName(){
    return 'medecins'
  }
}

module.exports = Medecin