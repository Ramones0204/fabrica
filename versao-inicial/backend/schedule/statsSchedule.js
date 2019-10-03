const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()
        const cargosCount = await app.db('cargos').count('id').first()
        const marcasCount = await app.db('cargos').count('id').first()
        const ligasCount = await app.db('ligas').count('id').first()
        const tipoprodutosCount = await app.db('tipoprodutos').count('id').first()
        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt' : -1 } })

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            cargos: cargosCount.count,
            marcas: marcasCount,
            ligas: ligasCount,
            tipoprodutos: tipoprodutosCount,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles
        const ChangeCargos = !lastStat || stat.cargos !== lastStat.cargos
        const ChangeMarcas = !lastStat || stat.marcas !== lastStat.marcas
        const ChangeLigas = !lastStat || stat.ligas !== lastStat.ligas
        const ChangeTipoProdutos = !lastStat || stat.tipoprodutos !== lastStat.tipoprodutos

        if(changeUsers || changeCategories || changeArticles || ChangeCargos || ChangeMarcas || ChangeLigas || ChangeTipoProdutos) {
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}