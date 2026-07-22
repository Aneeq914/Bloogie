import { getSession } from "@/lib/dal";
import Link from "next/link";
import UserProfile from "../profile/UserProfile";
import SignUpTypes from "../auth/SignUpTypes";
import DashboardToggle from "./DashboardToggle";

const Navbar = async ({ isLoggedIn }: { isLoggedIn: boolean }) => {
   const session = await getSession();
  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur">
        <nav className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-brand-600 to-brand-500 text-lg font-black text-white shadow-sm transition group-hover:scale-105">
              B
            </span>
            <span className="bg-linear-to-r from-brand-600 to-brand-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
              Bloogie
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {isLoggedIn && session?.userType === "author" ? (
              <DashboardToggle />
            ) : null}
            {isLoggedIn ? <UserProfile /> : <SignUpTypes />}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
