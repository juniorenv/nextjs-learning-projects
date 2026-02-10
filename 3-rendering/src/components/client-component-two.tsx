"use client";

import { useState } from "react";

export const ClientComponentTwo = () => {
  const [value, setValue] = useState("joker");

  return (
    <>
      <h1>Client component two</h1>
    </>
  );
};
