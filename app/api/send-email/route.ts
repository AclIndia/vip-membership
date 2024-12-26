/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email,to, subject, text, html } = await req.json();

    const msg = {
      to : "office9@aclindia.co", // Recipient email
      from: 'office9@aclindia.co', // Verified sender email
      subject,
      text,
      html, // Optional: HTML content
    };

    const msg1 = {
      to: email,
      from: {
        email: 'office9@aclindia.co',
        name: 'Ambica Corporation Limited'  // This is the custom name that will appear
      },
      templateId: 'd-58d4754ac066420d89425468d6e333c2',
    };

    await sgMail.send(msg);
    await sgMail.send(msg1);

    console.log("Email sent successfully!",await sgMail.send(msg));
    

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
