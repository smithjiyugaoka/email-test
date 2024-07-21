import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Results() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { matches } = router.query;
  const parsedMatches = matches ? JSON.parse(matches) : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        subject: 'Your Top Company Matches',
        body: `Here are your top 5 company matches:\n\n${parsedMatches.map((match, index) => `${index + 1}. ${match.name}`).join('\n')}`,
      }),
    });
    if (response.ok) {
      setEmailSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Your Matches | Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Company Matches</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {parsedMatches.slice(3, 5).map((match, index) => (
              <li key={match.name} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{match.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Match {5 - index}
                    </p>
                  </div>
                </div>
              </li>
            ))}
            {parsedMatches.slice(0, 3).map((match, index) => (
              <li key={match.name} className="px-4 py-4 sm:px-6 filter blur-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">Top Match {3 - index}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Locked
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {!emailSent ? (
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex items-center border-b border-indigo-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="email"
                placeholder="Enter your email to unlock all matches"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Unlock
              </button>
            </div>
          </form>
        ) : (
          <p className="mt-8 text-green-600 font-semibold">Email sent! Check your inbox for all matches.</p>
        )}
      </main>
    </div>
  );
}