import React from 'react';
import { createContext, useState } from 'react';
import { useContext } from 'react';
import { User } from '../../data/types';
import { Outlet, Navigate } from "react-router-dom";

export type AuthContextType = {
    currentUser: User | null;
    login: (user: User) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider:React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [currentUser, setUser] = useState<User | null>(null);
    const Login = async (user: User) => {
      setUser(user);
    };
    const Logout = () => {
      setUser(null);
    };
    return <AuthContext.Provider value = { {currentUser : currentUser, login : Login, logout : Logout} }>
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
