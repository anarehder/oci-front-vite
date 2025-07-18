import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import apiService from '../services/apiService';

export const UserContext = createContext();

export default function UserProvider({ children}){
    const lsUser = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState(lsUser === null ? {} : lsUser);
    const navigate = useNavigate();
    console.log(user);
    useEffect(() => {
        async function fetchSession() {
            const lsUser = JSON.parse(localStorage.getItem('user'));
            if (lsUser && lsUser.token) {
                try {
                    const body = { userId: lsUser.userId, token: lsUser.token.slice(7)};

                    const session = await apiService.checkSession(body);
                    if (session.status === 200) {
                        setUser(lsUser);
                    } else {
                        localStorage.removeItem('user');
                        setUser({});
                        navigate("/");
                    }
                } catch (error) {
                    localStorage.removeItem('user');
                    setUser({});
                    navigate("/");
                }
            }
        }
    
        fetchSession();
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};