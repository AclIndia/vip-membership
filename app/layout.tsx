import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ACL VIP Membership",
  description: "VIP Membership portal",
  openGraph: {
    type: "website",
    url: "https://membership.aclindia.co/",
    title: "ACL VIP Membership",
    description: "VIP Membership portal",
    siteName: "Ambica Corporation Limited",
    images: [
      {
        url: "/logo1.png",
        width: 1200,
        height: 630,
        alt: "Ambica Corporation Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACL VIP Membership",
    description: "VIP Membership portal",
    images: ["/logo1.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
