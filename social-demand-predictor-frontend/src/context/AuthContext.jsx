import React, { createContext, useContext, useState } from 'react';
import { loginUser } from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('prednex-user');

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const login = async (selectedRole, email, password) => {
        const data = await loginUser(email, password);

        const backendRole = data.role?.toUpperCase();

        if (backendRole !== selectedRole.toUpperCase()) {
            throw new Error(
                `This account is registered as ${backendRole}.`
            );
        }

        const userData = {
            id: data.userId,
            name: data.name,
            email: data.email,
            role: backendRole
        };

        setUser(userData);

        localStorage.setItem(
            'prednex-user',
            JSON.stringify(userData)
        );

        return userData;
    };

    const signup = async (selectedRole = 'USER', email, password) => {
        return login(selectedRole, email, password);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('prednex-user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                isAuthenticated: Boolean(user)
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}