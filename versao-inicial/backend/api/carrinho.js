const queries = require('./queries')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
   
    
  
    const get = (req, res) => {
        app.db('carrinho')
            .orderBy('id_pedido')
            .then(carrinho => res.json(carrinho))
            .catch(err => res.status(500).send(err))
    }
    
  
   

    return{get}
}