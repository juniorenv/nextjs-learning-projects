import { generateToken, verifyPassword } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Email & password are required or not valid",
        },
        { status: 400 },
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();

    const userFromDb = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
      include: { team: true },
    });

    if (!userFromDb) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    const isValidPassword = await verifyPassword(password, userFromDb.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    const token = generateToken(userFromDb.id);

    const response = NextResponse.json({
      id: userFromDb.id,
      name: userFromDb.name,
      email: userFromDb.email,
      role: userFromDb.role,
      teamId: userFromDb.teamId,
      team: userFromDb.team,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json(
      {
        error: "Internal server error, Something went wrong!",
      },
      { status: 500 },
    );
  }
}
