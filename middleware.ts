
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const AUTH_COOKIE = 'auth-token';

function getJwtSecretKey() {
  return new TextEncoder().encode('122ewfpeo2we12'); 
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE)?.value;

  if (!token) {
    const login = new URL('/auth/login', req.url);
    login.searchParams.set('redirect', pathname + search);
    return NextResponse.redirect(login);
  }

  const segments = pathname.split('/').filter(Boolean); 
  const idParam = segments[1] ? Number(segments[1]) : null;


  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    const tokenId = typeof payload.id === 'number' ? payload.id : null;
    const tokenRole = typeof payload.role === 'string' ? payload.role.toLowerCase() : '';

    if (!idParam || idParam !== tokenId) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    if (tokenRole !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    return NextResponse.next();
  } catch {
    const login = new URL('/auth/login', req.url);
    login.searchParams.set('redirect', pathname + search);
    return NextResponse.redirect(login);
  }
}

export const config = {
  matcher: ['/profile/:email', '/profile/:email/:path*'],
};
