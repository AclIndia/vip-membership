/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SendMailButton() {
  const [isSending, setIsSending] = useState(false)

  const sendMailToAllMembers = async () => {
    setIsSending(true)
    try {
      const response = await fetch('/api/send-all', { method: 'POST' })
      const data = await response.json()
      if (data.success) {
        toast.success('Emails sent successfully!')
      } else {
        toast.error('Failed to send emails')
      }
    } catch (error : any) {
      toast.error('An error occurred while sending emails')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <button
        onClick={sendMailToAllMembers}
        disabled={isSending}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {isSending ? 'Sending...' : 'Send Mail to All Members'}
      </button>
      <ToastContainer />
    </>
  )
}

