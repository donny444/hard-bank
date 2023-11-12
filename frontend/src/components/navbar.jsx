export default function NavBar() {
    return (
        <div className="navbar">
            <img className="navbar-logo" src="logo.jpg" alt="hardbank logo" />
            <div>
                <button className="navber-login">Login</button>
                <button className="navbar-register">Register</button>
            </div>
        </div>
    )
}