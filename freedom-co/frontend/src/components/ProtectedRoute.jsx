import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

function ProtectedRoute({ children }) {
    const { token } = useAuth();

    // todo - check token validity
    if (token) return children;

    return <Navigate to='/login' replace />
}

export default ProtectedRoute;