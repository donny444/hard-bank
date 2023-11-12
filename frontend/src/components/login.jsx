import NavBar from "./navbar";

export default function LoginPage() {
    return (
        <>
            <NavBar />
            <LoginForm />
        </>
    )
}

function LoginForm() {
    return (
        <div>
            <form className="auth-form">
                <div className="auth-field">
                    <label className="auth-label">Username</label>
                    <input className="auth-input" type="text" placeholder="Your username here" required />
                </div>
                <div className="auth-field">
                    <label className="auth-label">Password</label>
                    <input className="auth-input" type="text" placeholder="Your password here" required />
                </div>
                <input className="auth-submit" type="submit" value="Submit"></input>
            </form>
        </div>
    )
}