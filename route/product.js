const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: __dirname + "/../public/image" });
const mime = require("mime");
const DBConnection = require('./DBConnection')

const keyFilename = "./dima-fc345-firebase-adminsdk-a1u59-35ff50d6c5.json"; //replace this with api key file
const projectId = "dima-fc345"; //replace with your project id
const bucketName = `${projectId}.appspot.com`;

const { Storage } = require("@google-cloud/storage");

const gcs = new Storage({
  projectId,
  keyFilename
});

const bucket = gcs.bucket(bucketName);

router.get("/upload", function(req, res) {
  res.render("upload");
});

router.get("/product", function(req, res) {
  res.render("product");
});

router.post("/upload", upload.single("photo"), (req, res) => {
  const filePath = `./public/image/${req.file.filename}`;
  const uploadTo = `image/${req.file.filename}`;
  const fileMime = mime.lookup(filePath);

  bucket.upload(
    filePath,
    {
      destination: uploadTo,
      public: true,
      metadata: { contentType: fileMime, cacheControl: "public, max-age=300" }
    },
    function(err, file) {
      if (err) {
        console.log(err);
        return;
      }
      var insertStr = `INSERT into book(name, price, image, phone, tag) 
                  values(\'${req.body.name}\',
                  \'${req.body.price}\',
                  \'${createPublicFileURL(uploadTo)}\',
                  \'${req.body.phone}\',
                  \'${req.body.tag}')`
        DBConnection.query(insertStr, function(err, results) {
        if (err) {
          res.redirect('/personalPage?fail');
          throw err;
        }  
          console.log("Insert a record!");
      });
      if (req.file) {
        res.redirect('/personalPage?done');
      } else{
        res.redirect('/personalPage?fail');
      } 
    }
  );
});

// edit
router.post("/edit", upload.single("edit_photo"), (req, res) => {
  var editQur = `UPDATE book SET name = \'${req.body.edit_name}\', price = \'${req.body.edit_price}\', phone = \'${req.body.edit_phone}\', tag = \'${req.body.edit_tag}\' WHERE id = \'${req.body.edit_id}\'`;
  DBConnection.query(editQur, function(err, results) {
    if (err) throw err;
    console.log("Edited");
    res.redirect("/personalPage");
  });
});

// delete
router.post("/delete", (req, res) => {
  // DELETE FROM table_name WHERE [condition];
  var deleteQr = `DELETE FROM book WHERE id = \'${req.body.delete_id}\'`;
  DBConnection.query(deleteQr, function(err, results) {
    if (err) throw err;
    console.log("Deleted row");
    res.redirect("/personalPage");
  });
});

// edit image
router.post("/editImage", upload.single("edit_photo"), (req, res) => {
  var editImg = `UPDATE book SET image = \'${req.file.filename}\' WHERE id = \'${req.body.image_id}\'`;
  DBConnection.query(editImg, function(err, results) {
    if (err) throw err;
    console.log("Image Edited");
    res.redirect("/personalPage");
  });
});

//product
var id;
router.get("/product/*", (req, res) => {
  var temp = req.path.split('/')[2];
  if(Number.isNaN(Number(temp))==true){
    
  }
  else{
    id = temp;
  }

  var getProduct = `select * from book where id = ${id}`;
  DBConnection.query(getProduct, function(err, results) {
    if (err) throw err;
    res.render("product", { products: results.rows });
  });
});


//tag
var tag;
router.get("/tag/*", (req, res) => {
  var temp = req.path.split('/')[2];
  var filter;
  if(temp == "books"){
    var filter = `select * from book where tag = 'Sách'`;
  }
  else if(temp == "news"){
    var filter = `select * from book`;
  }
  else if(temp == "belongings"){
    var filter = `select * from book where tag = 'Đồ dùng'`;
  }
  else if(temp == "clothes"){
    var filter = `select * from book where tag = 'Quần áo'`;
  }
  else if(temp == "others"){
    var filter = `select * from book where tag = 'Khác'`;
  }

  DBConnection.query(filter, function(err, results) {
    if (err) throw err;
    res.render("tag", { products: results.rows });
  });
});

//Tìm kiếm
router.get("/find", function(req, res) {
  var getAllBookStr = `SELECT * from book where name like '%${req.query.typeahead}%'`;
  DBConnection.query(getAllBookStr, function(err, results) {
    if (err) throw err;
    res.render("index", { products: results.rows });
  });
});

function createPublicFileURL(storageName) {
  return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(
    storageName
  )}`;
}

module.exports = router;
