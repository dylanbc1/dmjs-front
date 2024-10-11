import { NextRequest, NextResponse } from 'next/server';
import * as Brevo from '@getbrevo/brevo';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const apiInstance = new Brevo.TransactionalEmailsApi();
    const apiKey = process.env.BREVO_API_KEY;
    console.log('BREVO_API_KEY:', process.env.BREVO_API_KEY);


    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'API key is not set' }, { status: 500 });
    }

    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h1>${subject}</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </body>
      </html>
    `;
    sendSmtpEmail.sender = { name: 'DMajorStore', email: 'no-reply@dmajorstore.online' };
    sendSmtpEmail.to = [{ email: 'saravalcrdn@gmail.com', name: 'DMajorStore' }]; 

    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      return NextResponse.json({ success: true, data: response });
    } catch (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error parsing request:', error);
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
