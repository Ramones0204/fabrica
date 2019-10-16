
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cumpomdesconto', table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('valor').notNull()
        
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cumpomdesconto')

};
