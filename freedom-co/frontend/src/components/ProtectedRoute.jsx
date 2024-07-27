import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

function ProtectedRoute({ children }) {
    const { token, clearAuth } = useAuth();
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        axios.get('/api/users/auth', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                if (res.status === 204) {
                    setIsValid(true);
                } else {
                    setIsValid(false);
                }
            })
            .catch(err => {
                console.error('Error checking token validity.', err);
                setIsValid(false);
                clearAuth();
            })
    }, [token, clearAuth]);

    if (isValid === null && token) return null; // Loading...

    if (isValid) return children; // Valid!

    return <Navigate to='/login' replace /> // Not valid :(
}

export default ProtectedRoute;