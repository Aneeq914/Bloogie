"use client";

import { useEffect } from "react";
import ErrorState from "@/components/layout/ErrorState";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="Couldn't load the signup page"
      description="No account was created. Try again, and nothing you entered will be lost twice."
      digest={error.digest}
      retry={unstable_retry}
    />
  );
}
