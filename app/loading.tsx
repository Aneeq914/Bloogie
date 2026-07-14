
export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* Hero placeholder — mirrors the centered guest/user hero */}
      <div className="relative overflow-hidden bg-linear-to-b from-brand-50/60 via-white to-white">
        <section className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center md:py-24">
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
      <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-2">
            <div className="h-7 w-40 skeleton" />
            <div className="h-4 w-64 skeleton" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="h-48 w-full rounded-none skeleton" />
                <div className="flex flex-1 flex-col gap-3 p-5">
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
