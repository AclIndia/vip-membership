/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { members } from '@/data'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

type Member={
  id : string;
  name: string,
  gstin: string,
  companyName: string,
  totalOrders: number,
  totalSaving: number,
  membershipExpiry: string,
  email : string
}

export async function POST() {
  try {
    const messages = members.map((member: Member) => ({
      to: member.email,
      from: {
        email: 'support@aclindia.co',
        name: 'Ambica Corporation Limited'
      },
      templateId: 'd-58d4754ac066420d89425468d6e333c2',
      dynamicTemplateData: {
        id : member.id,
        name: member.name,
        gstin: member.gstin,
        companyName: member.companyName,
        totalOrders: member.totalOrders,
        totalSaving: member.totalSaving.toFixed(2),
        membershipExpiry: member.membershipExpiry,
      }
    }))

    await sgMail.send(messages)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

