const admin = require('./admin')

module.exports = app => {

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
      //  .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))

    // Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
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
   
    app.route('/ligas/:id')
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
              .put(app.api.cliente.save)
              .get(app.api.cliente.getById)

    app.route('/funcionario')
              .post(app.api.funcionario.save)
              // .get(app.api.funcionario.get)
              .get(app.api.funcionario.getTeste)
              
    app.route('/funcionario/:id')
               .put(app.api.funcionario.save)
               .get(app.api.funcionario.getById)
    
    app.route('/time')
        .post(app.api.time.save)
        .get(app.api.time.get)
    
    app.route('/time/:id')
        .put(app.api.time.save)
        .get(app.api.time.getById)
        .delete(app.api.time.remove)

    app.route('/produto')
        .post(app.api.produto.save)
        .get(app.api.produto.get)
             
}   