const queries = require('./queries')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = (req, res) =>{
        const tipoproduto = {...req.body} 
        if(req.params.id) tipoproduto.id = req.params.id

        try{
            existsOrError(tipoproduto.name, 'Nome do tipo do produto não informado')
        } catch(msg){
            res.status(400).send(msg)
        }

        if(tipoproduto.id){
            app.db('tipoprodutos')
                .update(tipoproduto)
                .where({id: tipoproduto.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else{
            app.db('tipoprodutos')
                .insert(tipoproduto)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req,res) => {
        try{
            const rowsDeletd = await app.db('tipoprodutos')
            .where({ id: req.params.id}).del()
            existsOrError(rowsDeletd,'tipo produto não foi encontrado')
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }

    }

    const get = (req, res) => {
        app.db('tipoprodutos')
            .orderBy('id')
            .then(tipoprodutos => res.json(tipoprodutos))
            .catch(err => res.status(500).send(err))
    }
    
    const getById = (req, res) => {
        app.db('tipoprodutos')
            .where({ id: req.params.id })
            .first()
            .then(tipoproduto => res.json(tipoproduto))
            .catch(err => res.status(500).send(err))
    }
     return{save,remove,get,getById}
}