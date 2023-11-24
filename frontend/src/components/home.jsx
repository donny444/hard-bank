import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";

export default function HomePage() {
    return (
        <>
            <NavBar />
            <Home />
        </>
    )
}

function Home() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = "http://localhost:3715/";
            const options = {
                method: "POST",
                headers: {
                    "x-access-token": localStorage.getItem("userToken"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: localStorage.getItem("userId")
                })
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
        <div>
            {loading && <p>Loading</p>}
            {error && <p>Error: {error}</p>}
            {response &&
                <div className="user-data">
                    <div className="user-profile">
                        <div>
                            <img className="user-image"src="src/assets/profile.png" alt="profile picture" />
                            <h2 className="user-name">{response.username}</h2>
                        </div>
                        <div>
                            <h2 className="user-balance">Balance: {response.balance}</h2>
                        </div>
                    </div>
                    <Link to="/transaction"><button className="transfer-button">Transfer</button></Link>
                </div>
            }
        </div>
    )
}