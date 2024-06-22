const connection = require("../database.js");

async function Transfer(req, res) {
    const id = req.user.id;
    const { receiverUsername, amount } = req.body;
    try {
        if(!id || !receiverUsername || !amount) {
            return res.status(406).json({ message: "Receiver usernames and amount are required" });
        }

        if(amount <= 0) {
            return res.status(406).json({ message: "Amount have to be positive number"});
        }

        // if(id === receiverUsername) {
        //     return res.status(406).json({ message: "Sender and receiver shouldn't be the same user" });
        // }

        connection.beginTransaction(err => {
            if (err) {
                throw err;
            }
            connection.query(
                "SELECT * FROM users WHERE id = ?",
                [id],
                async (err, results) => {
                    if(err) {
                        connection.rollback(() => {
                            throw err;
                        });
                    }
                    if(results.length === 0) {
                        return res.status(404).json({ message: "Sender not found"});
                    }
                    
                    const senderBalance = results[0].balance;
                    if(amount > senderBalance) {
                        return res.status(409).json({ message: "Insufficient funds" });
                    }
                    connection.query(
                        "SELECT * FROM users WHERE username = ?",
                        [receiverUsername],
                        (err, results) => {
                            if(err) {
                                connection.rollback(() => {
                                    throw err;
                                })
                            }
                            if(results.length === 0) {
                                return res.status(404).json({ message: "Receiver not found"});
                            }
                            const receiverId = results[0].id;
                            connection.query(
                                "UPDATE users SET balance = balance - ? WHERE id = ?",
                                [amount, id],
                                (err, results) => {
                                    if(err) {
                                        connection.rollback(() => {
                                            throw err;
                                        });
                                    }

                                    connection.query(
                                        "UPDATE users SET balance = balance + ? WHERE username =?",
                                        [amount, receiverUsername],
                                        (err, results) => {
                                            if(err) {
                                                connection.rollback(() => {
                                                    throw err;
                                                });
                                            }
                                            connection.query(
                                                "INSERT INTO transactions VALUES (transaction_id, ?, ?, ?, ?)",
                                                [amount, new Date(), id, receiverId],
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
                                                        res.status(201).json({ message: "Transfer successful" });
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

module.exports = Transfer;