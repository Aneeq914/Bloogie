import { skeletonClass } from "@/lib/ui";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className={`h-8 w-48 ${skeletonClass}`} />
          <div className={`h-4 w-56 ${skeletonClass}`} />
        </div>

        <div className="space-y-5">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className={`h-4 w-28 ${skeletonClass}`} />
              <div className={`h-11 w-full ${skeletonClass}`} />
            </div>
          ))}
          <div className={`h-11 w-full ${skeletonClass}`} />
        </div>
      </div>
    </div>
  );
}
