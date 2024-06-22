import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";

export default function TransferPage() {
    return (
        <>
            <NavBar />
            <TransferForm />
        </>
    )
}

function TransferForm() {
    const [receiverUsername, setReceiverUsername] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError]= useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = "http://localhost:3715/transfer";
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
                throw new Error(errMsg || "Failed to perform transferring");
            }
            navigate("/")
        } catch(err) {
            setError(err.message)
        }
    }
    return (
        <div>
            <form className="transfer-form" onSubmit={handleSubmit}>
                <div className="transfer-field">
                    <label className="transfer-label">Username to transfer your money</label>
                    <input
                        className="transfer-input"
                        type="text"
                        placeholder="Their username"
                        value={receiverUsername}
                        onChange={(e) => setReceiverUsername(e.target.value)}
                        maxLength={20}
                        required
                    />
                </div>
                <div className="transfer-field">
                    <label className="transfer-label">Amount of money to transfer</label>
                    <input
                        className="transfer-input"
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
                <input className="transfer-submit" type="submit" value="Transfer" />
            </form>
        </div>
    )
}