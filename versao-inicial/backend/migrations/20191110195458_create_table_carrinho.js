exports.up = function(knex, Promise) {
    return knex.schema.createTable('carrinho', table =>{
        table.integer('id_pedido').references('num_pedido').inTable('pedido')
        table.integer('id_produto_carrinho').references('idProduto').inTable('produtos')
		table.integer('qtd')
      
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('carrinho')
};
