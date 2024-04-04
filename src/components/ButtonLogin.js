import React from 'react';
import { Button } from "@chakra-ui/react";
import { useToastNotification } from '../hooks/useToastNotification.js';
//import { useCookie } from '../hooks/useCookie.js';
import { useCookies } from 'next-client-cookies'
const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;

function ButtonLogin() {
    const { addToast } = useToastNotification();
    const urlApi = process.env.NEXT_PUBLIC_URL_API;
    //const { getCookie, removeCookie } = useCookie();
    const cookies = useCookies();

    const handleLogout = () => {
        // Muestra un toast para indicar que se cerró sesión
        addToast({ title: 'Logout', msg: 'Has cerrado sesión', type: 'info' });
        // Elimina la cookie
        cookies.remove(cookieName);
        window.location.reload(false);

    };
    const handleLogin = () => {
        // Redirige al usuario a la página de login
        window.location.href = `${urlApi}/auth/github`;
    }

    if (cookies.get(cookieName)) {
        return (<>
            <Button onClick={handleLogout}>
                Cerrar sesión
            </Button>
        </>
        );
    } else {
        return (
            <Button colorScheme='blackAlpha' onClick={handleLogin}>
                Iniciar sesión con Github
            </Button>
        );
    }
}

export default ButtonLogin;
