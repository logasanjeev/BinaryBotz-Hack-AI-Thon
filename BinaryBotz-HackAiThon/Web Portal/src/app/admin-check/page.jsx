'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RoleProtected from '@/components/RoleProtected'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const userData = [
  { id: 1, name: "Indhumathi", hospital: "Central Hospital", riskFactor: "high" },
  { id: 2, name: "Saran", hospital: "Memorial Medical Center", riskFactor: "low" },
  { id: 3, name: "Raj", hospital: "St. Mary's Hospital", riskFactor: "medium" },
  { id: 4, name: "Pranav", hospital: "Unity Healthcare", riskFactor: "high" },
  { id: 5, name: "Raja Ram", hospital: "City General Hospital", riskFactor: "low" },
  { id: 6, name: "Naven", hospital: "Regional Medical Center", riskFactor: "medium" },
  { id: 7, name: "Robert", hospital: "Providence Hospital", riskFactor: "high" }
]

const getRiskColor = (risk) => {
  switch (risk) {
    case 'high':
      return 'text-red-500 font-medium'
    case 'medium':
      return 'text-yellow-500 font-medium'
    case 'low':
      return 'text-green-500 font-medium'
    default:
      return ''
  }
}

export default function AdminCheckPage() {
  const [sortOrder, setSortOrder] = useState('none')
  const [filteredRisk, setFilteredRisk] = useState('all')
  const router = useRouter()

  const sortAndFilterData = () => {
    let filtered = [...userData]
    
    if (filteredRisk !== 'all') {
      filtered = filtered.filter(user => user.riskFactor === filteredRisk)
    }

    if (sortOrder !== 'none') {
      filtered.sort((a, b) => {
        const riskValues = { high: 3, medium: 2, low: 1 }
        return sortOrder === 'highToLow'
          ? riskValues[b.riskFactor] - riskValues[a.riskFactor]
          : riskValues[a.riskFactor] - riskValues[b.riskFactor]
      })
    }

    return filtered
  }

  return (
    <RoleProtected allowedRole="admin">
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-6">Admin Check Page</h1>
        
        <div className="flex gap-2 mb-4">
          {['all', 'high', 'medium', 'low'].map(risk => (
            <Button
              key={risk}
              variant="outline"
              size="sm"
              onClick={() => setFilteredRisk(risk)}
              className={filteredRisk === risk ? 'bg-gray-100' : ''}
            >
              {risk === 'all' ? 'All' : `${risk.charAt(0).toUpperCase()}${risk.slice(1)} Risk`}
            </Button>
          ))}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  Risk Factor
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSortOrder('none')}>No Sort</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOrder('highToLow')}>High to Low</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOrder('lowToHigh')}>Low to High</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortAndFilterData().map((user, index) => (
              <TableRow 
                key={user.id} 
                className={`cursor-pointer ${index % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}`}
                onClick={() => router.push('admin-check/final-check')} 
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.hospital}</TableCell>
                <TableCell className={getRiskColor(user.riskFactor)}>
                  {user.riskFactor.charAt(0).toUpperCase() + user.riskFactor.slice(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </RoleProtected>
  )
}
