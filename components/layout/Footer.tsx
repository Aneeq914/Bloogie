
const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-linear-to-b from-white to-brand-50/40">
      <div
        className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row container-page"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-brand-600 to-brand-500 text-base font-black text-white shadow-sm">
            B
          </span>
          <div className="flex flex-col leading-tight">
            <span className="bg-linear-to-r from-brand-600 to-brand-500 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
              Bloogie
            </span>
            <span className="text-xs text-gray-500">
              Create, share, and explore blogs.
            </span>
          </div>
        </div>
        <span className="text-sm text-gray-500">
          © 2026 Bloogie. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
