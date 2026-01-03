import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth"

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl

    if (
        token &&
        (url.pathname === "/sign-in" || url.pathname === "/sign-up" || url.pathname === "/verify" || url.pathname === "/")
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if(!token && url.pathname === "/dashboard"){
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/sign-in",
        "/sign-up",
        "/verify",
        "/"
    ]
}