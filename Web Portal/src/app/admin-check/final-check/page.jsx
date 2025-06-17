import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FileViewer from "@/components/FileViewer";
import { Check, X } from "lucide-react";

export default function Home() {
  const clientInfo = {
    name: "Indhumathi",
    dob: "1980-01-01",
    address: "123 Main Street, Mumbai",
    pincode: "400001",
    phone: "+919876543210",
    relation: "Spouse",
    title: "nominee",
    pan: "ABCDE1234F",
    politicallyExposed: false,
    residentStatus: "Resident Indian",
    bankDetails: {
      account: "1234567890",
      holder: "Indhumathi",
      bank: "HDFC Bank, Mumbai Branch",
      type: "Savings",
      ifsc: "HDFC0001234",
      micr: "400240123"
    },
    pensionPreference: "Entire amount as lumpsum"
  };

  const lifeAssuredDetails = {
    name: "Bheem",
    policyNumber: "POL123456789",
    dob: "1975-05-15",
    occupation: "Software Engineer",
    sumAssured: "₹50,00,000",
    policyStartDate: "2015-01-01",
    premiumStatus: "Paid Up",
    lastPremiumDate: "2024-01-01"
  };

  const hospitalInfo = {
    name: "Apollo Hospitals",
    admissionDate: "2024-02-01",
    dischargeDate: "2024-02-07",
    treatment: "None"
  };

  const files = [
    { name: "Aadhar Card.pdf", id: 1 },
    { name: "Driving Lisence.pdf", id: 2 },
    { name: "Death Certificate.pdf", id: 3 },
    { name: "Original Policy Document.pdf", id:4 },
    { name: "Claim Form.pdf", id:5},
    { name: "Medical Attendance Certificate.pdf", id:6}
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Personal Details</h3>
            <div className="space-y-2 mt-2">
              <p><span className="text-muted-foreground">Name:</span> {clientInfo.name}</p>
              <p><span className="text-muted-foreground">DOB:</span> {clientInfo.dob}</p>
              <p><span className="text-muted-foreground">Address:</span> {clientInfo.address}</p>
              <p><span className="text-muted-foreground">Pincode:</span> {clientInfo.pincode}</p>
              <p><span className="text-muted-foreground">Phone:</span> {clientInfo.phone}</p>
              <p><span className="text-muted-foreground">PAN:</span> {clientInfo.pan}</p>
              <div>
                <span className="text-muted-foreground">Politically Exposed:</span>
                <Badge variant={clientInfo.politicallyExposed ? "destructive" : "secondary"} className="ml-2">
                  {clientInfo.politicallyExposed ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Bank Details</h3>
            <div className="space-y-2 mt-2">
              <p><span className="text-muted-foreground">Account:</span> {clientInfo.bankDetails.account}</p>
              <p><span className="text-muted-foreground">Holder:</span> {clientInfo.bankDetails.holder}</p>
              <p><span className="text-muted-foreground">Bank:</span> {clientInfo.bankDetails.bank}</p>
              <p><span className="text-muted-foreground">Type:</span> {clientInfo.bankDetails.type}</p>
              <p><span className="text-muted-foreground">IFSC:</span> {clientInfo.bankDetails.ifsc}</p>
              <p><span className="text-muted-foreground">MICR:</span> {clientInfo.bankDetails.micr}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Life Assured Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p><span className="text-muted-foreground">Name:</span> {lifeAssuredDetails.name}</p>
            <p><span className="text-muted-foreground">Policy Number:</span> {lifeAssuredDetails.policyNumber}</p>
            <p><span className="text-muted-foreground">DOB:</span> {lifeAssuredDetails.dob}</p>
            <p><span className="text-muted-foreground">Occupation:</span> {lifeAssuredDetails.occupation}</p>
          </div>
          <div className="space-y-2">
            <p><span className="text-muted-foreground">Sum Assured:</span> {lifeAssuredDetails.sumAssured}</p>
            <p><span className="text-muted-foreground">Policy Start Date:</span> {lifeAssuredDetails.policyStartDate}</p>
            <p><span className="text-muted-foreground">Premium Status:</span> {lifeAssuredDetails.premiumStatus}</p>
            <p><span className="text-muted-foreground">Last Premium Date:</span> {lifeAssuredDetails.lastPremiumDate}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hospital Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><span className="text-muted-foreground">Hospital Name:</span> {hospitalInfo.name}</p>
          <p><span className="text-muted-foreground">Admission Date:</span> {hospitalInfo.admissionDate}</p>
          <p><span className="text-muted-foreground">Discharge Date:</span> {hospitalInfo.dischargeDate}</p>
          <p><span className="text-muted-foreground">Treatment:</span> {hospitalInfo.treatment}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submitted Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <FileViewer key={file.id} fileName={file.name} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-6">
          <h1 className="font-bold text-3xl mb-4">Fraud Detection Explanation </h1>
          <p>Claim Result: Potential Risk</p>
          <p>Risk Score: 62%</p>
          <p>Fraud Category: Identity Theft</p>
          <p>Explanation: The high premium of 5,00,000 and policy sum assured of 50,00,000 in combination with an unemployed assured (ASSURED_AGE = 45) suggests that the claim may be fraudulent. Furthermore, the policy term and payment term being the same at 5 years implies that the assured might not have a regular income, making it difficult to pay premiums. The "Identity Theft" fraud category also supports this conclusion.
          </p>
          <p>Final verdict: Alert insurance agent to cross check before approving the claim.</p>
          <Separator className="my-6" />
          <div className="flex justify-end gap-4">
            <Button variant="destructive" size="lg">
              <X className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button variant="default" size="lg">
              <Check className="mr-2 h-4 w-4" /> Approve
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
