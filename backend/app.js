require("dontnv").config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = require("./database.js");
connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
})

const route = require("./routes/route.js");
const loginRoute = require("./routes/login_route.js");
const registerRoute = require("./routes/register.route.js");
const transactionRoute = require("./routes/transaction_route.js");

app.use("/", route);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/transaction", transactionRoute);

app.use(function (req, res) {
    res.status(404).json({
        message: "No such route exists"
    })
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: "Error Message"
    })
});

module.exports = app;