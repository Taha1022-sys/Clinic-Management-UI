import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // HATA BURADAYDI: "mediflow_token" değil, senin AuthContext'in "token" olarak kaydediyor.
  const token = request.cookies.get("token"); 

  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || 
                     request.nextUrl.pathname.startsWith("/register");
  
  // Dashboard rotaları (Panel de dahil edilmeli)
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard") || 
                      request.nextUrl.pathname.startsWith("/panel");

  // Eğer token varsa ve login sayfasına girmeye çalışıyorsa -> Dashboard'a at
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Eğer token YOKSA ve dashboard'a girmeye çalışıyorsa -> Login'e at
  if (!token && isDashboard) {
    // Giriş yaptıktan sonra geri dönebilmesi için mevcut URL'i parametre ekleyebiliriz (Opsiyonel)
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Matcher'a "/panel/:path*" yolunu da ekledim ki admin paneli de korunsun
  matcher: ["/dashboard/:path*", "/panel/:path*", "/login", "/register"],
};
