"use client";
import Image from "next/image";
import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BasicProfile from "./BasicEditProfile";
import AccountEditProfile from "./AccountEditProfile";
import { useSession } from "../auth/SessionProvider";
import { Logout, LogoutEverywhere } from "@/lib/actions/Auth.action";

const EditProfile = () => {
  const user = useSession();
  const [tab, setTab] = useState<"basic" | "account">("basic");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleLogout(action: typeof Logout) {
    startTransition(async () => {
      const result = await action();
      setIsOpen(false);

      if (result.success) {
        toast.success(result.message);
        router.push("/");
        router.refresh();
      } else toast.error(result.message);
    });
  }

  const tabClass = (active: boolean) =>
    `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
      active
        ? "bg-brand-50 text-brand-700"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="container-page py-8">
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden card">
        <aside className="flex w-64 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white p-4 scrollbar-hidden">
          <div className="mb-4 flex flex-col items-center gap-2 rounded-xl bg-gray-50 px-3 py-5 text-center">
            <Image
              src={user?.image || "/Profile.png"}
              alt={user?.username || "Profile"}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            <button
              onClick={() => setTab("basic")}
              className={tabClass(tab === "basic")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden
              >
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Basic Information
            </button>

            <button
              onClick={() => setTab("account")}
              className={tabClass(tab === "account")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden
              >
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Account Information
            </button>
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="btn-danger w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
            Logout
          </button>
        </aside>

        {tab === "basic" ? <BasicProfile /> : null}
        {tab === "account" ? <AccountEditProfile /> : null}

        {isOpen &&
          createPortal(
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-title"
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      aria-hidden
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <path d="M16 17l5-5-5-5" />
                      <path d="M21 12H9" />
                    </svg>
                  </span>
                  <div>
                    <h2
                      id="logout-title"
                      className="text-lg font-bold tracking-tight text-gray-900"
                    >
                      Logout
                    </h2>
                    <p className="text-sm text-gray-500">
                      Choose how you want to sign out.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleLogout(Logout)}
                    disabled={isPending}
                    className="w-full rounded-xl bg-linear-to-br from-red-600 to-red-500 px-4 py-3 text-left shadow-sm transition hover:from-red-700 hover:to-red-600 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    <span className="block text-sm font-semibold text-white">
                      This device
                    </span>
                    <span className="mt-0.5 block text-xs text-red-50">
                      Stay signed in everywhere else
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLogout(LogoutEverywhere)}
                    disabled={isPending}
                    className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-left transition hover:border-red-300 hover:bg-red-50 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    <span className="block text-sm font-semibold text-red-700">
                      All devices
                    </span>
                    <span className="mt-0.5 block text-xs text-red-600/70">
                      Ends every active session immediately
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                  className="mt-4 w-full rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
};

export default EditProfile;
