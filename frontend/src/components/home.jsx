import { useState, useEffect } from "react";
import NavBar from "./navbar";
import Footer from "./footer";

export default function HomePage() {
    return (
        <>
            <NavBar />
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
                body: {
                    token: localStorage.getItem("userToken")
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

function Profile({ data }) {
    return (
        <div>
            <div>
                <img src="src/assets/profile.png" alt="profile picture" />
                <p>{data.username}</p>
            </div>
            <p>{data.accountId}</p>
        </div>
    )
}

function Balance({ data }) {
    return (
        <div>
            <h2>{data.balance}</h2>
        </div>
    )
}

function Transaction() {
    return (
        <div>
            <button>Transfer</button>
        </div>
    )
}