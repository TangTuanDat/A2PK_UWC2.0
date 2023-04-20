import React from 'react';
import { createContext } from 'react';
import { useContext, useMemo } from 'react';
import { User } from '../../data/types';
import { Outlet, Navigate } from "react-router-dom";

export type AuthContextType = {
    currentUser: User | null;
    login: (user : User) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider:React.FC<{ children: React.ReactNode }> = ({children}) => {
    
    const GetCurrentUser = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) return JSON.parse(currentUser);
    }

    const [currentUser, setCurrentUser] = React.useState<User | null>(null);
    
    // Advoid currentUser being redefined on every render
    useMemo(() => {
       setCurrentUser(GetCurrentUser());
    }, []);

    const Login = (user : User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
    };
    const Logout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    return <AuthContext.Provider value = { { currentUser: currentUser, login : Login, logout : Logout} }>
      {children}
    </AuthContext.Provider>;
}
  
export function useAuthContext() {
    return useContext(AuthContext);
}

export const ProtectedRoutes = () => {
  const { currentUser } = useAuthContext() as AuthContextType;
  return <>{currentUser ? <Outlet /> : <Navigate to="/login" />}</>;
};
