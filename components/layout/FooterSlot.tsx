"use client";

import { usePathname } from "next/navigation";

const HIDDEN_ON = ["/profilepage"];

export default function FooterSlot({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return children;
}
