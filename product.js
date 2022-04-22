const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const mysql = require("mysql");
const { DOUBLE } = require("mysql/lib/protocol/constants/types");
const db = "products";
const {
  DB_PORT,
  DB_HOST,
  DB_CONNECTION_LIMIT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env;

//mysql
const pool = mysql.createPool({
  connectionLimit: DB_CONNECTION_LIMIT,
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});
//GET ALL DATA
router.get("/products", upload.none(), (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
    } else {
      connection.query("SELECT * FROM " + `${db}`, (err, rows) => {
        connection.release();
        if (err) {
          console.error(err);
        } else {
          res.send(rows);
        }
      });
    }
  });
});

router.post("/product/post", upload.none(), async (req, res, next) => {
  const { name, price, photo } = req.body;
  pool.getConnection(async (err, connection) => {
    if (err) {
      res.sendStatus(500).json({ error: err });
    } else {
      const query = `INSERT INTO ${db} (name,price,photo) VALUES ('${name}',${parseFloat(
        price
      )},'${photo}')`;
      console.log(query);
      connection.query(query, (err, rows) => {
        connection.release();
        if (err) {
          console.error(err);
          res.sendStatus(500).json({ error: "An Error occured" });
        } else {
          res.sendStatus(200).json(rows);
        }
      });
    }
  });
});

module.exports = router;
