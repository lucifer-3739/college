import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value || '';
    const { nextUrl } = request;
    const path = nextUrl.pathname;

    const isLoginPath = path === '/login';
    const isRegisterPath = path === '/register';
    const isDefaultRedirectPath = path === '/';
    const isApiAuthRoute = path.startsWith('/api/auth');
    const isAuthRoute = isLoginPath || isRegisterPath;
    const isProtectedRoute = ['/chat', '/dashboard', '/profile'].includes(path); // Add your protected routes here
    const isPublicRoute = ['/about', '/contact'].includes(path); // Add your public routes here

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (token) {
            if (isDefaultRedirectPath) {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL('/', nextUrl));
        }
        return NextResponse.next();
    }

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', nextUrl));
    }

    if (isPublicRoute && token) {
        if (isDefaultRedirectPath) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/', nextUrl));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!.*\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
