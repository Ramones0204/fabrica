exports.up = function(knex, Promise) {
    return knex.schema.createTable('carrinho', table =>{
        table.integer('nr_pedido').references('num_pedido').inTable('pedido')
        table.integer('nr_produto').references('idProduto').inTable('produtos')
        table.integer('qtd')
        table.float('valor_unidade')
        table.float('sub_total')
      
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('carrinho')
};
