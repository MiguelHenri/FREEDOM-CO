import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

function NotLogged({ children }) {
    const { token } = useAuth();

    // todo - check token validity
    // If token is null, we render children, user is not logged
    if (!token) return children;

    // Else, user is logged, so, we redirect to profile page
    return <Navigate to='/profile' replace />
}

export default NotLogged;