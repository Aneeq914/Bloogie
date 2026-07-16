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
      title="Something went wrong"
      description="We couldn't load this page. This is usually temporary, so trying again often fixes it."
      digest={error.digest}
      retry={unstable_retry}
    />
  );
}
