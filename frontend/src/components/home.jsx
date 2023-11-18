import { useState, useEffect } from "react";
import NavBar from "./navbar";
import Footer from "./footer";

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
                headers: {
                    "x-access-token": localStorage.getItem("userToken")
                },
                body: {
                    id: localStorage.getItem("userId")
                }
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(apiUrl, options);
                if(!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const responseData = await response.json();
                setData(responseData);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    })

    return (
        <>
            {loading && <div><p>Loading</p></div>}
            {error && <div><p>Error: {error}</p></div>}
            {data &&
                <div>
                    <div>
                        <img src="src/assets/profile.png" alt="profile picture" />
                        <p>{data.username}</p>
                    </div>
                    <div>
                        <h2>{data.balance}</h2>
                    </div>
                    <div>
                        <button>Transfer</button>
                    </div>
                </div>
            }
        </>
    )
}