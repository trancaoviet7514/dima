const express = require('express');
// const app = express();
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: __dirname + '/public/image'});
var mysql = require('mysql');
var sharp = require('sharp')

var conn = mysql.createConnection({
    database: 'test',
    host: "localhost",
    user: "root",
    password: "ty0918936373"
  });
   
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

router.get('/', function (req, res) {
    var getAllBookStr = 'select * from book'
    conn.query(getAllBookStr, function(err, results) {
        if (err) throw err;
        res.render('index', {products: results})
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