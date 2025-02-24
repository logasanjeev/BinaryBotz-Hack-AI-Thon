'use client'

import RoleProtected from '@/components/RoleProtected'
import { useRouter } from 'next/navigation'

export default function GroupDeathClaimPage() {
  const router = useRouter()

  return (
    <RoleProtected allowedRole="client">
      <div className="container py-10">
        <button 
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          ← Back
        </button>
        
        <h1 className="text-2xl font-bold mb-6">Group Death Claim</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Add your form content here */}
          <p>Group Death Claim form will go here</p>
        </div>
      </div>
    </RoleProtected>
  )
}