const app = require('express')()
const consign  = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')
require('./config/mongodb')

app.db = db
app.mongoose = mongoose
var fs = require('fs')
var https = require('https')


  
consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)


https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
},app).listen(3000, () => {
    
    console.log('Backend executando... ')
   
})