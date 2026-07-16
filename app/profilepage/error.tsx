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
      title="Couldn't load your profile"
      description="Your details are safe — we just couldn't fetch them right now. Try again."
      digest={error.digest}
      retry={unstable_retry}
    />
  );
}
