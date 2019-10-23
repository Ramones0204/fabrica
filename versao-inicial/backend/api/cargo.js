const queries = require('./queries')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = (req, res) =>{
        const cargo = {...req.body} 
        if(req.params.id) cargo.id = req.params.id

        try{
            existsOrError(cargo.name, 'Nome não informado')
            existsOrError(cargo.salary, 'Valor não informado')
          

        } catch(msg){
            res.status(400).send(msg)
        }

        if(cargo.id){
            app.db('cargos')
                .update(cargo)
                .where({id: cargo.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else{
            app.db('cargos')
                .insert(cargo)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req,res) => {
        try{
            const funcionarios = await app.db('funcionarios')
                .where({cargoId:req.params.id})
            notExistsOrError(funcionarios,'Cargo possui funcionarios vinculados.')

            const rowsDeletd = await app.db('cargos')
            .where({ id: req.params.id}).del()
            existsOrError(rowsDeletd,'Cargo não foi encontrado')

           

            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }

    }

    //const limit = 10 // usando para paginação   
    const get = (req, res) => {
        app.db('cargos')
            .orderBy('id')
            .then(cargos => res.json(cargos))
            .catch(err => res.status(500).send(err))
    }
    
    const getById = (req, res) => {
        app.db('cargos')
            .where({ id: req.params.id })
            .first()
            .then(cargo => res.json(cargo))
            .catch(err => res.status(500).send(err))
    }


   

    return{save,remove,get,getById}
}