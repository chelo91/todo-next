import React, { useState, useEffect } from 'react';
import { Button } from "@chakra-ui/react";
import { useToastNotification } from '../hooks/useToastNotification.js';
import { useCookies } from 'next-client-cookies'
const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;

function ButtonLogin() {
    const { addToast } = useToastNotification();
    const urlApi = process.env.NEXT_PUBLIC_URL_API;
    const [authenticated, setAuthenticated] = useState(false);
    const cookies = useCookies();

    useEffect(() => {
        // Comprobar si el usuario está autenticado al cargar la página
        if (cookies.get(cookieName)) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [cookies]);

    const handleLogout = () => {
        // Muestra un toast para indicar que se cerró sesión
        addToast({ title: 'Logout', msg: 'Has cerrado sesión', type: 'info' });
        // Elimina la cookie
        cookies.remove(cookieName);
        // Actualiza el estado de autenticación
        setAuthenticated(false);
        // Redirige al usuario a la página de inicio
        window.location.href = '/';
    };

    const handleLogin = () => {
        // Redirige al usuario a la página de login
        window.location.href = `${urlApi}/auth/github`;
    };

    return (
        <Button onClick={authenticated ? handleLogout : handleLogin}>
            {authenticated ? "Cerrar sesión" : "Iniciar sesión con Github"}
        </Button>
    );
}

export default ButtonLogin;
