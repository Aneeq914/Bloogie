"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const SignUpTypes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={menuRef} className="relative flex items-center gap-3">
      <Link
        href="/login"
        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-brand-500 hover:text-brand-600"
      >
        Login
      </Link>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-brand-700 active:scale-95"
      >
        Sign Up
        <span
          className={`text-xs transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 z-50 w-64 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
          <p className="border-b border-gray-100 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Sign up as
          </p>

          <Link
            href="/signup?userType=author"
            onClick={() => setIsOpen(false)}
            className="mt-2 block rounded-lg px-4 py-3 transition hover:bg-brand-50"
          >
            <p className="font-medium text-gray-800">Author</p>
            <p className="text-xs text-gray-500">
              Create and manage your own blogs.
            </p>
          </Link>

          <Link
            href="/signup?userType=user"
            onClick={() => setIsOpen(false)}
            className="mt-2 block rounded-lg px-4 py-3 transition hover:bg-brand-50"
          >
            <p className="font-medium text-gray-800">User</p>
            <p className="text-xs text-gray-500">
              Read and interact with blogs.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignUpTypes;
