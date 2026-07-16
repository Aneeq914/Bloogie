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
      title="Couldn't load the login page"
      description="Your account is fine — we just couldn't show the sign-in form. Try again in a moment."
      digest={error.digest}
      retry={unstable_retry}
    />
  );
}
