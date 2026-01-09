"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import "./styles.css";

const navAuthLinks = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
  { name: "Forgot Password", href: "/forgot-password" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const pathname = usePathname();
  return (
    <div>
      <div>
        <input
          style={{ border: "1px solid black" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {navAuthLinks.map(({ href, name }) => {
        const isActive =
          pathname === href || (pathname === href && href !== "/");
        return (
          <Link
            className={
              isActive
                ? "text-indigo-700 font-bold mr-4"
                : "text-indigo-400 mr-4"
            }
            href={href}
            key={name}
          >
            {name}
          </Link>
        );
      })}
      <div>{children}</div>
    </div>
  );
}
