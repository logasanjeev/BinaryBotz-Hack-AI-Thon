"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import RoleProtected from "@/components/RoleProtected"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Hospital, FileText, ChevronRight } from "lucide-react"

export default function HospitalProcessPage() {
  const router = useRouter()

  return (
    <RoleProtected allowedRole="hospital">
      <div className="min-h-screen bg-gray-50">
        <div className="container max-w-4xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-8 text-[#3A1B78]">Hospital Process Dashboard</h1>

          {/* Hospital Section */}
          <div className="bg-white p-6 rounded-lg mb-8 shadow-md border-l-4 border-[#DB044A]">
            <div className="flex items-center mb-4">
              <Hospital className="text-[#DB044A] mr-2" />
              <h2 className="text-xl font-semibold text-[#3A1B78]">Hospital Overview</h2>
            </div>
            <p className="text-gray-600">
              Manage claims processing, review benefits, and access hospital-specific tools and resources.
            </p>
            <Button
              className="mt-4 bg-[#3A1B78] hover:bg-[#DB044A] text-white transition-colors"
              onClick={() => router.push("/hospital-dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>

          {/* Claims Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 bg-[#3A1B78] text-white flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Claims</h3>
              <FileText className="h-5 w-5" />
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-[#3A1B78]">S.No</TableHead>
                  <TableHead className="text-[#3A1B78]">Name</TableHead>
                  <TableHead className="text-[#3A1B78]">Type</TableHead>
                  <TableHead className="text-[#3A1B78]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-gray-50">
                  <TableCell>1</TableCell>
                  <TableCell>Indhumathi</TableCell>
                  <TableCell>Individual Death Claim</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="text-[#DB044A] hover:text-[#3A1B78]"
                      onClick={() => router.push("./hospital-process/hospital-fill")}
                    >
                      View <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-gray-50">
                  <TableCell>2</TableCell>
                  <TableCell>Raja Ram</TableCell>
                  <TableCell>Group Death Claim</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="text-[#DB044A] hover:text-[#3A1B78]"
                      onClick={() => router.push("./hospital-process/hospital-fill")}
                    >
                      View <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-gray-50">
                  <TableCell>3</TableCell>
                  <TableCell>Ram Kumar</TableCell>
                  <TableCell>Individual Death Claim</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="text-[#DB044A] hover:text-[#3A1B78]"
                      onClick={() => router.push("./hospital-process/hospital-fill")}
                    >
                      View <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </RoleProtected>
  )
}

