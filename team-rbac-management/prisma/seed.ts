import "dotenv/config";
import { PrismaClient } from "@/app/generated/prisma/client";
import { Role } from "@/app/types";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.user.deleteMany();
  await prisma.team.deleteMany();
  console.log("🗑️  Previous data has benn removed");

  // ── Teams ──────────────────────────────────────────────────────────────────
  const teamsData = [
    {
      name: "Engineering",
      description: "Product engineering and infrastructure",
      code: "ENG-001",
    },
    {
      name: "Design",
      description: "UX, UI and brand design",
      code: "DES-002",
    },
    {
      name: "Marketing",
      description: "Growth, content and campaigns",
      code: "MKT-003",
    },
    {
      name: "Operations",
      description: "Finance, HR and legal",
      code: "OPS-004",
    },
  ];

  const [engineering, design, marketing, operations] = await Promise.all(
    teamsData.map((data) =>
      prisma.team.upsert({
        where: { code: data.code },
        update: {},
        create: data,
      }),
    ),
  );

  console.log("✅ Teams created");

  // ── Users ──────────────────────────────────────────────────────────────────
  const usersData: {
    name: string;
    email: string;
    password: string;
    role: Role;
    teamId: string;
  }[] = [
    // Engineering
    {
      name: "Alice Souza",
      email: "alice@example.com",
      password: await hash("password123", 10),
      role: Role.ADMIN,
      teamId: engineering.id,
    },
    // Design
    {
      name: "Bruno Costa",
      email: "bruno@example.com",
      password: await hash("password123", 10),
      role: Role.MANAGER,
      teamId: design.id,
    },
    // Marketing
    {
      name: "Carla Lima",
      email: "carla@example.com",
      password: await hash("password123", 10),
      role: Role.USER,
      teamId: marketing.id,
    },
    // Operations
    {
      name: "Daniel Reis",
      email: "daniel@example.com",
      password: await hash("password123", 10),
      role: Role.GUEST,
      teamId: operations.id,
    },

    // ── Extra members (one per team) ─────────────────────────────────────────
    // Engineering – Manager
    {
      name: "Fernanda Oliveira",
      email: "fernanda@example.com",
      password: await hash("password123", 10),
      role: Role.MANAGER,
      teamId: engineering.id,
    },
    // Design – User
    {
      name: "Gabriel Martins",
      email: "gabriel@example.com",
      password: await hash("password123", 10),
      role: Role.USER,
      teamId: design.id,
    },
    // Marketing – Guest
    {
      name: "Helena Ferreira",
      email: "helena@example.com",
      password: await hash("password123", 10),
      role: Role.GUEST,
      teamId: marketing.id,
    },
    // Operations – User
    {
      name: "Igor Mendes",
      email: "igor@example.com",
      password: await hash("password123", 10),
      role: Role.USER,
      teamId: operations.id,
    },
  ];

  await Promise.all(
    usersData.map((data) =>
      prisma.user.upsert({
        where: { email: data.email },
        update: {},
        create: data,
      }),
    ),
  );

  console.log("✅ Users created");
  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
