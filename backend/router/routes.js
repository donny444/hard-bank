const express = require("express");
const Home = require("../controller/home_controller.js");
const Login = require("../controller/login_controller.js");
const Register = require("../controller/register_controller.js");
const Transfer = require("../controller/transfer_controller.js");
const History = require("../controller/history_controller.js");
const auth = require("../middleware/auth.js");
const route = express.Router();

route.post("/", auth, Home);
route.post("/login", Login);
route.post("/register", Register);
route.post("/transfer", auth, Transfer);
route.post("/history", auth, History);

module.exports = route;