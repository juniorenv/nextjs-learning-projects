import { Prisma } from "@/app/generated/prisma/client";
import { getCurrentUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { Role } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          error: "You are not authorized to access user information",
        },
        { status: 401 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get("teamId");
    const role = searchParams.get("role") as Role;

    const where: Prisma.UserWhereInput = {};

    if (user.role === Role.ADMIN) {
      // ADMIN sees everyone, can filter freely
      if (teamId) where.teamId = teamId;
      if (role) where.role = role;
    } else if (user.role === Role.MANAGER) {
      // MANAGER sees USER + GUEST across all teams
      // but cannot see any MANAGER or ADMIN (even in their own team)
      where.role = { in: [Role.USER, Role.GUEST] };

      // MANAGER can still filter by teamId if provided
      if (teamId) where.teamId = teamId;

      // Can sub-filter but only between USER and GUEST
      if (role && [Role.USER, Role.GUEST].includes(role)) {
        where.role = role;
      }
    } else if (user.role === Role.USER) {
      // USER sees USER + GUEST in their own team only
      where.teamId = user.teamId;
      where.role = { in: [Role.USER, Role.GUEST] };

      // Can sub-filter but only between USER and GUEST
      if (role && [Role.USER, Role.GUEST].includes(role)) {
        where.role = role;
      }
    } else if (user.role === Role.GUEST) {
      // GUEST sees only GUEST in their own team
      where.teamId = user.teamId;
      where.role = Role.GUEST;
      // No additional filters allowed
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      {
        error: "Internal server error, Something went wrong!",
      },
      { status: 500 },
    );
  }
}
