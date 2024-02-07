import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
