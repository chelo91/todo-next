import React from 'react';
import { Button } from "@chakra-ui/react";
import { useCookie } from '../hooks/useCookie.js';
import { useToastNotification } from '../hooks/useToastNotification.js';

function ButtonLogin({ }) {
    const { cookieValue, deleteCookie } = useCookie('cookieTodoJWT');
    const { addToast } = useToastNotification();
    const urlApi = process.env.URL_API;

    const handleLogout = () => {
        // Muestra un toast para indicar que se cerró sesión
        addToast({ title: 'Logout', msg: 'Has cerrado sesión', type: 'info' });
        // Elimina la cookie
        deleteCookie();
    };
    if (cookieValue) {
        return (<>
            <Button onClick={handleLogout}>
                Cerrar sesión
            </Button>
        </>
        );
    } else {
        return (
            <a href={`${urlApi}/auth/github`} >
                <Button colorScheme='blackAlpha'>
                    Iniciar sesión con Github
                </Button>
            </a >
        );
    }
}

export default ButtonLogin;
