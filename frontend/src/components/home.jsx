import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
import Footer from "./footer";
import { AuthProvider } from "./auth";

export default function HomePage() {
    return (
        <>
            <NavBar />
            <Home />
            <Footer />
        </>
    )
}

function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = "http://localhost:3715/";
            const options = {
                method: "POST",
                headers: {
                    "x-access-token": localStorage.getItem("userToken")
                },
                body: JSON.stringify({
                    id: localStorage.getItem("userId")
                })
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(apiUrl, options);
                console.log(response);
                if(!response.ok) {
                    throw new Error("Network response was not ok");
                }
                //const responseData = await response.json();
                //console.log(responseData);
                setData(response);
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
            {loading && <div><p>Loading</p></div>}
            {error && <div><p>Error: {error}</p></div>}
            {data &&
                <div className="user-data">
                    <div className="user-profile">
                        <div>
                            <img className="user-image"src="src/assets/profile.png" alt="profile picture" />
                            <p className="user-name">{data.username}</p>
                        </div>
                        <div>
                            <h2 className="user-balance">{data.balance}</h2>
                        </div>
                    </div>
                    <Link to="/transaction"><button className="transfer-button">Transfer</button></Link>
                </div>
            }
        </div>
    )
}