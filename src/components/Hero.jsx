import React from "react";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1502301197179-65228ab57f78?q=80&w=1600&auto=format&fit=crop"
          alt="Aerial view of melting ice and ocean symbolizing climate change"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" aria-hidden></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:py-28 lg:py-36 text-white">
        <h1 id="hero-title" className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Act now to slow global warming
        </h1>
        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/90">
          Together we can cut emissions, protect communities, and build a livable future. Learn the facts, reduce your footprint, and add your voice.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="#pledge"
            className="inline-flex items-center justify-center rounded bg-red-600 px-6 py-3 text-base font-semibold text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Take the pledge
          </a>
          <a
            href="#learn"
            className="inline-flex items-center justify-center rounded bg-white px-6 py-3 text-base font-semibold text-red-700 shadow hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}
