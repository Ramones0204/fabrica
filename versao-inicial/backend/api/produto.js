module.exports  = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation


    const save =  async (req,res) =>{
        const produto = {...req.body}
        if(req.params.id) produto.id = req.params.id

        try{
          //  existsOrError(produto.imagem, 'Nome não informado')
            existsOrError(produto.preco, 'Estado não informado')
            existsOrError(produto.desc, 'Pais não informado')
            existsOrError(produto.tipoManga, 'Tipo do Time não informado')
            existsOrError(produto.tipoGola, 'Tipo do Time não informado')
            existsOrError(produto.tamanho, 'Tipo do Time não informado')
            existsOrError(produto.nameProduto, 'Tipo do Time não informado')

        } catch(msg){
            return res.status(400).send(msg)
        }
        if(produto.id){
            app.db('produtos')
                .update(produto)
                .where({idProduto: produto.id})
                .then(id=> res.status(204).send())
                .cath(err => res.status(500).send(err))
        } else{
            app.db('produtos')
                .insert(produto)
                .then(_ => res.status(204).send())
                .cath(err => res.status(500).send(err))
        }
    }
    
    const get = (req, res) => {
      app.db('produtos').innerJoin('marcas','idMarca','marcas.id')
        .then(produtos => res.json(produtos))
        .catch(err => res.status(500).send(err))
    }

    const remove = async (req,res) => {
        try{
            const rowsDeletd = await app.db('produtos')
            .where({ idProduto: req.params.id}).del()
            existsOrError(rowsDeletd,'Produto não foi encontrado')
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }

    }

    const getById = (req, res) => {
        app.db('produtos')
            .where({ idProduto: req.params.id})
            .first()
            .then(times => res.json(times))
            .catch(err => res.status(500).send(err))
    }

   
    return {save,get,getById,remove}
}