require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.js");
const Login = require("./login_controller.js");

const connection = require("../database.js");

async function Home(req, res) {
    const { token } = req.body;
    if(token === Login.token) 
        return res.status(200).json(Login)
}

module.exports = Home;