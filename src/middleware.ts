import { type NextRequest } from "next/server";

import { updateSession } from "@/supabase/middleware";

export async function middleware(request: NextRequest) {
	const response = await updateSession(request);

	return response;
}
export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. /_static (inside /public)
		 * 4. all root files inside /public (e.g. /favicon.ico)
		 */
		"/((?!api/|_next/|_static/|_vercel|[w-]+.w+|icon.svg).*)/",
	],
};
