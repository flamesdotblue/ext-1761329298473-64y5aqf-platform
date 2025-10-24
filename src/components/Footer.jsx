import React, { useState } from "react";

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-8 w-8 rounded bg-red-700 text-white font-extrabold grid place-items-center">🌍</span>
              <span className="font-extrabold text-gray-900">HeatUp Action</span>
            </div>
            <p className="mt-3 text-sm text-gray-700">
              A community initiative raising awareness and accelerating solutions to the climate crisis.
            </p>
            <address className="not-italic mt-4 text-sm text-gray-700">
              Contact: <a href="mailto:hello@heatupaction.org" className="text-red-700 underline underline-offset-4 hover:text-red-800">hello@heatupaction.org</a>
            </address>
            <div className="mt-3 flex gap-4 text-sm">
              <a href="#" className="text-red-700 hover:text-red-800 underline underline-offset-4">Twitter</a>
              <a href="#" className="text-red-700 hover:text-red-800 underline underline-offset-4">Instagram</a>
              <a href="#" className="text-red-700 hover:text-red-800 underline underline-offset-4">LinkedIn</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Quick links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="text-gray-700 hover:underline hover:text-red-700" href="#learn">Learn</a></li>
              <li><a className="text-gray-700 hover:underline hover:text-red-700" href="#data">Data</a></li>
              <li><a className="text-gray-700 hover:underline hover:text-red-700" href="#tips">Act</a></li>
              <li><a className="text-gray-700 hover:underline hover:text-red-700" href="#blog">Blog</a></li>
              <li><a className="text-gray-700 hover:underline hover:text-red-700" href="#pledge">Pledge</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Newsletter</h3>
            <p className="mt-2 text-sm text-gray-700">Get monthly updates on progress and ways to help.</p>
            {submitted ? (
              <div role="status" className="mt-3 rounded bg-green-50 p-3 text-green-900">
                Thanks for subscribing. Please check your email.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="mt-3 flex flex-col sm:flex-row gap-2"
                aria-label="Newsletter signup"
              >
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  className="w-full rounded-md border-gray-300 focus:border-red-600 focus:ring-red-600"
                  placeholder="you@example.com"
                  aria-required="true"
                />
                <button type="submit" className="inline-flex items-center rounded bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} HeatUp Action. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
