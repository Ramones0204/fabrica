const admin = require('./admin')

module.exports = app => {

    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/stats')
        //.all(app.config.passport.authenticate())
        .get(app.api.stat.get)

    app.route('/cargos')
         .post(app.api.cargo.save)
          .get(app.api.cargo.get)
  
    app.route('/cargos/:id')
          .put(app.api.cargo.save)
          .get(app.api.cargo.getById)
          .delete(app.api.cargo.remove)

    app.route('/marcas')
          .post(app.api.marca.save)
           .get(app.api.marca.get)
   
    app.route('/marcas/:id')
           .put(app.api.marca.save)
           .get(app.api.marca.getById)
           .delete(app.api.marca.remove)

    app.route('/ligas')
          .post(app.api.liga.save)
           .get(app.api.liga.get)
   
    app.route('/ligas/:ligaId')
           .put(app.api.liga.save)
           .get(app.api.liga.getById)
           .delete(app.api.liga.remove)
    
    app.route('/tiposprodutos')
           .post(app.api.tipoproduto.save)
            .get(app.api.tipoproduto.get)
    
    app.route('/tiposprodutos/:id')
            .put(app.api.tipoproduto.save)
            .get(app.api.tipoproduto.getById)
            .delete(app.api.tipoproduto.remove)
    
    app.route('/cupomdesconto')
            .post(app.api.cupomdesconto.save)
             .get(app.api.cupomdesconto.get)
     
     app.route('/cupomdesconto/:id')
             .put(app.api.cupomdesconto.save)
             .get(app.api.cupomdesconto.getById)
             .delete(app.api.cupomdesconto.remove)
     
    app.route('/cliente')
             .post(app.api.cliente.save)
              .get(app.api.cliente.get)
      
    app.route('/cliente/:id')
              .post(app.api.cliente.save)
              .get(app.api.cliente.getById)

    app.route('/funcionario')
              .post(app.api.funcionario.save)
              .get(app.api.funcionario.get)
           //   .get(app.api.funcionario.getTeste)
              
    app.route('/funcionario/:matricula')
               .put(app.api.funcionario.save)
              .get(app.api.funcionario.getById)
               .delete(app.api.funcionario.remove)
    
    app.route('/time')
        .post(app.api.time.save)
        .get(app.api.time.get)
    
    app.route('/time/:idTime')
        .put(app.api.time.save)
        .get(app.api.time.getById)
        .delete(app.api.time.remove)

    app.route('/produto')
       .post(app.api.produto.save)
       .get(app.api.produto.get)

    app.route('/produto/:idProduto')
        .put(app.api.produto.save)
        .get(app.api.produto.getById)
        .delete(app.api.produto.remove)

    app.route('/carrinho')
        .get(app.api.carrinho.get)
        .post(app.api.carrinho.save)
        
    
    app.route('/carrinho/:nr_pedido')
        .get(app.api.carrinho.getById)
    
    app.route('/total/:nr_pedido')
        .get(app.api.carrinho.total)
    
    app.route('/carrinho/:nr_pedido/:nr_produto')
        .delete(app.api.carrinho.remove)

    app.route('/pedido')
        .get(app.api.pedido.get)
        .post(app.api.pedido.save)
    
    app.route('/pedido/:num_pedido')
        .get(app.api.pedido.getById)     
        .post(app.api.pedido.save)    
    
    app.route('/fechapedido/:num_pedido')    
        .post(app.api.pedido.finalizaPedido) 
 
}   