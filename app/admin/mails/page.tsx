// Mock data for demonstration
const sentMails = [
    { id: 1, subject: 'Welcome to our platform', sentAt: '2023-06-01 10:00:00', recipients: 100 },
    { id: 2, subject: 'Special offer for members', sentAt: '2023-06-05 14:30:00', recipients: 75 },
  ]
  
  export default function SentMailsPage() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Sent Mails</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Sent At</th>
              <th className="py-2 px-4 border-b">Recipients</th>
            </tr>
          </thead>
          <tbody>
            {sentMails.map((mail) => (
              <tr key={mail.id}>
                <td className="py-2 px-4 border-b">{mail.subject}</td>
                <td className="py-2 px-4 border-b">{mail.sentAt}</td>
                <td className="py-2 px-4 border-b">{mail.recipients}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  