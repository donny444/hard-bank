import NavBar from "./navbar"

export default function HomePage() {
    return (
        <>
            <NavBar />
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