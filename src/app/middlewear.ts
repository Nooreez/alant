import { NextResponse } from "next/server"

const allowedOrigins = ['https://localhost:3000', 'https://openai.com']

export function middlewear(request: Request){
    const origin = request.headers.get('origin')
    console.log(origin)

    return NextResponse.next()
}

// export const config = {
//     matcher: '/api/:path*',
// }