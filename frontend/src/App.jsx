import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./components/home";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import TransferPage from "./components/transfer";
import HistoryPage from "./components/history";
import NotFoundPage from "./components/notfound";
import ProtectedRoute from "./components/protectedroute";
import RedirectIfAuthenticated from "./components/redirectifauthenticated";
import { AuthProvider } from "./components/auth";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          } />
          <Route path="/register" element={
            <RedirectIfAuthenticated>
              <RegisterPage />
            </RedirectIfAuthenticated>
          } />
          <Route path="/transfer" element={
            <ProtectedRoute>
              <TransferPage />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
