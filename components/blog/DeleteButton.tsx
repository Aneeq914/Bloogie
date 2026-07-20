"use client";

import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { deleteBlog } from "@/lib/actions/Blog.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteBlog(id);
      setIsOpen(false);

      if (result.success) toast.success(result.message);
      else toast.error(result.message);
      if (result.authExpired) router.refresh();
    });
  }

  return (
    <>
      <button
        className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 font-medium text-red-600 transition hover:bg-red-100"
        onClick={() => setIsOpen(true)}
      >
        Delete Post
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-900">
                Delete Blog
              </h2>

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
                  disabled={isPending}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
