"use client"
import { SiBuildkite } from "react-icons/si"; 
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router"; 

export default function InsuranceHeader() {
//   const router = useRouter();

  return (
    <header className="w-full bg-gradient-to-r from-[#DB044A] via-[#AB0D57] to-[#3A1B78] p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
        //   onClick={() => router.push("/")} // Use router.push for navigation
          role="button"
        >
          <SiBuildkite className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-xl font-bold text-white">SBI Life Insurance</h1>
            <p className="text-sm text-white/80">Claim Portal</p>
          </div>
        </div>
        </div>

        
    </header>
  );
}