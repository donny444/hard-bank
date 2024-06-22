require("dotenv").config();
const bcrypt = require("bcryptjs");

const connection = require("../database.js");

async function Register(req, res) {
    const { username, password } = req.body;
    try {
        if(!username || !password) {
            return res.status(406).json({ message: "Usename and password are required" });
        }
        if(username.length > 20) {
            return res.status(406).json({ message: "Username can't be more than 20 characters" })
        }
        if(password.length > 16) {
            return res.status(406).json({ message: "Password can't be more than 16 characters" })
        }
        connection.query(
            "SELECT * FROM users WHERE username =?",
            [username],
            async (err, results) => {
                if(err) {
                    return res.status(500).json({ message: "Server Error" });
                }
                if (results.length > 0) {
                    return res.status(409).json({ message: "Username already exists"});
                }
                else {
                    const hashedPassword = await bcrypt.hash(password, 10);

                    connection.query(
                        "INSERT INTO users (username, password, balance) VALUES (?, ?, 0)",
                        [username, hashedPassword],
                        (err, results) => {
                            if(err) {
                                return res.status(500).json({ message: "Server Error"});
                            }
                            return res.status(201).json({ message: "User registered successfully"});
                        }
                    )
                }
            }
        )
    } catch(err) {
        console.error(err);
    }
}

module.exports = Register;