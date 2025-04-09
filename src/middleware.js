import { NextResponse } from "next/server";

export async function middleware(request) {
  // Obtener la cookie de autenticación (ajusta el nombre según tu implementación)
  const authCookie = request.cookies.get("access_token");

  // Verificar si la ruta actual es la de login
  const isLoginPage = request.nextUrl.pathname === "/auth/login";

  // Si no hay cookie o está expirada
  if (!authCookie || !authCookie.value) {
    // Si ya está en la página de login, permitir acceso
    if (isLoginPage) {
      return NextResponse.next();
    }

    // Si no está en login, redirigir a login
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si hay cookie válida
  if (authCookie && authCookie.value) {
    // Opcionalmente, puedes verificar la validez de la cookie aquí
    // Por ejemplo, haciendo una petición a tu API para validar el token

    // Si está intentando acceder a login pero ya tiene sesión, redirigir al dashboard
    if (isLoginPage) {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Para todas las demás rutas, permitir acceso si tiene cookie válida
    return NextResponse.next();
  }

  // Por defecto, permitir acceso
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/account",
    "/attachment/:path*",
    "/attribute/:path*",
    "/auth/:path*",
    "/blog/:path*",
    "/category/:path*",
    "/checkout",
    "/commission_history",
    "/coupon/:path*",
    "/currency/:path*",
    "/dasboard",
    "/dashboard/:path*",
    "/faq/:path*",
    "/notification/:path*",
    "/order/:path*",
    "/page/:path*",
    "/payment_account/:path*",
    "/point/:path*",
    "/product/:path*",
    "/refund",
    "/review/:path*",
    "/role/",
    "/setting/:path*",
    "/shipping/:path*",
    "/store/:path*",
    "/tag/:path*",
    "/tax/:path*",
    "/theme/:path*",
    "/theme_option/:path*",
    "/user/:path*",
    "/vendore_wallet/:path*",
    "/wallet/:path*",
    "/withdraw_request/:path*",
    "/vendor_wallet/:path*",
    "/theme/denver",
    "/notifications",
    "/qna",
  ],
};
