import { DashboardContent } from "@/components/DashboardContent";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  const userId = session.data?.user.id;

  if (!userId) {
    redirect("/auth/login");
  }

  return <DashboardContent userId={userId} />;
}
