require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "hardbank"
})

module.exports = connection;