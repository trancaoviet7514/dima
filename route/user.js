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

module.exports = router;
