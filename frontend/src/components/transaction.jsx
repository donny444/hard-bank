import NavBar from "./navbar"

export default function TransactionPage() {
    return (
        <>
            <NavBar />
            <TransactionForm />
        </>
    )
}

function TransactionForm() {
    return (
        <div>
            <form>
                <label>Username to transfer your money</label>
                <input type="text" placeholder="Their username" required />
                <label>Amount of money to transfer</label>
                <input type="number" placeholder="Amount of money" required />
                <input type="submit" value="Transfer" />
            </form>
        </div>
    )
}