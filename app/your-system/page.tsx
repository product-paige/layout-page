import type { Metadata } from "next";
import YourSystem from "./YourSystem";

export const metadata: Metadata = { title: "Your System · layout.page" };

export default function YourSystemPage() {
  return <YourSystem />;
}
