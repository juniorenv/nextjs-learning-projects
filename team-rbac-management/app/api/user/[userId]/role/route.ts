import { Role } from "@/app/generated/prisma/enums";
import { getCurrentUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await context.params;
    const currentUser = await getCurrentUser();

    if (
      !currentUser ||
      (currentUser.role !== Role.ADMIN && currentUser.role !== Role.MANAGER)
    ) {
      return NextResponse.json(
        { error: "You are not authorized to change user roles" },
        { status: 403 },
      );
    }

    if (currentUser.id === userId) {
      return NextResponse.json(
        { error: "You cannot change your own role" },
        { status: 403 },
      );
    }

    const { role } = await request.json();

    if (!role || typeof role !== "string") {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    const parsedRole = role as Role;

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (currentUser.role === Role.ADMIN) {
      if (targetUser.role === Role.ADMIN) {
        return NextResponse.json(
          { error: "Cannot change the role of an admin" },
          { status: 403 },
        );
      }

      const validRoles: Role[] = [Role.USER, Role.MANAGER, Role.GUEST];
      if (!validRoles.includes(parsedRole)) {
        return NextResponse.json(
          { error: "Invalid role. Allowed roles are USER, MANAGER and GUEST" },
          { status: 400 },
        );
      }
    } else if (currentUser.role === Role.MANAGER) {
      if (targetUser.role === Role.ADMIN || targetUser.role === Role.MANAGER) {
        return NextResponse.json(
          { error: "You are not authorized to change this user's role" },
          { status: 403 },
        );
      }

      const validRoles: Role[] = [Role.USER, Role.GUEST];
      if (!validRoles.includes(parsedRole)) {
        return NextResponse.json(
          {
            error:
              "Invalid role. As a manager you can only assign USER or GUEST",
          },
          { status: 400 },
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: parsedRole },
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
        message: `User role updated to ${parsedRole} successfully`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Role assignment error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
