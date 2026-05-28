// Phase 2: Replace with Clerk middleware
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// const isProtected = createRouteMatcher(['/dashboard(.*)', '/profile(.*)', '/cv-agent(.*)', '/job-matches(.*)', '/applications(.*)', '/interview-prep(.*)', '/settings(.*)'])
// export default clerkMiddleware(async (auth, req) => { if (isProtected(req)) await auth.protect() })

// Phase 2: Replace with Clerk auth proxy
export function proxy() {}

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'],
}
