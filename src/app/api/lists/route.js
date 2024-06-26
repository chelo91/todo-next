import { NextResponse } from 'next/server.js';
import { axiosGet, axiosPost } from '../../../utils/axios.js';
const cookieName = process.env.COOKIE_NAME;
export async function GET(request) {
    try {
        const cookieValue = request.cookies.get(cookieName)?.value;
        if (!cookieValue) {
            request.cookies.delete(cookieName);
            return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
        }
        const res = await axiosGet('/api/lists', `${cookieName}=${cookieValue}`);
        return NextResponse.json(res);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ msg: 'Internal Server Error' }, { status: 500 });
    }
}
export async function POST(request) {
    try {
        const cookieValue = request.cookies.get(cookieName)?.value;
        if (!cookieValue) {
            request.cookies.delete(cookieName);
            return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
        }
        const body = await request.json();
        const res = await axiosPost('/api/lists', `${cookieName}=${cookieValue}`, body);
        return NextResponse.json(res);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ msg: 'Internal Server Error' }, { status: 500 });
    }
}

