import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { to, subject, text, html } = await req.json();

    const msg = {
      to, // Recipient email
      from: 'office9@aclindia.co', // Verified sender email
      subject,
      text,
      html, // Optional: HTML content
    };

    await sgMail.send(msg);

    console.log("Email sent successfully!",await sgMail.send(msg));
    

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
