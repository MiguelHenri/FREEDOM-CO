import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');
    
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        const storedToken = localStorage.getItem('token');
        setUserName(storedUserName);
        setToken(storedToken);
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

    // Including token in requests
    useEffect(() => {
        console.log('intercepting...')

        const setupAxios = axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            err => err
        );

        return () => {
            axios.interceptors.request.eject(setupAxios);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ userName, clearAuth, saveLogin, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;