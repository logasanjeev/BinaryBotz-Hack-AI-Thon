"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/AuthContext'
import { auth } from '@/lib/firebase'
import { toast } from 'sonner'

export default function Navbar() {
  const { user, role } = useAuth()

  const handleLogout = async () => {
    try {
      await auth.signOut()
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Error logging out')
    }
  }

  return (
    <nav className="border-b bg-white">
      <div className="container flex items-center justify-between h-[10vh]">
        <Link href="/" className="font-bold text-xl">
          SBI Life Insurance
        </Link>

        <div className="space-x-4">
          {user ? (
            <>
              {role === 'client' && (
                <Button variant="ghost" asChild>
                  <Link href="/client-submit">Submit</Link>
                </Button>
              )}
              {role === 'hospital' && (
                <Button variant="ghost" asChild>
                  <Link href="/hospital-process">Process</Link>
                </Button>
              )}
              {role === 'admin' && (
                <Button variant="ghost" asChild>
                  <Link href="/admin-check">Check</Link>
                </Button>
              )}
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}