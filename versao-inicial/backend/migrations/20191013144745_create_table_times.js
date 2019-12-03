exports.up = function(knex, Promise) {
    return knex.schema.createTable('times', table =>{
        table.increments('idTime').primary()
        table.string('nameTime').notNull()
        table.string('regiao')
        table.string('estado')
        table.string('pais')
        table.string('tipoTime')
        table.integer('ligaId').references('ligaId').inTable('ligas').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('times')
};
