import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const response = NextResponse.next();
  const cookieName = process.env.COOKIE_NAME;
  const cookieValue = request.nextUrl.searchParams.get(cookieName);
  if (cookieValue) {
    // Guardar el valor de cookieName como una cookie
    response.cookies.set(cookieName, cookieValue);
    // Eliminar cookieName de la URL
    request.nextUrl.searchParams.delete(cookieName);
    //url.searchParams.delete(cookieName);
    //res.nextUrl.href = url.href;
    return response;
  }
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}
