import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About me",
};

export default function About() {
  return (
    <>
      <Link href={"/"}>Home</Link>
      <h1>About Me</h1>
    </>
  );
}
