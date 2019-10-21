const queries = require('./queries')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = (req, res) =>{
        const liga = {...req.body} 
        if(req.params.id) liga.id = req.params.id

        try{
            existsOrError(liga.name, 'Nome não informado')
        } catch(msg){
            res.status(400).send(msg)
        }

        if(liga.id){
            app.db('ligas')
                .update(liga)
                .where({id: liga.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else{
            app.db('ligas')
                .insert(liga)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req,res) => {
        try{
            const rowsDeletd = await app.db('ligas')
            .where({ id: req.params.id}).del()
            existsOrError(rowsDeletd,'Liga não foi encontrado')
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }

    }

    const get = (req, res) => {
        app.db('ligas')
          .orderBy('id')
            .then(ligas => res.json(ligas))
            .catch(err => res.status(500).send(err))
    }
    
    const getById = (req, res) => {
        app.db('ligas')
            .where({ id: req.params.id })
            .first()
            .then(liga => res.json(liga))
            .catch(err => res.status(500).send(err))
    }
     return{save,remove,get,getById}
}