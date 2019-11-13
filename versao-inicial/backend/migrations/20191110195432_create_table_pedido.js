exports.up = function(knex, Promise) {
    return knex.schema.createTable('pedido', table =>{
        table.increments('num_pedido').primary()
        table.string('data_pedido')
		table.string('name_cliente')
        table.string('cpf_cliente')
        table.string('email_cliente')
        table.string('telefone_cliente')
        table.string('celular_cliente')
      
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pedido')
};
