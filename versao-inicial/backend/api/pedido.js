const queries = require('./queries')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    
    const save = async (req, res) => {
        const pedido = { ...req.body }
        if (req.params.num_pedido) pedido.num_pedido = req.params.num_pedido

        if (pedido.num_pedido) {
            app.db('pedido')
                .update(pedido)
                .where({ num_pedido: pedido.num_pedido })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send('cpf não cadastrado'))
                
        } else {
           // Obtém a data/hora atual
           pedido.data_pedido = new Date();
           // Guarda cada pedaço em uma variável 
           var dia = pedido.data_pedido.getDate();
           var mes = pedido.data_pedido.getMonth();
           var ano = pedido.data_pedido.getFullYear();
           var str_data = dia + '/' + (mes+1) + '/' + ano;
           pedido.data_pedido = str_data;
            app.db('pedido')
                .insert(pedido)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const get = (req, res) => {
        app.db('pedido')
            .orderBy('num_pedido')
            .then(pedido => res.json(pedido))
            .catch(err => res.status(500).send(err))
    }
    
    const getById = (req, res) => {
        app.db('pedido')
            .where({ num_pedido: req.params.num_pedido })
            .then(pedido => res.json(pedido))
            .catch(err => res.status(500).send(err))
    }
    
    const getByCpf = (req, res) => {
        app.db('pedido')
            .where({ cpf_cliente: req.params.cpf_cliente })
            .then(pedido => res.json(pedido))
            .catch(err => res.status(500).send(err))
    }
   
    return{get,getById,save,getByCpf}
}