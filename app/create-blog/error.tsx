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
      title="Couldn't open the editor"
      description="Nothing was saved or lost. Try again to start writing."
      digest={error.digest}
      retry={unstable_retry}
    />
  );
}
