const connection = require("../database.js");

async function Transaction(req, res) {
    const { senderId, receiverUsername, amount } = req.body;
    try {
        if(!senderId ||!receiverUsername || !amount) {
            return res.status(400).json({ message: "Sender, receiver usernames and amount are required" });
        }

        if(senderId === receiverUsername) {
            return res.status(400).json({ message: "Sender and receiver shouldn't be the same user" });
        }

        connection.beginTransaction(err => {
            if (err) {
                throw err;
            }
            connection.query(
                "SELECT * FROM Users WHERE id = ?",
                [senderId],
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
                        [receiverUsername],
                        (err, results) => {
                            if(err) {
                                connection.rollback(() => {
                                    throw err;
                                })
                            }
                            if(results.length === 0) {
                                return res.status(400).json({ message: "Receiver not found"});
                            }
                            const receiverId = results[0].id;
                            connection.query(
                                "UPDATE Users SET balance = balance - ? WHERE id = ?",
                                [amount, senderId],
                                (err, results) => {
                                    if(err) {
                                        connection.rollback(() => {
                                            throw err;
                                        });
                                    }

                                    connection.query(
                                        "UPDATE Users SET balance = balance + ? WHERE username =?",
                                        [amount, receiverUsername],
                                        (err, results) => {
                                            if(err) {
                                                connection.rollback(() => {
                                                    throw err;
                                                });
                                            }
                                            connection.query(
                                                "INSERT INTO Transactions VALUES (transaction_id, ?, ?, ?)",
                                                [senderId, receiverId, amount],
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
                }
            )       
        })
    } catch(err) {
        console.error(err);
    }
}

module.exports = Transaction;