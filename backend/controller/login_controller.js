require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const connection = require("../database.js");

async function Login(req, res) {
    const { username, password } = req.body;
    try {
        if(!username || !password) {
            return res.status(406).json({ message: "Usename and password are required" });
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
                        {
                            id: results[0].id
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: 60 * 60
                        }
                    )
                    return res.status(200).json({ token: token });
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