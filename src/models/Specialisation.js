const {Model} = require('objection')

class Specialisation extends Model {
  static get tableName(){
    return 'specialisations'
  }
}

module.exports = Specialisation