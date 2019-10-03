const config = require('../knexfile.js')

const kenx = require('knex')(config)
kenx.migrate.latest([config])
module.exports = kenx