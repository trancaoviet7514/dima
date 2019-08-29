const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: __dirname + "/public/image" });

const { Client } = require("pg");
const client = new Client({
  user: 'yujeunvafgnwbm',
  host: 'ec2-23-21-186-85.compute-1.amazonaws.com',
  database: 'd65ufhdinrm8ir',
  password: '540742461b897e1d6e2d342f4cd4e6b055c7abf55db717767ba87aa89968ee2a',
  port: 5432,
  ssl: true
})
client.connect()
router.get('/', function (req, res) {    
  var getAllBookStr = 'select * from book'
  client.query(getAllBookStr, function(err, results) {
    if (err) throw err;
    res.render("personalPage", { products: results.rows });
  });
});

router.get("/upload", function(req, res) {
  res.render("upload");

  router.get("/login", function(req, res) {
    res.render("login");
  });

  router.get("/signup", function(req, res) {
    res.render("signup");
  });
});

router.get("/login", function(req, res) {
  res.render("login");
});
router.get("/signup", function(req, res) {
  res.render("signup");
});
router.get("/personalPage", function(req, res) {
  res.render("personalPage");
});
router.get("/example", function(req, res) {
  res.render("example");
});

router.post("/upload", upload.single("photo"), (req, res) => {
  var insertStr = `INSERT into book(name, price, image, phone) 
                  values(\'${req.body.name}\',
                  N\'${req.body.price}\',
                  \'${req.file.filename}\',
                  \'${req.body.phone}\')`;
  client.query(insertStr, function(err, results) {
    if (err) throw err;
    console.log("Insert a record!");
  });
  if (req.file) {
    res.redirect("/");
  } else throw "error";
});

// edit
router.post("/edit", upload.single("edit_photo"), (req, res) => {
  var editQur = `UPDATE book SET name = \'${req.body.edit_name}\', price = \'${req.body.edit_price}\', phone = \'${req.body.edit_phone}\', image = \'${req.file.filename}\' WHERE id = \'${req.body.edit_id}\'`;
  client.query(editQur, function(err, results) {
    if (err) throw err;
    console.log("Edited");
    res.redirect("/personalPage");
  });
});

// delete
router.post("/delete", (req, res) => {
  // DELETE FROM table_name WHERE [condition];
    var deleteQr = `DELETE FROM book WHERE id = \'${req.body.delete_id}\'`;
    client.query(deleteQr, function(err, results) {
      if (err) throw err;
      console.log("Deleted row");
      res.redirect("/personalPage");
    });
});

// đang sửa

//Tìm kiếm
router.get("/find", function(req, res) {
  var getAllBookStr =
    'SELECT * from book where name like "%' + req.query.typeahead + '%"';
  client.query(getAllBookStr, function(err, results) {
    if (err) throw err;
    res.render("index", { products: results });
  });
});

module.exports = router;
