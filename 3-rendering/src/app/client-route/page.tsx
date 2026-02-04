"use client";

import { useTheme } from "@/components/theme-provider";
import { clientSideFunction } from "@/utils/client-utils";

export default function ClientRoutePage() {
  const theme = useTheme();
  const result = clientSideFunction();

  return (
    <div style={{ color: theme.colors.primary }}>
      <h1>Client route page</h1>
      {result}
    </div>
  );
}
