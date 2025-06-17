"use client";
import { Users, User, HeartPulse } from "lucide-react";
import ClaimCard from "@/components/ClaimCard";
import Link from "next/link";
import Image from "next/image";
import a from "@/assets/a.jpg"
export default function ClientSubmit() {
  return (
    <div className="h-[89vh] bg-gray-50">
      <main className="container mx-auto px-4">
        <div className="flex bg-[#d20e49] text-white mb-7 rounded-lg ">
          <div className="mb-8 p-4 w-[75%]">
            <h2 className="text-3xl text-white  font-bold ">Submit a Claim</h2>
            <p className="mt-2 ">
              Submitting a claim is simple and designed to provide you with the
              support you need during difficult times. Our streamlined process
              ensures quick and efficient handling, so you can focus on what
              matters most. If you have any questions, our team is here to help
              every step of the way.
            </p>
          </div>
          <div className="w-[25%]">
            <Image className="rounded-lg"
              src={a}
              alt="Claim Submission"
              width={100}
              layout="responsive"
            />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href={"/client-submit/individual-death-claim"}>
          <ClaimCard
            title="Individual Death Claim"
            description="Submit a claim for an individual life insurance policy. Required documents include death certificate and policy details."
            icon={User}
            path="/client-submit/individual-death-claim"
          />
          </Link>
          <Link href={"/client-submit/group-death-claim"}>
          <ClaimCard
            title="Group Death Claim"
            description="Process claims for group life insurance policies. Suitable for corporate and organization-based coverage."
            icon={Users}
            path="/client-submit/group-death-claim"
          />
          </Link>
          <Link href={"/client-submit/living-benefits"}> 
          <ClaimCard
            title="Living Benefits"
            description="Claim living benefits such as critical illness, disability, or health-related insurance coverage."
            icon={HeartPulse}
            path="/client-submit/living-benefits"
          />
          </Link>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 mt-auto bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} SBI Life Insurance. All rights reserved.
        </div>
      </footer>
    </div>
  );
}