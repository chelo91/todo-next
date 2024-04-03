import { useCookies } from "next-client-cookies";
export const useCookie = () => {
    const cookies = useCookies();
    const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;
    
    const getCookie = () => cookies.get(cookieName);
    const removeCookie = () => cookies.remove(cookieName);
    
    return { getCookie, removeCookie };
};