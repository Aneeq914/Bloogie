import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-brand-50/60 via-white to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />
      <section className="relative mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          Welcome to Bloogie
        </span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Explore our{" "}
          <span className="bg-linear-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
            blogs
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
          A place where writers share their thoughts, experiences, and knowledge
          — from technology and programming to tips, tutorials, and personal
          insights. Whether you&apos;re here to learn something new or simply
          explore different ideas, dive in below.
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-brand-600">
          <span>Browse the latest posts</span>
          <span aria-hidden className="animate-bounce">
            ↓
          </span>
        </div>
      </section>
    </div>
  );
};

export default Hero;
