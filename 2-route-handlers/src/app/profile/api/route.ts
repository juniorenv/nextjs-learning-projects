import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  //   const requestHeaders = new Headers(request.headers);
  //   console.log(requestHeaders.get("authorization"));

  const headersList = await headers();
  console.log(headersList.get("authorization"));

  return new Response("<h1>Profile API page</h1>", {
    headers: { "Content-Type": "text/html" },
  });
}
