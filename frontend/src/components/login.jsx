import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authenticate(username, password); // Assuming you have the authenticate function
            const from = location.state?.from || "/"
            navigate(from)
        } catch(err) {
            setError("Invalid username or password")
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
                <input className="auth-submit" type="submit" value="Login"></input>
            </form>
        </div>
    )
}