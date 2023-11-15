require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.js");

const connection = require("../database.js");

async function Login(req, res) {
    const { username, password } = req.body;
    try {
        if(!username || !password) {
            return res.status(400).json({ message: "Usename and password are required" });
        }
        connection.query(
            "SELECT * FROM users WHERE username =?",
            [username],
            async (err, results) => {
                if(err) {
                    return res.status(500).json({ message: "Server Error" });
                }
                if (results.length > 0 && (await bcrypt.compare(password, results[0].password))) {
                    const token = jwt.sign(
                        { username: results[0].username },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: 60 * 60
                        }
                    )
                    results[0].token = token;
                    return res.status(200).json(results[0]);
                }
                else {
                    return res.status(401).json({ message: "Invalid Credentials" });
                }
            }
        )
    } catch(err) {
        console.error(err);
    }
}

module.exports = Login;