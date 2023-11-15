require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.js");

const connection = require("../database.js");

async function Home(req, res) {
    return res.status(200).json({ message: "Welcome" })
}

module.exports = Home;