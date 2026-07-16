"use client";

import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { togglePublish } from "@/lib/actions/Blog.action";
import { toast } from "sonner";

export default function PublishButton({
  id,
  published,
}: {
  id: string;
  published?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const action = published ? "Unpublish" : "Publish";
  const buttonColor = published
    ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
    : "bg-green-50 text-green-700 hover:bg-green-100";

  function handleToggle() {
    startTransition(async () => {
      const result = await togglePublish(id);
      setIsOpen(false);

      if (result.success) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  return (
    <>
      <button
        className={`inline-flex items-center rounded-full px-3 py-1 font-medium transition ${buttonColor}`}
        onClick={() => setIsOpen(true)}
      >
        {action}
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-900">
                {action} Blog
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {published
                  ? "Are you sure you want to unpublish this blog? Readers will no longer see it, but you can publish it again anytime."
                  : "Are you sure you want to publish this blog? It will be visible to everyone."}
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  No
                </button>

                <button
                  onClick={handleToggle}
                  disabled={isPending}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:opacity-50"
                >
                  Yes, {action}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
