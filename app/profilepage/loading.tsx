
export default function Loading() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar — mirrors EditProfile's tab rail */}
      <aside className="flex w-64 flex-col gap-2 border-r border-gray-200 bg-white p-4">
        <div className="mb-4 h-6 w-24 skeleton" />
        <div className="h-9 w-full skeleton" />
        <div className="h-9 w-full skeleton" />
      </aside>

      {/* Content panel */}
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="h-7 w-48 skeleton" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-28 skeleton" />
              <div className="h-11 w-full skeleton" />
            </div>
          ))}
          <div className="h-11 w-40 skeleton" />
        </div>
      </div>
    </div>
  );
}
