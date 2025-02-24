import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const IDUpload = () => {
  const [selectedID, setSelectedID] = useState("");
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFrontFileChange = (event) => {
    setFrontFile(event.target.files[0]);
  };

  const handleBackFileChange = (event) => {
    setBackFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedID) {
      setMessage("Please select an ID type.");
      return;
    }

    if (
      (selectedID === "aadhaar" || selectedID === "driving") &&
      (!frontFile || !backFile)
    ) {
      setMessage("Please upload both front and back images.");
      return;
    }

    if (selectedID !== "aadhaar" && selectedID !== "driving" && !frontFile) {
      setMessage("Please upload the ID proof.");
      return;
    }

    // Upload front file
    await validateID(frontFile, selectedID + "_front");

    // If back file exists, upload it too
    if (backFile) {
      await validateID(backFile, selectedID + "_back");
    }
  };

  const validateID = async (file, idType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id_type", idType);

    try {
      const response = await fetch("http://127.0.0.1:8000/validate-id", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.valid) {
        setMessage(`✅ ID Accepted: ${result.class}`);
      } else {
        setMessage("❌ Invalid ID Proof! Please upload a valid document.");
      }
    } catch (error) {
      setMessage("Error validating ID.");
    }
  };

  return (
    <Card className="max-w-lg mx-auto p-4 border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Upload ID Proof</CardTitle>
      </CardHeader>
      <CardContent>
        <Label className="mb-2 block">Select ID Type</Label>
        <Select onValueChange={setSelectedID}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select ID Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aadhaar">Aadhaar</SelectItem>
            <SelectItem value="pan_card">PAN Card</SelectItem>
            <SelectItem value="passport">Passport</SelectItem>
            <SelectItem value="driving">Driving License</SelectItem>
            <SelectItem value="voter_id">Voter ID</SelectItem>
          </SelectContent>
        </Select>

        {(selectedID === "aadhaar" || selectedID === "driving") && (
          <>
            <Label className="mt-4">Upload Front Side</Label>
            <Input type="file" onChange={handleFrontFileChange} />

            <Label className="mt-4">Upload Back Side</Label>
            <Input type="file" onChange={handleBackFileChange} />
          </>
        )}
        <br />
        {selectedID !== "aadhaar" && selectedID !== "driving" && (
          <>
            <Label className="mt-4">Upload ID Proof</Label>
            <Input type="file" onChange={handleFrontFileChange} />
          </>
        )}

        <Button onClick={handleUpload} className="mt-4 w-full">
          Upload
        </Button>

        {message && <p className="mt-4 font-semibold text-center">{message}</p>}
      </CardContent>
    </Card>
  );
};

export default IDUpload;
