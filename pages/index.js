import { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [message, setMessage] = useState('');
  const [showResults, setShowResults] = useState(false);

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
        setShowResults(true);
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
        body: JSON.stringify({ email, factors: userFactors }),
      });

      if (response.ok) {
        setMessage('Top 5 matches sent to your email!');
      } else {
        setMessage('Failed to send email. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Head>
        <title>Company Matcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-lg mx-auto p-6">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="factors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-3xl font-bold mb-8">Company Matcher</h1>
              <form onSubmit={handleSubmit}>
                {factors.map(factor => (
                  <div key={factor.id} className="mb-6">
                    <label htmlFor={factor.id} className="block text-sm font-medium mb-2">
                      {factor.name}: {userFactors[factor.id]}
                    </label>
                    <input
                      type="range"
                      id={factor.id}
                      min="1"
                      max="10"
                      value={userFactors[factor.id]}
                      onChange={(e) => handleFactorChange(factor.id, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
                >
                  Find Matches
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">Your Top Matches</h2>
              <p className="mb-4">We've found your top 5 company matches based on your preferences.</p>
              <form onSubmit={handleUnlock} className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition duration-200"
                >
                  Get My Top 5 Matches
                </button>
              </form>
              {message && <p className="text-center text-sm text-gray-600">{message}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}