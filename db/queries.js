var knex = require('./knex_config.js')

module.exports = {
  getAllUsers : function(){
    return knex('users')
  },
  getAllUsersByIdAndGoogleProfileId : function(id){
    getAllUsers().where('id', profile.id)
  }

}
