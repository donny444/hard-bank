require("dotenv").config();

const connection = require("../database.js");

async function Home(req, res) {
    const id = req.user.id;
    
    try {
        connection.query(
            "SELECT username, balance FROM Users WHERE id=?",
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