/*
  Shared UI class strings — the app's "design language" in one place.
  Import these instead of re-typing Tailwind chains so every form,
  button, and card stays visually aligned. Uses the `brand-*` design
  tokens defined in app/globals.css.
*/

export const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

export const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

export const errorClass = "mt-1 text-xs text-red-600";

// Primary call-to-action button (Create Blog, Register, Login, Hero CTA).
export const primaryButton =
  "rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

// Standard elevated card / panel.
export const cardClass =
  "rounded-2xl border border-gray-200 bg-white shadow-sm";

// Shared max-width container so headers, hero, and footer share edges.
export const containerClass = "mx-auto w-full max-w-7xl px-6";

// Skeleton placeholder block used by loading.tsx screens. Pulses softly
// while server components stream in. Compose with width/height utilities.
export const skeletonClass = "animate-pulse rounded-md bg-gray-200";
