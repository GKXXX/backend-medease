const {Model} = require('objection')

class Building extends Model {
  static get tableName(){
    return 'buildings'
  }
}

module.exports = Building