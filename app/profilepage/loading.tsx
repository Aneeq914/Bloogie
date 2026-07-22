export default function Loading() {
  return (
    <div className="container-page py-8">
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden card">
        {/* Sidebar — mirrors EditProfile's identity block + tab rail */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white p-4">
          <div className="mb-4 flex flex-col items-center gap-2 rounded-xl bg-gray-50 px-3 py-5">
            <div className="h-14 w-14 rounded-full skeleton" />
            <div className="h-4 w-24 skeleton" />
            <div className="h-3 w-32 skeleton" />
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <div className="h-9 w-full skeleton" />
            <div className="h-9 w-full skeleton" />
          </div>

          <div className="h-10 w-full skeleton" />
        </aside>

        {/* Content panel */}
        <div className="flex-1 bg-gray-50 p-8">
          <div className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-gray-200 bg-white p-8">
            <div className="space-y-2 border-b border-gray-200 pb-6">
              <div className="h-6 w-48 skeleton" />
              <div className="h-4 w-64 skeleton" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="h-28 w-28 rounded-full skeleton" />
              <div className="h-3 w-32 skeleton" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-20 skeleton" />
                  <div className="h-11 w-full skeleton" />
                </div>
              ))}
            </div>

            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 skeleton" />
                <div className="h-11 w-full skeleton" />
              </div>
            ))}

            <div className="flex justify-end border-t border-gray-200 pt-6">
              <div className="h-9 w-32 skeleton" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
