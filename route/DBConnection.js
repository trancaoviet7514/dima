const { Client } = require("pg");
const client = new Client({
  user: "yujeunvafgnwbm",
  host: "ec2-23-21-186-85.compute-1.amazonaws.com",
  database: "d65ufhdinrm8ir",
  password: "540742461b897e1d6e2d342f4cd4e6b055c7abf55db717767ba87aa89968ee2a",
  port: 5432,
  ssl: true
});

module.exports = client