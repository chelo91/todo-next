import { NextResponse } from 'next/server.js';
import { axiosPut, axiosDelete } from '../../../../../../utils/axios.js';
const cookieName = process.env.COOKIE_NAME;

export async function PUT(request, { params }) {
    try {
        const cookieValue = request.cookies.get(cookieName)?.value;
        if (!cookieValue) {
            request.cookies.delete(cookieName);
            return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
        }
        if (!params.lid) {
            return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
        }
        if (!params.iid) {
            return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
        }
        const body = await request.json();
        const res = await axiosPut('/api/lists/' + params.lid + '/items/' + params.iid, `${cookieName}=${cookieValue}`, body);
        return NextResponse.json(res);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ msg: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const cookieValue = request.cookies.get(cookieName)?.value;
        if (!cookieValue) {
            request.cookies.delete(cookieName);
            return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
        }
        if (!params.lid) {
            return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
        }
        if (!params.iid) {
            return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
        }
        const body = await request.json();
        const res = await axiosDelete('/api/lists/' + params.lid + '/items/' + params.iid, `${cookieName}=${cookieValue}`, body);
        return NextResponse.json(res);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ msg: 'Internal Server Error' }, { status: 500 });
    }
}