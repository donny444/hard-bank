import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import TransactionPage from "./components/transaction"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>Hello World</p>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </Router>
  )
}

export default App
