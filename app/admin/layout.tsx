/* eslint-disable @next/next/no-html-link-for-pages */
import { Inter } from 'next/font/google'
import "../../app/globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Email Campaign Admin',
  description: 'Admin panel for email campaign application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li><a href="/admin/members" className="hover:text-gray-300">Members</a></li>
            <li><a href="/admin/mails" className="hover:text-gray-300">Sent Mails</a></li>
            <li><a href="/admin/renewal-data" className="hover:text-gray-300">Renewal Data</a></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}

