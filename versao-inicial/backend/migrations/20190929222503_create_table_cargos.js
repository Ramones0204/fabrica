
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cargos', table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('salary').notNull()
        
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cargos')
};
