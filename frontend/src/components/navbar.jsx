import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <div className="navbar">
            <Link to="/"><img className="navbar-logo" src="logo.jpg" alt="hardbank logo" /></Link>
            <div>
                <Link to="/login"><button className="navber-login">Login</button></Link>
                <Link to="/register"><button className="navbar-register">Register</button></Link>
            </div>
        </div>
    )
}