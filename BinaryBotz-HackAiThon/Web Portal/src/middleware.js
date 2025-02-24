import { NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/', '/login', '/signup']

export async function middleware(request) {
  const path = request.nextUrl.pathname

  // Allow public paths
  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next()
  }

  // Check if user is authenticated by session cookie
  const session = request.cookies.get('session')
  
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Extract role from path
  const pathRole = path.split('/')[1]
  
  // Map path to role
  const roleMap = {
    'client-submit': 'client',
    'hospital-process': 'hospital',
    'admin-check': 'admin'
  }

  const requiredRole = roleMap[pathRole]

  // Get user role from custom cookie
  const userRole = request.cookies.get('user_role')?.value

  if (userRole !== requiredRole) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/client-submit', '/hospital-process', '/admin-check']
}