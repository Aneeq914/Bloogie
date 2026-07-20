"use client";
import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BasicProfile from "./BasicEditProfile";
import AccountEditProfile from "./AccountEditProfile";
import { Logout, LogoutEverywhere } from "@/lib/actions/Auth.action";

const EditProfile = () => {
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
    `rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
      active
        ? "bg-brand-50 text-brand-700"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 flex-col gap-1 border-r border-gray-200 bg-white p-4">
        <h1 className="mb-4 px-3 text-lg font-bold text-gray-900">Profile</h1>

        <button
          onClick={() => setTab("basic")}
          className={tabClass(tab === "basic")}
        >
          Basic Information
        </button>

        <button
          onClick={() => setTab("account")}
          className={tabClass(tab === "account")}
        >
          Account Information
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-auto w-full rounded-xl bg-linear-to-br from-red-600 to-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-red-700 hover:to-red-600 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          Logout
        </button>
      </aside>

      {tab === "basic" ? (
        <BasicProfile/>
      ) : null}
      {tab === "account" ? (
        <AccountEditProfile/>
      ) : null}

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
              <h2
                id="logout-title"
                className="text-lg font-bold tracking-tight text-gray-900"
              >
                Logout
              </h2>

              <p className="mt-1.5 text-sm text-gray-500">
                Choose how you want to sign out.
              </p>

              <div className="mt-5 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => handleLogout(Logout)}
                  disabled={isPending}
                  className="w-full rounded-xl bg-linear-to-br from-red-600 to-red-500 px-4 py-3 text-left shadow-sm transition hover:from-red-700 hover:to-red-600 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
                  className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-left transition hover:border-red-300 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
  );
};

export default EditProfile;
