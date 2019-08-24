const express = require('express');
// const app = express();
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: __dirname + '/public/image'});
var mysql = require('mysql');
var sharp = require('sharp')

// var conn = mysql.createConnection({
//     database: 'test',
//     host: "localhost",
//     user: "root",
//     password: "ty0918936373"
//   });
   
//   conn.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

  const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'mall',
  password: '221447514aA#',
  port: 5432,
})
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'mall',
  password: '221447514aA#',
  port: 5432,
})
client.connect()
client.query('SELECT * from book', (err, res) => {
  console.log(err, res)
})

router.get('/', function (req, res) {
    var getAllBookStr = 'select * from book'
    client.query(getAllBookStr, function(err, results) {
        if (err) throw err;
        res.render('index', {products: results.rows})
    });
})

router.get('/upload', function (req, res) {
    res.render('upload')
})

router.get('/login', function(req, res){
    res.render('login')
})

router.get('/signup', function(req, res){
    res.render('signup')
})

router.get('/personalPage', function(req, res){
    res.render('personalPage');
})

router.post('/upload', upload.single('photo'), (req, res) => {
    var insertStr = `INSERT into book(name, price, image, phone) 
                    values(\'${req.body.name}\',
                    N\'${req.body.price}\',
                    \'${req.file.filename}\',
                    \'${req.body.phone}\')`
    conn.query(insertStr, function(err, results) {
        if (err) throw err;
        console.log("Insert a record!");
    });
    if(req.file) {        
        res.redirect('/')
    }
    else throw 'error';
});

module.exports = router;