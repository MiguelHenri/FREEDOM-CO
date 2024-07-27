import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

function NotLogged({ children }) {
    const { token, clearAuth } = useAuth();
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        if (!token) {
            setIsValid(false);
            return;
        }

        // Testing token
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
    }, [token, clearAuth])

    if (isValid === null && token) return null; // Loading...

    // If token is not valid, we render children, user is not logged
    if (!isValid) return children;

    // Else, user is logged, so, we redirect to profile page
    return <Navigate to='/profile' replace />
}

export default NotLogged;