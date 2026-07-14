
export default function Loading() {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-brand-50/60 via-white to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />

      <article className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-6 h-4 w-16 skeleton" />
          {/* Title */}
          <div className="space-y-3">
            <div className="h-11 w-full skeleton" />
            <div className="h-11 w-2/3 skeleton" />
          </div>
          {/* Author + date */}
          <div className="mt-5 flex items-center gap-3">
            <div className="h-4 w-24 skeleton" />
            <div className="h-4 w-28 skeleton" />
          </div>
        </header>

        {/* Cover image */}
        <div className="mb-8 aspect-video w-full skeleton" />

        {/* Short description */}
        <div className="mb-8 space-y-2 border-l-4 border-gray-200 pl-4">
          <div className="h-5 w-full skeleton" />
          <div className="h-5 w-4/5 skeleton" />
        </div>

        {/* Body paragraphs */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`h-4 ${i % 3 === 2 ? "w-2/3" : "w-full"} skeleton`}
            />
          ))}
        </div>
      </article>
    </div>
  );
}
