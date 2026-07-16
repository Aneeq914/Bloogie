"use client";

interface ErrorStateProps {
  title: string;
  description: string;
  digest?: string;
  retry: () => void;
}

const ErrorState = ({ title, description, digest, retry }: ErrorStateProps) => (
  <main className="flex flex-1 items-center justify-center px-4 py-20">
    <div className="w-full max-w-md p-8 text-center card">
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-sm text-gray-500">{description}</p>

      <button onClick={retry} className="mt-6 w-full btn-primary">
        Try again
      </button>

      {/* Server errors are redacted before reaching the browser; the digest is
          the only handle that ties this screen to the server log. */}
      {digest && (
        <p className="mt-4 font-mono text-xs text-gray-400">Reference: {digest}</p>
      )}
    </div>
  </main>
);

export default ErrorState;
