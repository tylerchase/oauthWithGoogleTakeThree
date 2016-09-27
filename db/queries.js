var knex = require('./knex_config.js')

var getAllUsers = function(){
  return knex('users')
}
module.exports = {
  getAllUsersByIdAndGoogleProfileId : function(){
    getAllUsers().where('id', profile.id)
  }

}
