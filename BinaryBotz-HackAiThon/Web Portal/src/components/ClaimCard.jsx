"use client"
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";

export default function ClaimCard({ title, description, icon: Icon, path, className }) {
//   const router = useRouter();

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${className}`}>
      <CardHeader className="bg-gradient-to-r from-[#DB044A] to-[#AB0D57] p-6">
        <div className="flex items-center gap-3">
          <Icon className="h-8 w-8 text-white" />
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="mb-6 text-gray-600">{description}</p>
        <Button 
          className="w-full bg-[#3A1B78] hover:bg-[#3A1B78]/90"
        //   onClick={() => router.push(path)} 
        >
          Start Claim
        </Button>
      </CardContent>
    </Card>
  );
}