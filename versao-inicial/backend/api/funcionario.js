const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const funcionario = { ...req.body }
        if (req.params.matricula) funcionario.matricula = req.params.matricula

        try {
            existsOrError(funcionario.cpf, 'CPF não informado')
          //  existsOrError(funcionario.name, 'Nome não informado')
            existsOrError(funcionario.dataNascimento, 'Data de nascimento não informado')
            existsOrError(funcionario.sexo, 'sexo não informado')
            existsOrError(funcionario.email, 'Email não informado')
            existsOrError(funcionario.telefone, 'telefone não informado')
            existsOrError(funcionario.celular, 'celular não informado')
            existsOrError(funcionario.senha, 'senha não informado')
            equalsOrError(funcionario.senha, funcionario.confirmarSenha, 'Senhas não conferem')

            //     const userFromDB = await app.db('clientes')
            // .where({email:user.email}).first()
            //  if(!user.id){
            ///      notExistsOrError(userFromDB,'Usuário já cadastrado')
            // }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        funcionario.senha = encryptPassword(funcionario.senha)

        delete funcionario.confirmarSenha

        if (funcionario.id) {
            app.db('funcionario')
                .update(funcionario)
                .where({ matricula: funcionario.matricula })
                .then(matricula => res.status(204).send())
                .cath(err => res.status(500).send(err))
        } else {
            app.db('funcionarios')
                .insert(funcionario)
                .then(_ => res.status(204).send())
                .cath(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('funcionarios')
        //.innerJoin('cargos','cargos.id','funcionarios.cargoId')
            .then(funcionarios => res.json(funcionarios))
            .catch(err => res.status(500).send(err))
    }

   // const getById = (req, res) => {
///   app.db('funcionarios')
      ///      .where({ matricula: req.params.matricula })
          //  .first()
       ///     .then(funcionarios => res.json(funcionarios))
        ///   .catch(err => res.status(500).send(err))
    //}
    
    const getById = (req, res) => {
        app.db('funcionarios')
            .where({ matricula: req.params.matricula})
            .first()
            .then(funcionarios => res.json(funcionarios))
            .catch(err => res.status(500).send(err))
    }

  //  const getTeste = (req, res) => {
       // let cargos = [];
       // app.db('funcionarios').innerJoin('cargos','cargos.id','funcionarios.cargoId')
       // .then(funcionarios => {
     //    var cargo = { 'id': funcionarios.id, 'name': funcionarios.name, "salary":funcionarios.salary};
      //   cargos.push(cargo)  
      //   funcionarios.cargo = cargos;
        //   res.json(funcionarios)
      // })
      //  .catch(err => res.status(500).send(err))
    //}
    const remove = async (req,res) => {
        try{
            const rowsDeletd = await app.db('funcionarios')
            .where({ matricula: req.params.matricula}).del()
            existsOrError(rowsDeletd,'Fun não foi encontrado')
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }

    }
    return { save, get, getById,remove }
}