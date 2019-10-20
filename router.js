const express = require("express");
const router = express.Router();
const DBConnection = require('./route/DBConnection')

DBConnection.connect();

router.get("/", function(req, res) {
  var getAllBookStr = "select * from book";
  DBConnection.query(getAllBookStr, function(err, results) {
    if (err) throw err;
    res.render("index", { products: results.rows });
  });
});

module.exports = router;
