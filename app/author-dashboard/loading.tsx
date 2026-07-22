export default function Loading() {
  return (
    <div>
      {/* Hero placeholder — mirrors the author-dashboard hero + CTA card */}
      <div className="relative overflow-hidden bg-linear-to-b from-brand-50/60 via-white to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl"
        />
        <section className="container-page relative flex flex-col items-center justify-between gap-12 py-16 md:flex-row md:gap-20 md:py-24">
          <div className="w-full max-w-2xl space-y-4 text-center md:text-left">
            <div className="mx-auto h-7 w-40 rounded-full skeleton md:mx-0" />
            <div className="mx-auto h-11 w-3/4 skeleton md:mx-0" />
            <div className="space-y-2">
              <div className="h-4 w-full skeleton" />
              <div className="h-4 w-11/12 skeleton" />
              <div className="mx-auto h-4 w-2/3 skeleton md:mx-0" />
            </div>
          </div>

          <div className="w-full shrink-0 md:w-auto md:min-w-[22rem]">
            <div className="flex flex-col items-stretch gap-5 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm md:p-10">
              <div className="mx-auto h-5 w-48 skeleton" />
              <div className="h-12 w-full rounded-lg skeleton" />
              <div className="h-12 w-full rounded-lg skeleton" />
            </div>
          </div>
        </section>
      </div>

      {/* Blog grid placeholder — mirrors AuthorBlogList */}
      <div className="min-h-screen py-12">
        <div className="container-page">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-7 w-32 skeleton" />
              <div className="h-4 w-72 skeleton" />
            </div>
            <div className="h-11 w-40 rounded-full skeleton" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col overflow-hidden card">
                <div className="relative h-48 w-full rounded-none skeleton">
                  <div className="absolute left-3 top-3 h-6 w-16 rounded-full bg-white/70" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="h-5 w-16 rounded-full skeleton" />
                  <div className="h-5 w-3/4 skeleton" />
                  <div className="h-4 w-full skeleton" />
                  <div className="h-4 w-5/6 skeleton" />
                  <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                    <div className="h-3 w-20 skeleton" />
                    <div className="h-3 w-24 skeleton" />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 px-5 pb-5">
                  <div className="h-6 w-16 rounded-full skeleton" />
                  <div className="h-6 w-16 rounded-full skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
