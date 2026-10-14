import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ──────────────────────────────────────────────
  // 1. Admin Route Protection (Basic Auth gate)
  // ──────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const adminSecret = process.env.ADMIN_SECRET;
    if (adminSecret) {
      const authHeader = request.headers.get("authorization");
      if (!authHeader) {
        return new NextResponse("Authentication required", {
          status: 401,
          headers: { "WWW-Authenticate": 'Basic realm="Real Korea Admin"' },
        });
      }

      const isBasicAuth = authHeader.startsWith("Basic ");
      const isBearerAuth = authHeader.startsWith("Bearer ");

      if (isBearerAuth) {
        const token = authHeader.slice(7);
        if (token !== adminSecret) {
          return new NextResponse("Invalid credentials", { status: 403 });
        }
      } else if (isBasicAuth) {
        const decoded = atob(authHeader.slice(6));
        const [, password] = decoded.split(":");
        if (password !== adminSecret) {
          return new NextResponse("Invalid credentials", { status: 403 });
        }
      } else {
        return new NextResponse("Invalid auth scheme", { status: 401 });
      }
    }
  }

  // ──────────────────────────────────────────────
  // 2. CSRF / Same-Origin Check for Mutation APIs
  // ──────────────────────────────────────────────
  if (pathname.startsWith("/api/") && request.method === "POST") {
    const origin = request.headers.get("origin");
    const expectedOrigin = request.nextUrl.origin;

    if (origin && origin !== expectedOrigin) {
      return NextResponse.json(
        { error: "Cross-origin requests are not allowed." },
        { status: 403 }
      );
    }
  }

  // ──────────────────────────────────────────────
  // 3. Global Security Headers (AdSense & Modern Web compatible)
  // ──────────────────────────────────────────────
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagmanager.com https://www.google-analytics.com",
    "frame-src 'self' https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com",
    "img-src 'self' data: blob: https://cdn.sanity.io https://upload.wikimedia.org https://pagead2.googlesyndication.com https://*.googleusercontent.com",
    "connect-src 'self' https://*.sanity.io https://pagead2.googlesyndication.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
  ].join("; ");

  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|icon|robots.txt|sitemap.xml).*)",
  ],
};
