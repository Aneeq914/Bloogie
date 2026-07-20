"use client";

import { Logout } from "@/lib/actions/Auth.action";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { useSession } from "../auth/SessionProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserProfile = () => {
  const user = useSession();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  function handleLogout(action: typeof Logout) {
    startTransition(async () => {
      const result = await action();
      setOpen(false);

      if (result.success) {
        toast.success(result.message);
        router.push("/");
        router.refresh();
      } else toast.error(result.message);
    });
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={menuRef} className="relative flex justify-center">
      <button
        onClick={() => setOpen((prev)=> !prev)}
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
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
            >
              👤 Edit Profile
            </Link>
            <hr className="my-2" />

            <button
              onClick={() => handleLogout(Logout)}
              disabled={isPending}
              className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
