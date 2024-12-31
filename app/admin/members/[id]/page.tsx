import { members } from '@/data'
import { notFound } from 'next/navigation'

export default async function MemberDetails({ params }: { params: Promise<{ id: string }> }) {

  const id = (await params).id;

  const member = members.find(m => m.id === (id))

  if (!member) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Member Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <p className="text-gray-900">{member.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
          <p className="text-gray-900">{member.companyName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">GSTIN</label>
          <p className="text-gray-900">{member.gstin}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Total Orders</label>
          <p className="text-gray-900">{member.totalOrders}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Total Saving</label>
          <p className="text-gray-900">${member.totalSaving}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Membership Expiry</label>
          <p className="text-gray-900">{member.membershipExpiry}</p>
        </div>
      </div>
    </div>
  )
}

