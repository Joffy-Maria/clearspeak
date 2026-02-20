import './globals.css'
import { Inter, Great_Vibes } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cursive'
})

export const metadata: Metadata = {
  title: 'ClearSpeak — Communication Without Barriers',
  description: 'Assistive communication web app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${greatVibes.variable}`}>
        {children}
      </body>
    </html>
  )
}