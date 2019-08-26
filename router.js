const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: __dirname + '/public/image'});
const mime = require('mime')

const {Client} = require('pg')
const client = new Client({
  user: 'yujeunvafgnwbm',
  host: 'ec2-23-21-186-85.compute-1.amazonaws.com',
  database: 'd65ufhdinrm8ir',
  password: '540742461b897e1d6e2d342f4cd4e6b055c7abf55db717767ba87aa89968ee2a',
  port: 5432,
  ssl: true
})

const keyFilename="./dima-fc345-firebase-adminsdk-a1u59-35ff50d6c5.json"; //replace this with api key file
const projectId = "dima-fc345" //replace with your project id
const bucketName = `${projectId}.appspot.com`;

const {Storage} = require('@google-cloud/storage')

const gcs = new Storage({
    projectId,
    keyFilename
});

const bucket = gcs.bucket(bucketName);

client.connect()
router.get('/', function (req, res) {    
  var getAllBookStr = 'select * from book'
  client.query(getAllBookStr, function(err, results) {
      if (err) throw err;
      res.render('index', {products: results.rows})
  });
})

router.get('/upload', function (req, res) {
    res.render('upload')

router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

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
  
  const filePath = `./public/image/${req.file.filename}`;
  const uploadTo = `image/${req.file.filename}`;
  const fileMime = mime.lookup(filePath);

  bucket.upload(filePath,{
      destination:uploadTo,
      public:true,
      metadata: {contentType: fileMime,cacheControl: "public, max-age=300"}
  }, function(err, file) {
      if(err)
      {
          console.log(err);
          return;
      }
      console.log(createPublicFileURL(uploadTo));
      var insertStr = `INSERT into book(name, price, image, phone) 
                  values(\'${req.body.name}\',
                  N\'${req.body.price}\',
                  \'${createPublicFileURL(uploadTo)}\',
                  \'${req.body.phone}\')`
      client.query(insertStr, function(err, results) {
          if (err) throw err;
          console.log("Insert a record!");
      });
      if(req.file) {        
          res.redirect('/')
      }
      else throw 'error';
      });
});

//Tìm kiếm
router.get("/find", function(req, res) {
    var getAllBookStr = `SELECT * from book where name like '%${req.query.typeahead}%'`;
    client.query(getAllBookStr, function(err, results) {
      if (err) throw err;
      res.render("index", { products: results.rows });
    });
  });

  function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;

}
  
module.exports = router;
