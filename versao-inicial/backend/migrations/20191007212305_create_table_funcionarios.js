
exports.up = function(knex, Promise) {
    return knex.schema.createTable('funcionarios', table =>{
        table.increments('matricula').primary()
        table.string('name').notNull()
        table.string('cpf').notNull()
        table.string('sexo')
        table.string('email').notNull().unique()
        table.string('telefone')
        table.string('celular')
        table.string('senha')
        table.string('dataNascimento')
        table.integer('cargoId').references('id').inTable('cargos').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('funcionarios')
};
