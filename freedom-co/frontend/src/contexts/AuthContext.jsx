import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState('');

    // Recuperar o nome de usuário do localStorage ao inicializar
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        } else {
            axios.get('/api/users')
                .then(response => {
                    const fetchedUserName = response.data.username;
                    setUserName(fetchedUserName);
                    localStorage.setItem('userName', fetchedUserName);
                })
                .catch(() => setUserName(''));
        }
    }, []);

    const clearAuth = () => {
        setUserName('');
        localStorage.removeItem('userName');
    };

    const saveLogin = (userName) => {
        setUserName(userName);
        localStorage.setItem('userName', userName);
    };

    return (
        <AuthContext.Provider value={{ userName, clearAuth, saveLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;