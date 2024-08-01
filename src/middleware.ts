import { type NextRequest } from 'next/server';

import { updateSession } from '@/supabase/middleware';

export async function middleware(request: NextRequest) {
    const response = await updateSession(request);

    return response;
}
export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. Root path /
         * 2. /api routes
         * 3. /_next (Next.js internals)
         * 4. /_static (inside /public)
         * 5. all root files inside /public (e.g. /favicon.ico)
         * 6. /_vercel (Vercel internals)
         * 7. Specific root files like /favicon.ico
         */
        '/((?!^/$|api/|_next/|_static/|_vercel|[\\w-]+\\.[\\w-]+|icon\\.svg).*)',
    ],
};
