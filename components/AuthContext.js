// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    async function login(username, password) {
        try {
            // Realiza una solicitud al backend para iniciar sesión
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Inicio de sesión exitoso, establece el usuario en el estado
                setUser(data.user);
            } else {
                // Error en el inicio de sesión, muestra el mensaje de error
                alert(data.message);
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
        }
    }

    function logout() {
        // Implementa la lógica de cierre de sesión aquí.
        // Esto podría implicar eliminar el usuario del estado, limpiar las cookies, etc.
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}