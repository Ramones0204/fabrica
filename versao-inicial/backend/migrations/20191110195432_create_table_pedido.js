exports.up = function(knex, Promise) {
    return knex.schema.createTable('pedido', table =>{
        table.increments('num_pedido').primary()
        table.string('data_pedido')
        table.string('cpf_cliente')
        table.integer('st_pedido')
      
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pedido')
};
