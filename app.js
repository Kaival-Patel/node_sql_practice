const express = require("express");
const multer = require("multer");
const upload = multer();
const app = express();
require("dotenv/config");
const mysql = require("mysql");
const productRouter =require("./product");
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

//product
app.use("/apiv1",productRouter);


//LISTEN
app.listen(DB_PORT, () => {
  console.log("Server Up and Running");
});

module.exports = pool;
