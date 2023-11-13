import { useState } from "react";
import NavBar from "./navbar";
import Footer from "./footer";

export default function RegisterPage() {
    return (
        <>
            <NavBar />
            <RegisterForm />
            <Footer />
        </>
    )
}

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <h2 className="auth-header">Register</h2>
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
                <input className="auth-submit" type="submit" value="Register"></input>
            </form>
        </div>
    )
}