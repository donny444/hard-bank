import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import TransactionPage from "./components/transaction";
import ProtectedRoute from "./components/protectedroute";
import { AuthProvider } from "./components/auth";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <p>Hello World</p>
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/transaction" element={
            <ProtectedRoute>
              <TransactionPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
