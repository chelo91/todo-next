import { axiosGet, axiosPost } from '../../../utils/axios.js';
const cookieName = process.env.COOKIE_NAME;

export async function GET(request) {
    try {
        const cookieValue = request.cookies.get(cookieName)?.value;
        const res = await axiosGet('/api/lists', `${cookieName}=${cookieValue}`);
        return Response.json(res);
    } catch (error) {
        console.error('Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
export async function POST(request) {
    try {
        const cookieValue = request.cookies.get(cookieName)?.value;
        const body = await request.json();
        const res = await axiosPost('/api/lists', `${cookieName}=${cookieValue}`, body);
        return Response.json(res);
    } catch (error) {
        console.error('Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

