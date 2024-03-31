import { useState, useEffect } from 'react';
import { getCookieValue } from '../utils/cookie.js';

export function useCookie(cookieName) {
    const [cookieValue, setCookieValue] = useState(null);

    useEffect(() => {
        // Obtener el valor de la cookie cuando el componente se monta
        const initialValue = getCookieValue(cookieName);
        setCookieValue(initialValue);
    }, [cookieName]);

    const deleteCookie = () => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        setCookieValue(null);
    };

    return { cookieValue, deleteCookie };
}