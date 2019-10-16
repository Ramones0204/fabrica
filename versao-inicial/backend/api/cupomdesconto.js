const queries = require('./queries')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = (req, res) =>{
        const cupom = {...req.body} 
        if(req.params.id) cupom.id = req.params.id

        try{
            existsOrError(cupom.name, 'Nome não informado')
			 existsOrError(cupom.valor, 'Valor não informado')
        } catch(msg){
            res.status(400).send(msg)
        }

        if(cupom.id){
            app.db('cumpomdesconto')
                .update(cupom)
                .where({id: cupom.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else{
            app.db('cumpomdesconto')
                .insert(cupom)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req,res) => {
        try{
            const rowsDeletd = await app.db('cumpomdesconto')
            .where({ id: req.params.id}).del()
            existsOrError(rowsDeletd,'Cupom não foi encontrado')
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }

    }

    const get = (req, res) => {
        app.db('cumpomdesconto')
            .then(cupons => res.json(cupons))
            .catch(err => res.status(500).send(err))
    }
    
    const getById = (req, res) => {
        app.db('cumpomdesconto')
            .where({ id: req.params.id })
            .first()
            .then(cupom => res.json(cupom))
            .catch(err => res.status(500).send(err))
    }
     return{save,remove,get,getById}
}