const connection = require("../database.js");

async function Transaction(req, res) {
    const { startUsername, endUsername, amount } = req.body;
    try {
        if(!startUsername ||!endUsername || !amount) {
            return res.status(400).json("Sender, receiver usernames and amount are required");
        }

        connection.beginTransaction(err => {
            if (err) {
                throw err;
            }
            connection.query(
                "SELECT * FROM Users WHERE username = ?",
                [startUsername],
                async (err, results) => {
                    if(err) {
                        connection.rollback(() => {
                            throw err;
                        });
                    }
                    if(results.length === 0) {
                        return res.status(400).json({ message: "Sender not found"});
                    }
                    
                    const senderBalance = results[0].balance;
                    if(amount > senderBalance) {
                        return res.status(400).json({ message: "Insufficient funds" });
                    }
                    connection.query(
                        "SELECT * FROM Users WHERE username = ?",
                        [endUsername],
                        (err, results) => {
                            if(err) {
                                connection.rollback(() => {
                                    throw err;
                                })
                            }
                            if(results.length === 0) {
                                return res.status(400).json({ message: "Receiver not found"});
                            }
                            connection.query(
                                "UPDATE Users SET balance = balance - ? WHERE username = ?",
                                [amount, startUsername],
                                (err, results) => {
                                    if(err) {
                                        connection.rollback(() => {
                                            throw err;
                                        });
                                    }

                                    connection.query(
                                        "UPDATE Users SET balance = balance + ? WHERE username =?",
                                        [amount, endUsername],
                                        (err, results) => {
                                            if(err) {
                                                connection.rollback(() => {
                                                    throw err;
                                                });
                                            }

                                            connection.commit(err => {
                                                if(err) {
                                                    connection.rollback(() => {
                                                        throw err;
                                                    });
                                                }
                                                res.status(200).json({ message: "Transaction successful" });
                                            });
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            )       
        })
    } catch(err) {
        console.error(err);
    }
}

module.exports = Transaction;