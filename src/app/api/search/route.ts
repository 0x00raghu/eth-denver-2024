import { type NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  console.log(query, "query");
  console.log(process.env.API_KEY, "query");

  return new Response("Hello, Next.js!", {
    status: 200,
  });
  // query is "hello" for /api/search?query=hello
}
