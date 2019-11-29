const queries = require('./queries')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation


    const save = (req, res) => {
        const carrinho = { ...req.body }
        if (req.params.nr_pedido) carrinho.nr_pedido = req.params.nr_pedido

        carrinho.sub_total = carrinho.qtd * carrinho.valor_unidade
        app.db('carrinho')
            .insert(carrinho)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))

    }
    
    const get = (req, res) => {
        app.db('carrinho')
            .orderBy('nr_pedido')
            .then(carrinho => res.json(carrinho))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeletd = await app.db('carrinho')
                .where({ nr_pedido: req.params.nr_pedido, nr_produto: req.params.nr_produto }).del()
            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }

    }

    const getById = (req, res) => {
        app.db('carrinho')
            .where({ nr_pedido: req.params.nr_pedido })
            .then(carrinho => res.json(carrinho))
            .catch(err => res.status(500).send(err))
    }

    const total = (req, res) => {
        app.db('carrinho').sum('sub_total as valor_total')
            .where({ nr_pedido: req.params.nr_pedido })
            .then(carrinho => res.json(carrinho))
            .catch(err => res.status(500).send(err))
    }
    return { get, save, remove, getById, total }
}