import { checkPrismaConnection } from "@/app/lib/prisma-health";
import { NextResponse } from "next/server";

export async function GET() {
  const health = await checkPrismaConnection();

  return NextResponse.json(health, {
    status: health.ok ? 200 : 503,
  });
}
