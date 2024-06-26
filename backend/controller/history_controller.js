const connection = require("../database.js");

async function History(req, res) {
    const id = req.user.id;
    try {
        connection.query(
            "SELECT transactions.amount, transactions.date_time, users.username FROM transactions INNER JOIN users ON transactions.receiver_id = users.id WHERE sender_id = ? ORDER BY transactions.date_time DESC LIMIT 30",
            [id],
            async (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Server Error" });
            }
            return res.status(200).json(results);
            }
        );
    } catch (err) {
        console.error(err);
    }
}

module.exports = History;