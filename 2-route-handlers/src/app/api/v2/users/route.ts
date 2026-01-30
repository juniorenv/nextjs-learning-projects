interface UserV2 {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  name: {
    first: string;
    last: string;
    middle?: string;
  };
  status: "active" | "inactive" | "suspended";
  lastLoginAt: string | null;
  profile: {
    avatar: string | null;
    title: string | null;
    department: string | null;
  };
  preferences: {
    language: string;
    timezone: string;
    emailNotifications: boolean;
  };
}

export async function GET() {
  const users: UserV2[] = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "sarah.jenkins@example.com",
      fullName: "Sarah Elizabeth Jenkins",
      createdAt: "2023-01-15T08:30:00Z",
      name: {
        first: "Sarah",
        last: "Jenkins",
        middle: "Elizabeth",
      },
      status: "active",
      lastLoginAt: "2023-10-27T14:45:00Z",
      profile: {
        avatar: "https://cdn.example.com/avatars/sjenkins.jpg",
        title: "Senior Product Manager",
        department: "Product",
      },
      preferences: {
        language: "en-US",
        timezone: "America/New_York",
        emailNotifications: true,
      },
    },
    {
      id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      email: "chen.wei@example.org",
      fullName: "Chen Wei",
      createdAt: "2023-06-20T02:15:00Z",
      name: {
        first: "Chen",
        last: "Wei",
      },
      status: "inactive",
      lastLoginAt: null,
      profile: {
        avatar: null,
        title: "Software Engineer",
        department: "Engineering",
      },
      preferences: {
        language: "zh-CN",
        timezone: "Asia/Shanghai",
        emailNotifications: false,
      },
    },
    {
      id: "98765432-10fe-dcba-abcd-ef0123456789",
      email: "m.rodriguez@example.net",
      fullName: "Mateo Rodriguez",
      createdAt: "2022-11-05T10:00:00Z",
      name: {
        first: "Mateo",
        last: "Rodriguez",
      },
      status: "suspended",
      lastLoginAt: "2023-09-01T09:00:00Z",
      profile: {
        avatar: "https://cdn.example.com/avatars/mrodriguez.png",
        title: null,
        department: null,
      },
      preferences: {
        language: "es-ES",
        timezone: "Europe/Madrid",
        emailNotifications: true,
      },
    },
  ];
  return Response.json(users);
}
