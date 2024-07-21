import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const factors = [
  "Salary",
  "Remote Work",
  "Work-Life Balance",
  "Innovation",
  "Career Stability",
  "Professional Development",
  "Company Culture",
  "Benefits Package",
  "Job Security",
  "Social Responsibility"
];

const companies = [
  "Johnson & Johnson",
  "Pfizer",
  "Roche",
  "Novartis",
  "Merck",
  "GlaxoSmithKline",
  "Sanofi",
  "AbbVie",
  "AstraZeneca",
  "Gilead Sciences"
];

export default function Home() {
  const [ratings, setRatings] = useState({});
  const router = useRouter();

  const handleRatingChange = (factor, value) => {
    setRatings({ ...ratings, [factor]: parseInt(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/match-companies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ratings),
    });
    const data = await response.json();
    router.push({
      pathname: '/results',
      query: { matches: JSON.stringify(data.matches) },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Company Match | Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Rate Your Career Priorities</h1>
        <form onSubmit={handleSubmit}>
          {factors.map((factor) => (
            <div key={factor} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{factor}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={ratings[factor] || 5}
                onChange={(e) => handleRatingChange(factor, e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1</span>
                <span>{ratings[factor] || 5}</span>
                <span>10</span>
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Find My Best Matches
          </button>
        </form>
      </main>
    </div>
  );
}