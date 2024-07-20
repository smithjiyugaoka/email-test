import { ServerClient } from 'postmark';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, subject, body } = req.body;

    // Replace 'your-postmark-server-token' with your actual Postmark server token
    const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

    try {
      const response = await client.sendEmail({
        From: 'smith@apexkksearch.com',
        To: email,
        Subject: subject,
        TextBody: body,
      });

      res.status(200).json({ message: 'Email sent successfully', response });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
