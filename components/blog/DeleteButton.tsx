"use client";

import { useState } from "react";
import { deleteBlog } from "@/lib/actions/Blog.action";

export default function DeleteButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete() {
    await deleteBlog(id);
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 font-medium text-red-600 transition hover:bg-red-100"
        onClick={() => setIsOpen(true)}
      >
        Delete Post
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-900">Delete Blog</h2>

            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this blog? This action cannot be
              undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                No
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
