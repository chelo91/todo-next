// Función para obtener el valor de la cookie
export const getCookieValue = (cookieName) => {
    const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith(cookieName));

    if (cookie) {
        const [, value] = cookie.split('=');
        return value;
    }
    return null;
};
