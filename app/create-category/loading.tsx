export default function Loading() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-6 overflow-hidden bg-linear-to-b from-gray-50 to-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />
      <div className="relative flex w-full max-w-lg flex-col gap-4 p-6 md:p-8 card">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 skeleton rounded-full" />
          <div className="space-y-2">
            <div className="h-6 w-40 skeleton" />
            <div className="h-4 w-56 skeleton" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-12 skeleton" />
          <div className="h-11 w-full skeleton" />
        </div>

        <div className="mt-2 h-11 w-full skeleton" />
        <div className="mx-auto h-4 w-16 skeleton" />
      </div>

      <div className="relative w-full max-w-lg p-6 md:p-8 card">
        <div className="mb-3 h-4 w-36 skeleton" />
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-6 w-20 rounded-full skeleton" />
          ))}
        </div>
      </div>
    </div>
  );
}
