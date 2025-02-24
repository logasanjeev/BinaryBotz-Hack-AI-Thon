"use client"

import RoleProtected from "@/components/RoleProtected"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

function IndividualDeathClaimPage() {
  const router = useRouter()
  const [isClientInfoSubmitted, setIsClientInfoSubmitted] = useState(false)

  useEffect(() => {
    const formStatus = localStorage.getItem("individualDeathClaim_clientInfo")
    setIsClientInfoSubmitted(formStatus === "completed")
  }, [])

  return (
    <RoleProtected allowedRole="client">
      <div className=" bg-white ">
        <div className="container max-w-2xl mx-auto pt-5 px-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-8 text-[#3A1B78] hover:text-[#DB044A] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-3xl font-bold mb-8 text-[#3A1B78]">Individual Death Claim</h1>

          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-lg p-6 border border-[#3A1B78]">
              <h2 className="text-xl font-semibold mb-4 text-[#DB044A]">Step 1: Client Information</h2>
              <p className="mb-4 text-gray-600">
                Please fill out the client information form before proceeding to document upload.
              </p>
              <Button
                onClick={() => router.push("/client-submit/individual-death-claim/client-info")}
                className="w-full bg-[#DB044A] hover:bg-[#AB0D57] text-white"
              >
                Fill Client Information
              </Button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 border border-[#3A1B78]">
              <h2 className="text-xl font-semibold mb-4 text-[#3A1B78]">Step 2: Document Upload</h2>
              <p className="mb-4 text-gray-600">
                Fill this form now
              </p>
              <Button
                onClick={() => router.push("/client-submit/individual-death-claim/upload")}
                className="w-full bg-[#3A1B78] hover:bg-[#DB044A] text-white transition-colors"
              >
                {isClientInfoSubmitted ? "Upload Documents" : "Complete Client Information First"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RoleProtected>
  )
}

export default IndividualDeathClaimPage

