'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function RoleProtected({ children, allowedRole }) {
  const { user, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      toast.error('Please login to access this page')
      router.push('/login')
      return
    }

    if (role !== allowedRole) {
      toast.error('You are not authorized to access this page')
      router.push('/')
      return
    }
  }, [user, role, router, allowedRole])

  if (!user || role !== allowedRole) {
    return null
  }

  return children
}