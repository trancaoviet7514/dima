const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
const router = require('./router');

app.use('/', router)
app.use('/upload', router)
app.use('/search', router)

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})