import prisma from "./prisma";

export async function checkPrismaConnection() {
  const timestamp = new Date().toISOString();

  try {
    await prisma.$queryRaw`SELECT 1;`;

    return {
      ok: true,
      timestamp,
    };
  } catch (error) {
    console.error("Error executing Prisma health check:", error);
    return {
      ok: false,
      timestamp,
      error:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Unknown error"
          : "Database connection failed",
    };
  }
}
