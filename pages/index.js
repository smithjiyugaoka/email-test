import { useState } from 'react';
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

  const handleFactorChange = (id, value) => {
    setUserFactors(prev => ({ ...prev, [id]: parseInt(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowResults(true);
    // Implement API call here
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    // Implement email submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Head>
        <title>Company Matcher</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="max-w-3xl mx-auto p-6 sm:p-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Company Matcher</h1>
        
        {!showResults ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {factors.map(factor => (
              <div key={factor.id} className="flex flex-col sm:flex-row sm:items-center">
                <label htmlFor={factor.id} className="w-full sm:w-1/3 text-sm font-medium mb-2 sm:mb-0">
                  {factor.name}: {userFactors[factor.id]}
                </label>
                <input
                  type="range"
                  id={factor.id}
                  min="1"
                  max="10"
                  value={userFactors[factor.id]}
                  onChange={(e) => handleFactorChange(factor.id, e.target.value)}
                  className="w-full sm:w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-200 text-lg"
            >
              Find Matches
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Your Top Matches</h2>
            <p className="text-center">We've found your top 5 company matches based on your preferences.</p>
            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition duration-200 text-lg"
              >
                Get My Top 5 Matches
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}