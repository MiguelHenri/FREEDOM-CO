import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        const storedToken = localStorage.getItem('token');
        setUserName(storedUserName);
        setToken(storedToken);
        setLoading(false);
    }, []);

    const clearAuth = () => {
        setUserName('');
        localStorage.removeItem('userName');
        setToken('');
        localStorage.removeItem('token');
    };

    const saveLogin = (userName, token) => {
        setUserName(userName);
        localStorage.setItem('userName', userName);
        setToken(token);
        localStorage.setItem('token', token);
    };

    if (loading) return null; // Waiting for data

    return (
        <AuthContext.Provider value={{ userName, clearAuth, saveLogin, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;