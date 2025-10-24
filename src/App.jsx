import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ImpactSections from "./components/ImpactSections";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-white text-black px-3 py-2 rounded shadow"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <ImpactSections />
      </main>
      <Footer />
    </div>
  );
}

export default App;
