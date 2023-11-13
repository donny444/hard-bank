import NavBar from "./navbar";
import Footer from "./footer";

export default function TransactionPage() {
    return (
        <>
            <NavBar />
            <TransactionForm />
            <Footer />
        </>
    )
}

function TransactionForm() {
    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <form className="transaction-form" onSubmit={handleSubmit}>
                <div className="transaction-field">
                    <label className="transaction-label">Username to transfer your money</label>
                    <input className="transaction-input" type="text" placeholder="Their username" required />
                </div>
                <div className="transaction-field">
                    <label className="transaction-label">Amount of money to transfer</label>
                    <input className="transaction-input" type="number" placeholder="Amount of money" required />
                </div>
                <input className="transaction-submit" type="submit" value="Transfer" />
            </form>
        </div>
    )
}