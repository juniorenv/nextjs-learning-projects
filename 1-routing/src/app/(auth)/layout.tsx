import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 style={{ color: "#1e40af" }}>🔐 Authentication</h2>
      <div>{children}</div>
      <p style={{ color: "#64748b" }}>Secure login area</p>
    </div>
  );
}
