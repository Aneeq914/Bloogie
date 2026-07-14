"use client";

import { Logout } from "@/lib/actions/Auth.action";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "../auth/SessionProvider";
import Link from "next/link";

const UserProfile = () => {
  const user = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div>
      
      <div className="relative flex justify-center">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Open profile menu"
          className="rounded-full ring-2 ring-gray-200 transition hover:ring-brand-500/60 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <Image
            src={user?.image || "/Profile.png"}
            alt={user?.username || "Profile"}
            width={42}
            height={42}
            className="h-10.5 w-10.5 rounded-full object-cover"
          />
        </button>

        {open && (
          <div className="absolute right-0 top-16 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <div className="border-b border-gray-100 px-5 py-4">
              <p className="font-semibold text-gray-900">{user?.username}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            <div className="py-2">
              <Link
                href={`/profilepage`}
                className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
              >
                👤 Edit Profile
              </Link>
              <form action={Logout}>
                <hr className="my-2" />

                <button
                  type="submit"
                  className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                >
                  🚪 Logout
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
