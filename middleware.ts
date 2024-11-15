import { NextRequest, NextResponse } from 'next/server';
import { supabase } from './src/app/lib/supabase/server'; // Adjust the path to your supabase client file

export async function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;

  // // Only apply to dashboard routes
  // if (pathname.startsWith('/dashboard')) {
  //   // Get user (this will automatically check the session cookie)
  //   const { data: { user }, error } = await supabase.auth.getUser();

  //   // If no user or an error occurs, redirect to login
  //   if (error || !user) {
  //     console.log('User is not authenticated, redirecting to login');
  //     return NextResponse.redirect(new URL('/auth/login', req.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'], // Protect all /dashboard routes
};

