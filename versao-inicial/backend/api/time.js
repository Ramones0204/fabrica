module.exports  = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation


    const save =  async (req,res) =>{
        const time = {...req.body}
        if(req.params.id) time.id = req.params.id

        try{
            existsOrError(time.nameTime, 'Nome não informado')
            existsOrError(time.regiao, 'Região não informado')
            existsOrError(time.estado, 'Estado não informado')
            existsOrError(time.pais, 'Pais não informado')
            existsOrError(time.tipoTime, 'Tipo do Time não informado')
  
        } catch(msg){
            return res.status(400).send(msg)
        }
        if(time.id){
            app.db('times')
                .update(time)
                .where({id: time.id})
                .then(id=> res.status(204).send())
                .cath(err => res.status(500).send(err))
        } else{
            app.db('times')
                .insert(time)
                .then(_ => res.status(204).send())
                .cath(err => res.status(500).send(err))
        }
    }
    
    const get = (req, res) => {
      app.db('times').innerJoin('ligas','ligas.id','times.ligaId')
        .then(times => res.json(times))
        .catch(err => res.status(500).send(err))
    }

    const remove = async (req,res) => {
        try{
            const rowsDeletd = await app.db('times')
            .where({ idTime: req.params.id}).del()
            existsOrError(rowsDeletd,'Time não foi encontrado')
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }

    }

    const getById = (req, res) => {
        app.db('times')
            .where({ idTime: req.params.id})
            .first()
            .then(times => res.json(times))
            .catch(err => res.status(500).send(err))
    }

   
    return {save,get,getById,remove}
}