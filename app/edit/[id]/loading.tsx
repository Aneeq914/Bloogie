export default function Loading() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-6 overflow-hidden bg-linear-to-b from-gray-50 to-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />

      {/* Image preview placeholder — matches the edit-mode preview box */}
      <div className="relative h-64 w-full max-w-lg skeleton" />

      <div className="relative flex w-full max-w-lg flex-col gap-4 p-6 md:p-8 card">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 skeleton rounded-full" />
          <div className="space-y-2">
            <div className="h-6 w-28 skeleton" />
            <div className="h-4 w-56 skeleton" />
          </div>
        </div>

        {/* Title, author, image, short description */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-28 skeleton" />
            <div className="h-11 w-full skeleton" />
          </div>
        ))}

        {/* Long description textarea */}
        <div className="space-y-2">
          <div className="h-4 w-36 skeleton" />
          <div className="h-32 w-full skeleton" />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <div className="h-4 w-24 skeleton" />
          <div className="h-11 w-full skeleton" />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <div className="h-4 w-16 skeleton" />
          <div className="h-11 w-full skeleton" />
        </div>

        <div className="mt-2 h-11 w-full skeleton" />
        <div className="mx-auto h-4 w-16 skeleton" />
      </div>
    </div>
  );
}
