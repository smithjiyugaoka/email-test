import { companies } from '../../data/companies';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const userRatings = req.body;

    // Calculate match scores for each company
    const matches = companies.map(company => {
      let score = 0;
      for (const factor in userRatings) {
        score += Math.abs(company.ratings[factor] - userRatings[factor]);
      }
      return { name: company.name, score };
    });

    // Sort matches by score (lower is better)
    matches.sort((a, b) => a.score - b.score);

    // Return top 5 matches
    res.status(200).json({ matches: matches.slice(0, 5) });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}