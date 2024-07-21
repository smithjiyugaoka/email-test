import { useState, useEffect } from 'react';
import Head from 'next/head';

const factors = [
  { id: 'salary', name: 'Salary' },
  { id: 'remoteWork', name: 'Remote Work' },
  { id: 'workLifeBalance', name: 'Work-Life Balance' },
  { id: 'innovation', name: 'Innovation' },
  { id: 'careerStability', name: 'Career Stability' },
  { id: 'benefits', name: 'Benefits' },
  { id: 'companyReputation', name: 'Company Reputation' },
  { id: 'professionalDevelopment', name: 'Professional Development' },
  { id: 'teamDynamics', name: 'Team Dynamics' },
  { id: 'companyMission', name: 'Company Mission' },
];

export default function Home() {
  const [userFactors, setUserFactors] = useState(
    Object.fromEntries(factors.map(factor => [factor.id, 5]))
  );
  const [email, setEmail] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  const handleFactorChange = (id, value) => {
    setUserFactors(prev => ({ ...prev, [id]: parseInt(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate API call
    const mockResults = [
      'Company A', 'Company B', 'Company C', 'Company D', 'Company E'
    ];
    setResults(mockResults);
    setShowResults(true);
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    // Implement email submission logic here
    alert(`Top 5 matches sent to ${email}`);
  };

  useEffect(() => {
    // Update range input values
    factors.forEach(factor => {
      const valueSpan = document.getElementById(`${factor.id}Value`);
      if (valueSpan) {
        valueSpan.textContent = userFactors[factor.id];
      }
    });
  }, [userFactors]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Company Matcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl font-bold mb-8">Company Matcher</h1>
        
        {!showResults ? (
          <form onSubmit={handleSubmit} className="max-w-md">
            {factors.map(factor => (
              <div key={factor.id} className="mb-4">
                <label htmlFor={factor.id} className="block text-sm font-medium text-gray-700">
                  {factor.name}: <span id={`${factor.id}Value`}>{userFactors[factor.id]}</span>
                </label>
                <input
                  type="range"
                  id={factor.id}
                  name={factor.id}
                  min="1"
                  max="10"
                  value={userFactors[factor.id]}
                  onChange={(e) => handleFactorChange(factor.id, e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Find Matches
            </button>
          </form>
        ) : (
          <div id="results">
            <h2 className="text-2xl font-bold mb-4">Your Matches</h2>
            {results.slice(3).map((company, index) => (
              <div key={company} className="mb-2">
                <h3 className="font-semibold">{index + 4}. {company}</h3>
              </div>
            ))}
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Top 3 Matches (Blurred)</h3>
              {results.slice(0, 3).map((company, index) => (
                <div key={company} className="mb-2 blur-sm">
                  <h3 className="font-semibold">{index + 1}. {company}</h3>
                </div>
              ))}
            </div>
            <form id="emailForm" onSubmit={handleUnlock} className="mt-4">
              <input
                type="email"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to unlock top matches"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Unlock Top Matches
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}