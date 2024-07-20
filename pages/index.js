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
  const [results, setResults] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFactorChange = (id, value) => {
    setUserFactors(prev => ({ ...prev, [id]: parseInt(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/match-companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userFactors),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        setMessage('Failed to match companies. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subject: 'Your Company Matches',
          body: `Here are your top company matches:\n\n${results.topMatches.map((match, index) => `${index + 1}. ${match.name}`).join('\n')}`,
        }),
      });

      if (response.ok) {
        setMessage('Top matches sent to your email!');
        setResults(prev => ({ ...prev, unlocked: true }));
      } else {
        setMessage('Failed to send email. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Company Matcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl font-bold mb-8">Company Matcher</h1>
        <form onSubmit={handleSubmit} className="max-w-md mb-8">
          {factors.map(factor => (
            <div key={factor.id} className="mb-4">
              <label htmlFor={factor.id} className="block text-sm font-medium text-gray-700">
                {factor.name}: {userFactors[factor.id]}
              </label>
              <input
                type="range"
                id={factor.id}
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

        {results && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Matches</h2>
            {results.visibleMatches.map((match, index) => (
              <div key={match.name} className="mb-2 p-2 bg-gray-100 rounded">
                <h3 className="font-semibold">{index + 4}. {match.name}</h3>
              </div>
            ))}
            {!results.unlocked && (
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Top 3 Matches (Blurred)</h3>
                {results.topMatches.map((match, index) => (
                  <div key={match.name} className="mb-2 p-2 bg-gray-100 rounded filter blur-sm">
                    <h3 className="font-semibold">{index + 1}. {match.name}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {results && !results.unlocked && (
          <form onSubmit={handleUnlock} className="max-w-md">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Enter your email to unlock top matches
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Unlock Top Matches
            </button>
          </form>
        )}

        {message && <p className="mt-4 text-lg">{message}</p>}
      </main>
    </div>
  );
}