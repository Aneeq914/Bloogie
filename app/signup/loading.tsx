import { skeletonClass } from "@/lib/ui";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-8 shadow-lg sm:p-10">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className={`h-8 w-52 ${skeletonClass}`} />
          <div className={`h-4 w-64 ${skeletonClass}`} />
        </div>

        <div className="space-y-5">
          {/* First / last name row */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className={`h-4 w-24 ${skeletonClass}`} />
                <div className={`h-11 w-full ${skeletonClass}`} />
              </div>
            ))}
          </div>

          {/* Username, email, password */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className={`h-4 w-28 ${skeletonClass}`} />
              <div className={`h-11 w-full ${skeletonClass}`} />
            </div>
          ))}

          <div className={`mt-2 h-11 w-full ${skeletonClass}`} />
        </div>
      </div>
    </div>
  );
}
