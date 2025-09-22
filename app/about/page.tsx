import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Trendora",
  description:
    "Discover Trendora — a modern ecommerce brand based in Bashundhara R/A, delivering curated products, seamless shopping, and real-time order updates.",
};

//export const dynamic = "error"; 

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-28 md:pb-20">
          <span className="inline-block rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs uppercase tracking-wider text-neutral-300">
            About Trendora
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Elevating everyday essentials with style and precision
          </h1>
          <p className="mt-6 max-w-2xl text-neutral-300">
            Trendora is a modern ecommerce destination curating products that
            blend design, quality, and value—built for a seamless shopping
            experience from browse to delivery. Based in Bashundhara R/A, we’re
            committed to reliability, transparency, and customer delight.
          </p>
        </div>

        {/* Subtle gradient accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_circle_at_20%_20%,rgba(99,102,241,0.15),transparent_60%),radial-gradient(600px_circle_at_80%_0%,rgba(244,63,94,0.12),transparent_60%)]"
        />
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h3 className="text-lg font-medium">Curated Selection</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Every item at Trendora is vetted for craft, utility, and value, so
              customers can shop confidently without the noise.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h3 className="text-lg font-medium">Seamless Experience</h3>
            <p className="mt-2 text-sm text-neutral-300">
              From fast page loads to intuitive navigation and secure checkout,
              the experience is built to feel effortless end‑to‑end.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h3 className="text-lg font-medium">Real‑Time Updates</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Order events stream live, keeping customers informed from creation
              to delivery with timely notifications.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="mt-4 text-neutral-300">
              Trendora began with a simple belief: great products and a great
              experience shouldn’t be mutually exclusive. We partner with trusted
              suppliers, prioritize quality control, and continuously refine the
              catalog based on real customer feedback.
            </p>
            <p className="mt-4 text-neutral-300">
              Rooted in Bashundhara R/A, we’re close to the community we serve,
              enabling responsive support, faster fulfillment, and a brand ethos
              that values trust as much as trend.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h3 className="text-lg font-medium">What sets us apart</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-400" />
                Curated catalog: fewer, better products customers actually love.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-400" />
                Thoughtful UX: clear product pages, transparent pricing, and secure checkout.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                Real‑time order notifications to reduce uncertainty and support trust.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                Local roots with a customer‑first support culture.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Metrics / Social Proof (static placeholders for SSG) */}
      <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center">
            <div className="text-3xl font-semibold">5k+</div>
            <div className="mt-2 text-sm text-neutral-400">Orders delivered</div>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center">
            <div className="text-3xl font-semibold">1–3 days</div>
            <div className="mt-2 text-sm text-neutral-400">Avg. fulfillment</div>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center">
            <div className="text-3xl font-semibold">4.8/5</div>
            <div className="mt-2 text-sm text-neutral-400">Customer rating</div>
          </div>
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          Metrics are illustrative and can be replaced with real values.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-semibold">Experience Trendora</h3>
            <p className="mt-2 text-neutral-300">
              Explore the latest arrivals and discover essentials designed to
              elevate the everyday.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            >
              Shop now
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-100 transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-700/40"
            >
              Contact
            </Link>
          </div>
        </div>
        <footer className="mt-10 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Trendora. All rights reserved.
        </footer>
      </section>
    </main>
  );
}
