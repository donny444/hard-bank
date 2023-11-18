require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.js");
const Login = require("./login_controller.js");

const connection = require("../database.js");

async function Home(req, res) {
    const { id } = req.body;
    try {
        connection.query(
            "SELECT * FROM Users WHERE id=?",
            [id],
            async (err, results) => {
                if(err) {
                    return res.status(500).json({ message: "Server Error"});
                }
                return res.status(200).json(results[0]);
            }
        )
    } catch(err) {
        console.error(err);
    }
}

module.exports = Home;