import { Route, Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ component: Component}) {
    const isAuthenticated = undefined; // Check the user's authentication status here
    const location = useLocation();

    return (
        <Route>
            {isAuthenticated ? (
                <Component />
            ) : (
                <Navigate to="/login" state={{ from: location }} />
            )}
        </Route>
    );
}