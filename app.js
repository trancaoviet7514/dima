const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const router = require('./router')
const productrouter = require('./route/product')
const userrouter = require('./route/user')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router, productrouter, userrouter)

app.listen(process.env.PORT || 3000, function () {
  console.log('Dima server listening on port 3000!')
})