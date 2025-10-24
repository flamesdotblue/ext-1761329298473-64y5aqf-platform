import React, { useMemo, useState } from "react";

function SectionHeader({ id, eyebrow, title, description }) {
  return (
    <header className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wider text-red-700" id={`${id}-eyebrow`}>
        {eyebrow}
      </p>
      <h2 id={id} className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-gray-700" aria-describedby={`${id}-eyebrow`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}

function Card({ title, children, icon, as: Tag = "div" }) {
  return (
    <Tag className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm focus-within:ring-2 focus-within:ring-red-600">
      <div className="flex items-start gap-3">
        <div aria-hidden className="text-2xl">{icon}</div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <div className="mt-2 text-gray-700 text-sm sm:text-base">{children}</div>
        </div>
      </div>
    </Tag>
  );
}

function TemperatureChart() {
  // Simple mock line chart showing rising anomaly
  const data = useMemo(
    () => [
      -0.2, -0.1, -0.05, 0.0, 0.1, 0.12, 0.18, 0.24, 0.32, 0.45, 0.6, 0.9, 1.1,
    ],
    []
  );
  const width = 640;
  const height = 240;
  const padding = 32;
  const xStep = (width - padding * 2) / (data.length - 1);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const y = (v) => {
    const t = (v - min) / (max - min || 1);
    return height - padding - t * (height - padding * 2);
  };
  const points = data.map((v, i) => `${padding + i * xStep},${y(v)}`).join(" ");

  return (
    <figure aria-labelledby="temp-title" aria-describedby="temp-desc" className="w-full">
      <figcaption id="temp-title" className="sr-only">Global temperature anomaly over time</figcaption>
      <svg
        role="img"
        viewBox={`0 0 ${width} ${height}`}
        className="h-56 w-full"
        aria-label="Line chart showing rising global temperature anomalies from below zero to over 1 degree"
      >
        <defs>
          <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={width} height={height} fill="#fff" />
        <polyline
          points={points}
          fill="none"
          stroke="#dc2626"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polygon
          points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
          fill="url(#grad)"
          opacity="0.4"
        />
        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e5e7eb" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e5e7eb" />
      </svg>
      <p id="temp-desc" className="mt-2 text-sm text-gray-600">
        The trend shows a clear rise in global temperature anomalies, now exceeding 1°C above pre-industrial levels.
      </p>
    </figure>
  );
}

function SeaLevelChart() {
  const data = useMemo(() => [0, 5, 10, 15, 22, 30, 40, 52, 65, 80], []); // mm since 1993
  const width = 640;
  const height = 240;
  const padding = 32;
  const xStep = (width - padding * 2) / (data.length - 1);
  const max = Math.max(...data);
  const y = (v) => height - padding - (v / max) * (height - padding * 2);
  const path = data
    .map((v, i) => `${i === 0 ? "M" : "L"}${padding + i * xStep} ${y(v)}`)
    .join(" ");

  return (
    <figure aria-labelledby="sea-title" aria-describedby="sea-desc" className="w-full">
      <figcaption id="sea-title" className="sr-only">Global sea level rise since 1993</figcaption>
      <svg
        role="img"
        viewBox={`0 0 ${width} ${height}`}
        className="h-56 w-full"
        aria-label="Area chart showing accelerating global sea level rise in millimeters since 1993"
      >
        <defs>
          <linearGradient id="ocean" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={width} height={height} fill="#fff" />
        <path d={path} fill="none" stroke="#1d4ed8" strokeWidth="3" />
        <path d={`${path} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`} fill="url(#ocean)" opacity="0.4" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e5e7eb" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e5e7eb" />
      </svg>
      <p id="sea-desc" className="mt-2 text-sm text-gray-600">
        Satellite and tide gauge data reveal steadily rising seas, increasing flood and storm surge risks worldwide.
      </p>
    </figure>
  );
}

function Tips() {
  const items = [
    { t: "Switch to LED lighting and efficient appliances." },
    { t: "Reduce car trips: walk, bike, or take transit when possible." },
    { t: "Eat more plant-based meals and cut food waste." },
    { t: "Lower your thermostat 1–2°C and insulate your home." },
    { t: "Choose renewable electricity where available." },
    { t: "Fly less and offset unavoidable travel." },
  ];
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <span aria-hidden className="text-green-700">✔️</span>
          <span className="text-gray-800">{item.t}</span>
        </li>
      ))}
    </ul>
  );
}

function CarbonCalculator() {
  const [inputs, setInputs] = useState({ milesPerWeek: 50, kwhPerMonth: 300, flightsPerYear: 2, diet: "average" });
  const [result, setResult] = useState(null);

  const factors = {
    carTonPerMile: 0.000404,
    kwhTon: 0.0004,
    flightTonEach: 0.3,
    dietTon: { heavy: 1.5, average: 1.0, vegetarian: 0.8, vegan: 0.6 },
  };

  function calculate(e) {
    e?.preventDefault?.();
    const miles = Number(inputs.milesPerWeek) || 0;
    const kwh = Number(inputs.kwhPerMonth) || 0;
    const flights = Number(inputs.flightsPerYear) || 0;
    const diet = factors.dietTon[inputs.diet] ?? 1.0;

    const car = miles * 52 * factors.carTonPerMile;
    const electricity = kwh * 12 * factors.kwhTon;
    const air = flights * factors.flightTonEach;

    const total = car + electricity + air + diet;
    setResult({ total: Number(total.toFixed(2)), car, electricity, air, diet });
  }

  return (
    <section aria-labelledby="calc-title" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 id="calc-title" className="text-xl font-bold text-gray-900">Estimate your annual carbon footprint</h3>
      <p className="mt-1 text-sm text-gray-600">This quick estimate uses typical emission factors and is for educational purposes.</p>
      <form onSubmit={calculate} className="mt-4 grid gap-4 sm:grid-cols-2" aria-describedby="calc-title">
        <div>
          <label htmlFor="miles" className="block text-sm font-medium text-gray-900">Car miles per week</label>
          <input
            id="miles"
            type="number"
            min="0"
            value={inputs.milesPerWeek}
            onChange={(e) => setInputs({ ...inputs, milesPerWeek: e.target.value })}
            className="mt-1 w-full rounded-md border-gray-300 focus:border-red-600 focus:ring-red-600"
            inputMode="decimal"
          />
        </div>
        <div>
          <label htmlFor="kwh" className="block text-sm font-medium text-gray-900">Electricity use (kWh per month)</label>
          <input
            id="kwh"
            type="number"
            min="0"
            value={inputs.kwhPerMonth}
            onChange={(e) => setInputs({ ...inputs, kwhPerMonth: e.target.value })}
            className="mt-1 w-full rounded-md border-gray-300 focus:border-red-600 focus:ring-red-600"
            inputMode="decimal"
          />
        </div>
        <div>
          <label htmlFor="flights" className="block text-sm font-medium text-gray-900">Flights per year</label>
          <input
            id="flights"
            type="number"
            min="0"
            value={inputs.flightsPerYear}
            onChange={(e) => setInputs({ ...inputs, flightsPerYear: e.target.value })}
            className="mt-1 w-full rounded-md border-gray-300 focus:border-red-600 focus:ring-red-600"
            inputMode="numeric"
          />
        </div>
        <div>
          <label htmlFor="diet" className="block text-sm font-medium text-gray-900">Diet</label>
          <select
            id="diet"
            value={inputs.diet}
            onChange={(e) => setInputs({ ...inputs, diet: e.target.value })}
            className="mt-1 w-full rounded-md border-gray-300 focus:border-red-600 focus:ring-red-600"
          >
            <option value="heavy">High meat</option>
            <option value="average">Average</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center rounded bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            Calculate
          </button>
        </div>
      </form>
      <div className="mt-4" aria-live="polite">
        {result ? (
          <div className="rounded-lg bg-red-50 p-4 text-red-900">
            <p className="font-semibold">Estimated total: {result.total} tons CO₂e / year</p>
            <p className="mt-1 text-sm text-red-900/80">
              Car: {result.car.toFixed(2)} t · Electricity: {result.electricity.toFixed(2)} t · Flights: {result.air.toFixed(2)} t · Diet: {result.diet.toFixed(2)} t
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-600">Enter your info and press Calculate to see your estimate.</p>
        )}
      </div>
    </section>
  );
}

function Pledge() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", actions: { vote: true, reduce: true, share: false } });

  function onSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="pledge" aria-labelledby="pledge-title" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 id="pledge-title" className="text-xl font-bold text-gray-900">Sign the Climate Action Pledge</h3>
      <p className="mt-1 text-sm text-gray-600">Join thousands committing to practical steps and civic engagement.</p>
      {submitted ? (
        <div role="status" className="mt-4 rounded-lg bg-green-50 p-4 text-green-900">
          <p className="font-semibold">Thank you for taking the pledge!</p>
          <p className="text-sm">Check your inbox for a confirmation email with next steps.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">Full name</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-md border-gray-300 focus:border-red-600 focus:ring-red-600"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-md border-gray-300 focus:border-red-600 focus:ring-red-600"
            />
          </div>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium text-gray-900">I pledge to</legend>
            <div className="mt-2 space-y-2" role="group" aria-label="Pledge actions">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.actions.vote}
                  onChange={(e) => setForm({ ...form, actions: { ...form.actions, vote: e.target.checked } })}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                />
                <span>Vote for climate-forward policies and leaders</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.actions.reduce}
                  onChange={(e) => setForm({ ...form, actions: { ...form.actions, reduce: e.target.checked } })}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                />
                <span>Reduce my personal emissions by 20% this year</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.actions.share}
                  onChange={(e) => setForm({ ...form, actions: { ...form.actions, share: e.target.checked } })}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                />
                <span>Share facts and resources with friends</span>
              </label>
            </div>
          </fieldset>
          <div className="sm:col-span-2 flex items-center gap-3">
            <button type="submit" className="inline-flex items-center rounded bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
              Sign the pledge
            </button>
            <a id="donate" href="#" className="text-sm font-semibold text-red-700 underline underline-offset-4 hover:text-red-800">Prefer to donate? Support trusted climate orgs</a>
          </div>
        </form>
      )}
    </section>
  );
}

export default function ImpactSections() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Learn */}
      <section id="learn" aria-labelledby="learn-title" className="py-16 sm:py-20">
        <SectionHeader
          id="learn-title"
          eyebrow="Understand the crisis"
          title="Global warming: causes and effects"
          description="Burning fossil fuels, deforestation, and industrial processes increase greenhouse gases, trapping heat. The impacts are already here—more extreme heat, stronger storms, melting ice, and rising seas."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card title="Main drivers" icon={<span role="img" aria-label="factory">🏭</span>}>
            Carbon dioxide from coal, oil, and gas is the largest source of warming. Methane leaks from energy, agriculture, and waste add potent short-term heat. Land-use change reduces the planet's natural carbon sinks.
          </Card>
          <Card title="Why it matters" icon={<span role="img" aria-label="thermometer">🌡️</span>}>
            Warming increases heat illness, crop stress, wildfire risk, and damages infrastructure. Vulnerable communities face the greatest risks despite contributing least to the problem.
          </Card>
          <Card title="Solutions at scale" icon={<span role="img" aria-label="wind turbine">🌬️</span>}>
            Rapidly scaling clean power, electrifying transport, efficient buildings and industry, protecting forests, and climate-smart agriculture can cut emissions this decade.
          </Card>
          <Card title="Your role" icon={<span role="img" aria-label="megaphone">📣</span>}>
            Personal choices plus civic action multiply impact: vote, support policy, shift purchases, and talk about climate solutions.
          </Card>
        </div>
      </section>

      {/* Data */}
      <section id="data" aria-labelledby="data-title" className="py-16 sm:py-20 border-t border-gray-200">
        <SectionHeader
          id="data-title"
          eyebrow="The evidence"
          title="The planet is heating up and seas are rising"
          description="Independent datasets confirm a clear warming trend and accelerating sea level rise."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <TemperatureChart />
          <SeaLevelChart />
        </div>
      </section>

      {/* Tips + Calculator */}
      <section id="tips" aria-labelledby="tips-title" className="py-16 sm:py-20 border-t border-gray-200">
        <SectionHeader
          id="tips-title"
          eyebrow="Take action"
          title="Practical ways to cut your carbon footprint"
          description="Start with what you control, then use your voice and vote to unlock bigger systems change."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Tips />
          <CarbonCalculator />
        </div>
      </section>

      {/* Pledge */}
      <section aria-labelledby="pledge-section-title" className="py-16 sm:py-20 border-t border-gray-200">
        <SectionHeader
          id="pledge-section-title"
          eyebrow="Commit"
          title="Make your commitment to climate action"
          description="Pledges build momentum and signal demand for bold solutions."
        />
        <div className="mt-8">
          <Pledge />
        </div>
      </section>

      {/* Blog */}
      <section id="blog" aria-labelledby="blog-title" className="py-16 sm:py-20 border-t border-gray-200">
        <SectionHeader
          id="blog-title"
          eyebrow="Stay informed"
          title="Latest climate news and solutions"
          description="Explore explainers and stories on technology, policy, and community action."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop"
              alt="Solar panels under a blue sky"
              className="h-44 w-full rounded-t-lg object-cover"
            />
            <div className="p-5">
              <h3 className="font-semibold text-gray-900">Solar and wind break new records</h3>
              <p className="mt-2 text-sm text-gray-700">Clean electricity surged last year, helping avoid millions of tons of emissions while lowering costs.</p>
              <a href="#" className="mt-3 inline-flex text-sm font-semibold text-red-700 underline underline-offset-4 hover:text-red-800">Read article</a>
            </div>
          </article>
          <article className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
              alt="Person reading a report with charts"
              className="h-44 w-full rounded-t-lg object-cover"
            />
            <div className="p-5">
              <h3 className="font-semibold text-gray-900">Understanding carbon budgets</h3>
              <p className="mt-2 text-sm text-gray-700">Why the next few years are pivotal to keep 1.5°C within reach and how budgets guide action.</p>
              <a href="#" className="mt-3 inline-flex text-sm font-semibold text-red-700 underline underline-offset-4 hover:text-red-800">Read article</a>
            </div>
          </article>
          <article className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop"
              alt="Community tree planting"
              className="h-44 w-full rounded-t-lg object-cover"
            />
            <div className="p-5">
              <h3 className="font-semibold text-gray-900">Cities leading on climate</h3>
              <p className="mt-2 text-sm text-gray-700">From transit to trees, local action can cut emissions and improve quality of life.</p>
              <a href="#" className="mt-3 inline-flex text-sm font-semibold text-red-700 underline underline-offset-4 hover:text-red-800">Read article</a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
