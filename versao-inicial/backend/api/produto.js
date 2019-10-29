module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation


    const save = async (req, res) => {
        const produto = { ...req.body }
        if (req.params.idProduto) produto.idProduto = req.params.idProduto

        try {
            existsOrError(produto.preco, 'Preço não informado')
            existsOrError(produto.desc, 'Descrição não informado')
            existsOrError(produto.tipoManga, 'Tipo do Time não informado')
            existsOrError(produto.tipoGola, 'Tipo do Time não informado')
            existsOrError(produto.tamanho, 'Tipo do Time não informado')
            existsOrError(produto.nameProduto, 'Nome do Produto')

        } catch (msg) {
            return res.status(400).send(msg)
        }
        if (produto.idProduto) {
            app.db('produtos')
                .update(produto)
                .where({ idProduto: produto.idProduto })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('produtos')
                .insert(produto)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('produtos')
            .then(produtos => res.json(produtos))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeletd = await app.db('produtos')
                .where({ idProduto: req.params.idProduto }).del()
            existsOrError(rowsDeletd, 'Produto não foi encontrado')
            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }

    }
    const getById = (req, res) => {
        app.db('produtos')
            .where({ idProduto: req.params.idProduto })
            .first()
            .then(produto => res.json(produto))
            .catch(err => res.status(500).send(err))
    }
    return { save, get, getById, remove }
}