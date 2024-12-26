/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import prismadb from "@/lib/prismadb";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email, memberName, gstin, plan, price } = await req.json();

    if (!email || !memberName || !gstin || !plan || !price) {
      return NextResponse.json(
        { success: false, message: "Invalid input data" },
        { status: 400 }
      );
    }
    

    await prismadb.renwalOption.create({
      data: {
        memberName,
        gstin,
        plan,
        price,
      },
    });

    const msg1 = {
      to: email,
      from: {
        email: "office9@aclindia.co",
        name: "Ambica Corporation Limited", // This is the custom name that will appear
      },
      templateId: "d-58d4754ac066420d89425468d6e333c2",
    };

    console.log("Message payload:", msg1);
 
    await sgMail.send(msg1);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
