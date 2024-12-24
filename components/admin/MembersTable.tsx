import { members } from '@/data'
import Link from 'next/link'

// Mock data for demonstratio
export default function MembersTable() {
  return (
    <table className="min-w-full bg-white text-black">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Company</th>
          <th className="py-2 px-4 border-b">Total Orders</th>
          <th className="py-2 px-4 border-b">Total Saving</th>
          <th className="py-2 px-4 border-b">Membership Expiry</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={member.id}>
            <td className="py-2 px-4 border-b">{member.name}</td>
            <td className="py-2 px-4 border-b">{member.companyName}</td>
            <td className="py-2 px-4 border-b">{member.totalOrders}</td>
            <td className="py-2 px-4 border-b">${member.totalSaving}</td>
            <td className="py-2 px-4 border-b">{member.membershipExpiry}</td>
            <td className="py-2 px-4 border-b">
              <Link href={`/admin/members/${member.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

