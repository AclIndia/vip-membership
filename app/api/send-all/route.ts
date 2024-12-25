/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { members } from '@/data'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function POST() {
  try {
    const messages = members.map((member: any) => ({
      to: member.email,
      from: {
        email: 'office9@aclindia.co',
        name: 'Ambica Corporation Limited'  // This is the custom name that will appear
      },
      subject: `Important Update for ${member.name}`,
      templateId: 'd-cd5c8778e0064cbd9c415c058df61351',
      dynamicTemplateData: {
        name: member.name,
        gstin: member.gstin,
        companyName: member.companyName,
        totalOrders: member.totalOrders,
        totalSaving: member.totalSaving.toFixed(2),
        membershipExpiry: member.membershipExpiry,
        subject: `Important Update for ${member.name}`
      }
    }))

    await sgMail.send(messages)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

