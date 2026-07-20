"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SessionWatcher({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return;

    const check = async () => {
      const res = await fetch("/api/session");
      const { ok } = await res.json();
      if (!ok) router.refresh();
    };

    const id = setInterval(check, 15000);
    document.addEventListener("visibilitychange", check);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", check);
    };
  }, [isLoggedIn, router]);

  return null;
}
