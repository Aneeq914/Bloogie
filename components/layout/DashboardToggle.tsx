"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The navbar is a Server Component and cannot read the current URL, so the
// half that depends on the path lives here.
const DashboardToggle = () => {
  const onDashboard = usePathname() === "/author-dashboard";
  const target = onDashboard ? "User" : "Author";

  return (
    <Link
      href={onDashboard ? "/" : "/author-dashboard"}
      title={`Switch to ${target} Dashboard`}
      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600"
    >
      <span aria-hidden className="text-gray-400">
        ⇄
      </span>
      {/* The full phrase is too wide for a phone navbar, so drop to just the
          destination once the logo and avatar are competing for room. */}
      <span className="hidden sm:inline">Switch to {target} Dashboard</span>
      <span className="sm:hidden">{target}</span>
    </Link>
  );
};

export default DashboardToggle;
