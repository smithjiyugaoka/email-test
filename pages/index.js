import { useState } from 'react';
import Head from 'next/head';

export default function Results() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement email submission and results sending logic here
    alert('Top 5 matches sent to your email!');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Head>
        <title>Your Matches - Company Matcher</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="max-w-lg mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Company Matcher</h1>
        
        <h2 className="text-2xl font-semibold mb-4">Your Top Matches</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Visible Matches:</h3>
          <ul className="list-disc list-inside">
            <li>5. Company E</li>
            <li>4. Company D</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Top 3 Matches (Blurred):</h3>
          <ul className="list-disc list-inside blur-sm select-none">
            <li>1. Company A</li>
            <li>2. Company B</li>
            <li>3. Company C</li>
          </ul>
        </div>

        <p className="mb-4">Enter your email to unlock the top 3 matches</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
          >
            Get My Top 5 Matches
          </button>
        </form>
      </main>
    </div>
  );
}