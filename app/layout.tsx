import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Ariunzaya Batbold — AI Product Manager & Builder',
  description: 'Portfolio of Ariunzaya Batbold. AI Product Manager, Columbia MBA × MS AI, builder at the intersection of AI, user needs, and underserved markets.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon-16x16.png',
      },
      {
        url: '/favicon-32x32.png',
      },
      {
        url: '/favicon.ico',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
