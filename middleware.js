import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("--------------middleware------------------------")
    console.log(request.nextUrl.pathname, request.page)
    onsole.log("-------------------------------------------------")
  return NextResponse.next();
}
 
