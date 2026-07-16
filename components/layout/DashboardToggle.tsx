"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The navbar is a Server Component and cannot read the current URL, so the
// half that depends on the path lives here.
const DashboardToggle = () => {
  const onDashboard = usePathname() === "/author-dashboard";

  return (
    <Link
      href={onDashboard ? "/" : "/author-dashboard"}
      className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600"
    >
      {onDashboard ? "Switch to User Dashboard" : "Switch to Author Dashboard"}
    </Link>
  );
};

export default DashboardToggle;
