import { NextResponse } from 'next/server.js';
import { axiosGet } from '../../../../utils/axios.js';
const cookieName = process.env.COOKIE_NAME;

export async function GET(request, { params }) {
    try {
        const cookieValue = request.cookies.get(cookieName)?.value;
        if (!cookieValue) {
            request.cookies.delete(cookieName);
            return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
        }
        if (!params.lid) {
            return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
        }
        const res = await axiosGet('/api/lists/' + params.lid, `${cookieName}=${cookieValue}`);
        return NextResponse.json(res);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ msg: 'Internal Server Error' }, { status: 500 });
    }
}