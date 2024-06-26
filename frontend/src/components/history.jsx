import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";

export default function HistoryPage() {
    return (
        <>
            <NavBar />
            <History />
        </>
    )
}

function History() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            const apiUrl = "http://localhost:3715/history";
            const options = {
                method: "POST",
                headers: {
                    "x-access-token": sessionStorage.getItem("userToken"),
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }

            setLoading(true);

            try {
                const response = await fetch(apiUrl, options);
                if(!response.ok) {
                    const errMsg = await response.text();
                    throw new Error(errMsg || "Network response was not ok");
                }
                const responseData = await response.json();
                setResponse(responseData);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {loading && <p>Loading</p>}
            {error && <p>Error: {error}</p>}
            {response &&
                <div className="history">
                    {response.map((transaction, index) => (
                        <Transaction key={index} transaction={transaction} />
                    ))}
                </div>
            }
        </>
    )
}

function Transaction({ transaction }) {
    const date = transaction.date_time.split("T")[0];
    const time = transaction.date_time.split("T")[1].split(":").slice(0, 2).join(":");
    
    return (
        <div className="transaction">
            <p className="transaction-username">{transaction.username}</p>
            <p className="transaction-date">{date}</p>
            <p className="transaction-time">{time}</p>
            <h3 className="transaction-amount">{transaction.amount}</h3>
        </div>
    )
}