import { ServerClient } from 'postmark';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, factors } = req.body;
    const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

    // Match companies
    const matches = matchCompanies(factors).slice(0, 5);

    const emailBody = `
      Thank you for using Company Matcher!
      
      Here are your top 5 company matches based on your preferences:
      
      ${matches.map((match, index) => `${index + 1}. ${match.name}`).join('\n')}
      
      We hope this information helps in your job search!
    `;

    try {
      const response = await client.sendEmail({
        From: 'noreply@companymatcher.com',
        To: email,
        Subject: 'Your Top 5 Company Matches',
        TextBody: emailBody,
      });

      console.log('Email sent successfully:', response);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function matchCompanies(userFactors) {
  // ... (same implementation as in match-companies.js)
}