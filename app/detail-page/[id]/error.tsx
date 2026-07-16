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
      title="Couldn't load this blog"
      description="The post may have been removed, or the connection dropped. Try again."
      digest={error.digest}
      retry={unstable_retry}
    />
  );
}
