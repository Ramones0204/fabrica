const queries = require('./queries')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
   
    
  
    const get = (req, res) => {
        app.db('pedido')
            .orderBy('num_pedido')
            .then(pedido => res.json(pedido))
            .catch(err => res.status(500).send(err))
    }
    
  
   

    return{get}
}