import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// กำหนด type สำหรับ token
interface CustomToken {
  role?: string
  name?: string
  email?: string
  picture?: string
  sub?: string
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token as CustomToken
    const pathname = req.nextUrl.pathname

    // กำหนดเส้นทางที่ต้องการ protect
    const adminRoutes = ['/admin', '/dashboard']
    const authRoutes = ['/profile', '/settings']
    
    // ถ้าไม่มี token (ไม่ได้ login)
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/api/auth/signin'
      return NextResponse.redirect(url)
    }

    // ตรวจสอบ role สำหรับ admin routes
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (token.role !== 'admin') {
        // ถ้าไม่ใช่ admin พยายามเข้าถึง admin routes
        const url = req.nextUrl.clone()
        url.pathname = '/unauthorized'
        return NextResponse.redirect(url)
      }
    }

    // ตรวจสอบ role สำหรับ user routes
    if (authRoutes.some(route => pathname.startsWith(route))) {
      if (!['admin', 'user'].includes(token.role || '')) {
        // ถ้าไม่มี role ที่ถูกต้อง
        const url = req.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ]
}