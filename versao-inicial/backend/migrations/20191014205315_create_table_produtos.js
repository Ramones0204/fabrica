
exports.up = function(knex, Promise) {
    return knex.schema.createTable('produtos', table =>{
        table.increments('idProduto	').primary()
        table.binary('imagem')
        table.string('nameProduto')
		table.string('desc')
        table.float('preco')
        table.string('tipoGola')
        table.string('tipoManga')
        table.string('tamanho')
        table.integer('idTime').references('idTime').inTable('times').notNull()
		table.integer('idTipoProduto').references('id').inTable('tipoprodutos').notNull()
		table.integer('idMarca').references('id').inTable('marcas').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('produtos')
};
