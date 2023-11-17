import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./navbar";
import Footer from "./footer";

export default function LoginPage() {
    return (
        <>
            <NavBar />
            <LoginForm />
            <Footer />
        </>
    )
}

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = "http://localhost:3715/login"
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            if(!response.ok) {
                const errMsg= await response.text();
                throw new Error(errMsg || "Failed to login");
            }
            const data = await response.json()
            console.log(data);
            localStorage.setItem("userToken", data.token);
            setResponse(data);
            console.log(response);
            const from = location.state?.from || "/"
            navigate(from)
        } catch(err) {
            setError(err.message)
        }
    }
    return (
        <div>
            <h2 className="auth-header">Login</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-field">
                    <label className="auth-label">Username</label>
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Your username here"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="auth-field">
                    <label className="auth-label">Password</label>
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Your password here"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                {error && <p>{error}</p>}
                {response && <p>{response}</p>}
                <input className="auth-submit" type="submit" value="Login"></input>
            </form>
        </div>
    )
}