import { NextResponse } from 'next/server'
import { getUserInToken } from './utils/jwtUser'

export async function middleware(request) {
  const cookie = process.env.COOKIE_NAME;
  if (request.cookies.has(cookie)) {
    const token = request.cookies.get(cookie).value;
    const user = getUserInToken(token);
    if (user) {

      //request.cookies.delete(cookie);

      //request.locals.user = user;
    } else {
      //request.locals.user = null;
      request.cookies.delete(cookie);
    }
  }


  /*
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  //let cookie = request.cookies.get('nextjs')
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]

  request.cookies.has('nextjs') // => true
  request.cookies.delete('nextjs')
  request.cookies.has('nextjs') // => false

  // Setting cookies on the response using the `ResponseCookies` API*/
  const response = NextResponse.next()
  /*
    response.cookies.set('vercel', 'fast')
    response.cookies.set({
      name: 'vercel',
      value: 'fast',
      path: '/',
    })
    cookie = response.cookies.get('vercel')*/
  //console.log(request.locals.user) // => { name: 'vercel', value: 'fast', Path: '/' }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

  return response
}

export const config = {
  matcher: '/:path*',
}