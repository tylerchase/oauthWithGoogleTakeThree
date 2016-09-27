
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.string('id');
    table.string('token');
    table.string('name')
    table.string('email');
    table.text('photo')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
