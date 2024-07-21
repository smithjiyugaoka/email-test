import { ServerClient } from 'postmark';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, subject, body } = req.body;

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

    try {
      const response = await client.sendEmail({
        From: 'smith@apexkksearch.com',
        To: email,
        Subject: subject,
        TextBody: body,
      });

      console.log('Email sent successfully:', response);
      res.status(200).json({ message: 'Email sent successfully', response });
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({ message: 'Failed to send email', error: error.message, details: error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
