const queries = require('./queries')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = (req, res) =>{
        const marca = {...req.body} 
        if(req.params.id) marca.id = req.params.id

        try{
            existsOrError(marca.name, 'Nome não informado')
        } catch(msg){
            res.status(400).send(msg)
        }

        if(marca.id){
            app.db('marcas')
                .update(marca)
                .where({id: marca.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else{
            app.db('marcas')
                .insert(marca)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req,res) => {
        try{
            const rowsDeletd = await app.db('marcas')
            .where({ id: req.params.id}).del()
            existsOrError(rowsDeletd,'Marca não foi encontrado teste')
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }

    }

    const get = (req, res) => {
        app.db('marcas')
            .orderBy('id')
            .then(marcas => res.json(marcas))
            .catch(err => res.status(500).send(err))
    }
    
    const getById = (req, res) => {
        app.db('marcas')
            .where({ id: req.params.id })
            .first()
            .then(marca => res.json(marca))
            .catch(err => res.status(500).send(err))
    }
     return{save,remove,get,getById}
}