const queries = require('./queries')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = (req, res) =>{
        const liga = {...req.body} 
        if(req.params.ligaId) liga.ligaId = req.params.ligaId

        try{
            existsOrError(liga.name, 'Nome não informado')
        } catch(msg){
            res.status(400).send(msg)
        }

        if(liga.ligaId){
            app.db('ligas')
                .update(liga)
                .where({ligaId: liga.ligaId})
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
           // const times = await app.db('times')
          //  .where({ligaId: req.params.ligaId})
           //  notExistsOrError(times,'Liga possui time vinculados.')

            const rowsDeletd = await app.db('ligas')
            .where({ ligaId: req.params.ligaId}).del()
            existsOrError(rowsDeletd,'Liga não foi encontrado')
            
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }

    }

    const get = (req, res) => {
        app.db('ligas')
          .orderBy('ligaId')
            .then(ligas => res.json(ligas))
            .catch(err => res.status(500).send(err))
    }
    
    const getById = (req, res) => {
        app.db('ligas')
            .where({ ligaId: req.params.ligaId })
            .first()
            .then(liga => res.json(liga))
            .catch(err => res.status(500).send(err))
    }
     return{save,remove,get,getById}
}