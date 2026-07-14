
export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-6 bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-10">
      {/* Image preview placeholder — matches the edit-mode preview box */}
      <div className="h-64 w-full max-w-lg skeleton" />

      <div className="flex w-full max-w-lg flex-col gap-4 p-6 md:p-8 card">
        <div className="mb-2 space-y-2">
          <div className="h-7 w-32 skeleton" />
          <div className="h-4 w-64 skeleton" />
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

        <div className="mt-2 h-11 w-full skeleton" />
      </div>
    </div>
  );
}
