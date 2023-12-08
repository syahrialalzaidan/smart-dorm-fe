import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Dorm',
  description: 'Your best dormitory management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <ModalProvider />
        {children}
      </body>
    </html>
  )
}
