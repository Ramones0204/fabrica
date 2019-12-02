const bcrypt = require('bcrypt-nodejs')

module.exports  = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    const save =  async (req,res) =>{
        const cliente = {...req.body}
        if(req.params.id) cliente.id = req.params.id

        try{
            existsOrError(cliente.cpf, 'CPF não informado')
            existsOrError(cliente.name, 'Nome não informado')
            existsOrError(cliente.dataNascimento, 'Data de nascimento não informado')
            existsOrError(cliente.sexo, 'sexo não informado')
            existsOrError(cliente.email, 'Email não informado')
            existsOrError(cliente.telefone, 'telefone não informado')
            existsOrError(cliente.celular, 'celular não informado')
            existsOrError(cliente.senha, 'senha não informado')
            equalsOrError(cliente.senha,cliente.confirmarSenha,'Senhas não conferem')
            
       //     const userFromDB = await app.db('clientes')
               // .where({email:user.email}).first()
              //  if(!user.id){
              ///      notExistsOrError(userFromDB,'Usuário já cadastrado')
               // }
        } catch(msg){
            return res.status(400).send(msg)
        }

        cliente.senha = encryptPassword(cliente.senha)

        delete cliente.confirmarSenha

        if(cliente.id){
            app.db('clientes')
                .update(cliente)
                .where({id: cliente.id})
                .then(_=> res.status(204).send())
                .cath(err => res.status(500).send(err))
        } else{
            app.db('clientes')
                .insert(cliente)
                .then(_ => res.status(204).send())
                .cath(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('clientes')
           .orderBy('id')
           // .select('id', 'name', 'email','sexo')
            //.whereNull('deletedAt')
            .then(cliente => res.json(cliente))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('clientes')
            .where({ id: req.params.id })
            .first()
            .then(cliente => res.json(cliente))
            .catch(err => res.status(500).send(err))
    }
    return {save,get,getById}
}