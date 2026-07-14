import { skeletonClass } from "@/lib/ui";

export default function Loading() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar — mirrors EditProfile's tab rail */}
      <aside className="flex w-64 flex-col gap-2 border-r border-gray-200 bg-white p-4">
        <div className={`mb-4 h-6 w-24 ${skeletonClass}`} />
        <div className={`h-9 w-full ${skeletonClass}`} />
        <div className={`h-9 w-full ${skeletonClass}`} />
      </aside>

      {/* Content panel */}
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div className={`h-7 w-48 ${skeletonClass}`} />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className={`h-4 w-28 ${skeletonClass}`} />
              <div className={`h-11 w-full ${skeletonClass}`} />
            </div>
          ))}
          <div className={`h-11 w-40 ${skeletonClass}`} />
        </div>
      </div>
    </div>
  );
}
