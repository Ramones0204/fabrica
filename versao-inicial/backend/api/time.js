const queries = require('./queries')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = (req, res) =>{
        const time = {...req.body} 
        if(req.params.idTime) time.idTime = req.params.idTime

        try{
            existsOrError(time.nameTime, 'Nome não informado')
            existsOrError(time.regiao, 'Região não informado')
            existsOrError(time.estado, 'Estado não informado')
            existsOrError(time.pais, 'Pais não informado')
            existsOrError(time.tipoTime, 'Tipo do Time não informado')
  
        } catch(msg){
            res.status(400).send(msg)
        }

        if(time.idTime){
            app.db('times')
                .update(time)
                .where({idTime: time.idTime})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else{
            app.db('times')
                .insert(time)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req,res) => {
        try{
            const rowsDeletd = await app.db('times')
            .where({ idTime: req.params.idTime}).del()
            existsOrError(rowsDeletd,'Time não foi encontrados')
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }

    }

    const get = (req, res) => {
        app.db('times')
            .orderBy('idTime')
            .then(times => res.json(times))
            .catch(err => res.status(500).send(err))
    }
    
    const getById = (req, res) => {
        app.db('times')
            .where({ idTime: req.params.idTime })
            .first()
            .then(time => res.json(time))
            .catch(err => res.status(500).send(err))
    }
     return{save,remove,get,getById}
}