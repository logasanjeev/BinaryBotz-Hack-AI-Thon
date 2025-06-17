import { Inter } from 'next/font/google'
import "../globals.css"
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/context/AuthContext'

// Configure Inter font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'SBI Healthcare',
  description: 'Healthcare Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthProvider>
          <Navbar className="h-1/10"/>
          <div className="h-9/10">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}