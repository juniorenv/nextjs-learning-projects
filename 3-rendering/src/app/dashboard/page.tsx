"use client";

import { useState } from "react";

export default function DashboardPage() {
  console.log("dashboard client side");

  const [input, setInput] = useState("");

  return (
    <div>
      <h1>Dashboard</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <p>Hello, {input}</p>
    </div>
  );
}
