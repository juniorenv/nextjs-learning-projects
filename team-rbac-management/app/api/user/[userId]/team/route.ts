import { getCurrentUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { Role } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await context.params;
    const user = await getCurrentUser();

    if (!user || (user.role !== Role.ADMIN && user.role !== Role.MANAGER)) {
      return NextResponse.json(
        { error: "You are not authorized to assign team" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { teamId } = body;

    if (teamId !== null && teamId !== undefined && typeof teamId !== "string") {
      return NextResponse.json({ error: "Invalid teamId" }, { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role === Role.MANAGER) {
      if (targetUser.role !== Role.USER && targetUser.role !== Role.GUEST) {
        return NextResponse.json(
          { error: "You are not authorized to assign this user to a team" },
          { status: 403 },
        );
      }
    }

    if (teamId) {
      const team = await prisma.team.findUnique({
        where: { id: teamId.trim() },
      });

      if (!team) {
        return NextResponse.json({ error: "Team not found" }, { status: 404 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        teamId: teamId ?? null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        teamId: true,
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        user: updatedUser,
        message: teamId
          ? "User assigned to team successfully"
          : "User removed from team successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Team assignment error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
