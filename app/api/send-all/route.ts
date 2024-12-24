/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { members } from '@/data'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function POST() {
  try {

    const messages = members.map((member: any) => ({
      to: member.email,
      from: 'office9@aclindia.co', // Replace with your verified SendGrid sender
      templateId: 'd-cd5c8778e0064cbd9c415c058df61351', // Replace with your SendGrid dynamic template ID
      dynamicTemplateData: {
        name: member.name,
        gstin : member.gstin,
        companyName: member.companyName,
        totalOrders: member.totalOrders,
        totalSaving: member.totalSaving.toFixed(2),
        membershipExpiry: member.membershipExpiry
      }
    }))

    await sgMail.send(messages)

    // // Log the sent email to the database
    // await prisma.sentMail.create({
    //   data: {
    //     subject: 'Important Update for Members',
    //     sentAt: new Date(),
    //     recipients: members.length
    //   }
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

