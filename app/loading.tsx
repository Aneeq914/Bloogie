
export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* Hero placeholder — mirrors the centered guest/user hero */}
      <div className="relative overflow-hidden bg-linear-to-b from-brand-50/60 via-white to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
        />
        <section className="container-page-sm relative flex flex-col items-center py-16 text-center md:py-24">
          <div className="h-8 w-40 rounded-full skeleton" />
          <div className="mt-6 h-12 w-3/4 skeleton" />
          <div className="mt-6 w-full max-w-2xl space-y-3">
            <div className="h-4 w-full skeleton" />
            <div className="h-4 w-11/12 skeleton" />
            <div className="mx-auto h-4 w-2/3 skeleton" />
          </div>
        </section>
      </div>

      {/* Blog grid placeholder — mirrors BlogList / UserBlogList */}
      <div className="min-h-screen py-12">
        <div className="container-page">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-7 w-40 skeleton" />
              <div className="h-4 w-64 skeleton" />
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
