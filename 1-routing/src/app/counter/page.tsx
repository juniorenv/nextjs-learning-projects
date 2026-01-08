import { Metadata } from "next";
import { Counter } from "./counter";

export const metadata: Metadata = {
  title: "Counter",
};

export default function CounterPage() {
  return <Counter />;
}
