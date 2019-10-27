const express = require("express");
const router = express.Router();
const DBConnection = require('./DBConnection')

router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.get("/personalPage", function(req, res) {
    var getAllBookStr = "select * from book";
    DBConnection.query(getAllBookStr, function(err, results) {
      if (err) throw err;
      res.render("personalPage", { products: results.rows });
    });
});

router.post("/signup", function(req, res) {
    console.log(req.body)
    var str = `select * from users where username = '${req.body.username}'`;
    DBConnection.query(str, function(err, results) {
      if (err) throw err;
      if(results.rowCount != 0) {
          console.log(`username ${req.body.username}already define`)
          res.end()
      } else {
          var string = `insert into users (username, password) values ('${req.body.username}', ${req.body.password})`
          DBConnection.query(string, function(err, results) {
            if (err) throw err;
            res.redirect('/personalPage?signup=success')
          })
        }
    });
});

router.post("/login", function(req, res) {
    var str = `select * from users where username = '${req.body.username}' and password = '${req.body.password}'`;
    DBConnection.query(str, function(err, results) {
      if (err) throw err;
      if(results.rowCount == 0) {
          console.log(`account is not exsits`)
          res.end()
      } else {
        res.redirect('/personalPage?signup=success')
        }
    });
});

module.exports = router;
