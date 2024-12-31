
import { MembersTable } from "@/components/admin/MembersTable";
import SendMailButton from "@/components/admin/SendMailButton";
import { members } from "@/data";


export default function MembersPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <SendMailButton />
      <MembersTable data={members} />
    </div>
  )
}

