import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";

export default function TransactionPage() {
    return (
        <>
            <NavBar />
            <TransactionForm />
        </>
    )
}

function TransactionForm() {
    const [receiverUsername, setReceiverUsername] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError]= useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = "http://localhost:3715/transaction";
        const options = {
            method: "POST",
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                senderId: localStorage.getItem("userId"),
                receiverUsername: receiverUsername,
                amount: amount
            })
        }
        try {
            const response = await fetch(apiUrl, options)
            if(!response.ok) {
                const errMsg= await response.text();
                throw new Error(errMsg || "Failed to perform transaction");
            }
            navigate("/")
        } catch(err) {
            setError(err.message)
        }
    }
    return (
        <div>
            <form className="transaction-form" onSubmit={handleSubmit}>
                <div className="transaction-field">
                    <label className="transaction-label">Username to transfer your money</label>
                    <input
                        className="transaction-input"
                        type="text"
                        placeholder="Their username"
                        value={receiverUsername}
                        onChange={(e) => setReceiverUsername(e.target.value)}
                        maxLength={20}
                        required
                    />
                </div>
                <div className="transaction-field">
                    <label className="transaction-label">Amount of money to transfer</label>
                    <input
                        className="transaction-input"
                        type="number"
                        placeholder="Amount of money"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={0}
                        step={0.01}
                        required
                    />
                </div>
                {error && <p>Error: {error}</p>}
                <input className="transaction-submit" type="submit" value="Transfer" />
            </form>
        </div>
    )
}