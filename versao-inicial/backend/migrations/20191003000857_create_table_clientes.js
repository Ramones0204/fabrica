
exports.up = function(knex, Promise) {
    return knex.schema.createTable('clientes', table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cpf').notNull().unique()
        table.string('sexo')
        table.string('email').notNull().unique()
        table.string('telefone')
        table.string('celular')
        table.string('senha')
        table.string('dataNascimento')
       
    
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('clientes')
};
