export default function Loading() {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-brand-50/60 via-white to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />

      <section className="container-page-sm relative flex flex-col items-center py-16 text-center md:py-24">
        <div className="h-24 w-24 rounded-full skeleton" />
        <div className="mt-5 h-9 w-64 skeleton" />
        <div className="mt-2 h-4 w-32 skeleton" />
        <div className="mt-5 w-full max-w-xl space-y-2">
          <div className="h-4 w-full skeleton" />
          <div className="mx-auto h-4 w-2/3 skeleton" />
        </div>
        <div className="mt-6 h-4 w-28 skeleton" />
      </section>

      <div className="pb-16">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col overflow-hidden card">
                <div className="h-48 w-full rounded-none skeleton" />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="h-5 w-16 rounded-full skeleton" />
                  <div className="h-5 w-3/4 skeleton" />
                  <div className="h-4 w-full skeleton" />
                  <div className="h-4 w-5/6 skeleton" />
                  <div className="mt-4 border-t border-gray-100 pt-4">
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
