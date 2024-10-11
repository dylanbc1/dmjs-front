import { NextApiRequest, NextApiResponse } from 'next';
const brevo = require('@getbrevo/brevo');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    
    let apiInstance = new brevo.TransactionalEmailsApi();
    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.NEXT_PUBLIC_BREVO_API;

    let sendSmtpEmail = new brevo.SendSmtpEmail({
      subject: "Feedback Received",
      htmlContent: `
        <html>
          <body>
            <h1>Feedback from ${name}</h1>
            <p>${message}</p>
          </body>
        </html>
      `,
      sender: { "name": "DMajorStore", "email": "noreply@dmajorstore.online"},
      to: [{ "email": "support@dmajorstore.online", "name": "DMajorStore Support" }],
      replyTo: { "email": email, "name": name },
    });

    try {
      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
