"use client";

import { useTheme } from "@/components/theme-provider";

export default function ClientRoutePage() {
  const theme = useTheme();

  return (
    <div style={{ color: theme.colors.primary }}>
      <h1>Client route page</h1>
    </div>
  );
}
