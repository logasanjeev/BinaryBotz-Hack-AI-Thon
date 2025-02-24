"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function HospitalFillPage() {
  const diseases = [
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "Kidney Disease",
    "Liver Disease",
    "Cancer",
    "Others"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Part I - Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name of the Life Assured</Label>
              <Input id="name" placeholder="Enter full name" />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter complete address" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Part II - Relationship</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Was the patient related to you?</Label>
              <RadioGroup defaultValue="no" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="related-yes" />
                  <Label htmlFor="related-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="related-no" />
                  <Label htmlFor="related-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Part III - Death Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="death-date">Date of Death</Label>
              <Input id="death-date" type="date" />
            </div>
            <div>
              <Label htmlFor="death-cause">Cause of death</Label>
              <Input id="death-cause" />
            </div>
            <div className="space-y-2">
              <Label>Duration of illness</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="illness-from">From</Label>
                  <Input id="illness-from" type="date" />
                </div>
                <div>
                  <Label htmlFor="illness-to">To</Label>
                  <Input id="illness-to" type="date" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Part IV - Habits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Were the Life Assured's habits regular and normal?</Label>
              <RadioGroup defaultValue="yes" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="habits-yes" />
                  <Label htmlFor="habits-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="habits-no" />
                  <Label htmlFor="habits-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="habits-nature">Nature of Habits</Label>
              <Input id="habits-nature" />
            </div>
            <div>
              <Label htmlFor="habits-duration">Duration (in years)</Label>
              <Input id="habits-duration" type="number" />
            </div>
            <div>
              <Label htmlFor="habits-quantity">Quantity per day</Label>
              <Input id="habits-quantity" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Part V - Health History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Was Life Assured's health Regular and Normal?</Label>
              <RadioGroup defaultValue="yes" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="health-yes" />
                  <Label htmlFor="health-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="health-no" />
                  <Label htmlFor="health-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>If No, Did the Life Assured suffer from any of the following?</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {diseases.map((disease) => (
                  <div key={disease} className="flex items-center space-x-2">
                    <Checkbox id={`disease-${disease.toLowerCase()}`} />
                    <Label htmlFor={`disease-${disease.toLowerCase()}`}>{disease}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="other-disease">If Any Others, Please specify</Label>
                <Input id="other-disease" />
              </div>
              <div>
                <Label htmlFor="coexisting-diseases">What were the other diseases that co-existed or preceded the terminal illness?</Label>
                <Textarea id="coexisting-diseases" />
              </div>
              <div>
                <Label htmlFor="disease-history">History of such diseases</Label>
                <Textarea id="disease-history" />
              </div>
              <div>
                <Label htmlFor="first-observed">Date when first observed</Label>
                <Input id="first-observed" type="date" />
              </div>
              <div>
                <Label htmlFor="treated-by">By whom treated?</Label>
                <Input id="treated-by" />
              </div>
              <div>
                <Label htmlFor="history-reported">By whom the above history was reported to you?</Label>
                <Input id="history-reported" />
              </div>
              <div>
                <Label htmlFor="treatment-summary">Provide Discharge / Treatment Summary and Treatment Records/Papers for the above</Label>
                <Textarea id="treatment-summary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Part VI - Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Are you the family doctor for the deceased?</Label>
              <RadioGroup defaultValue="no" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="family-doctor-yes" />
                  <Label htmlFor="family-doctor-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="family-doctor-no" />
                  <Label htmlFor="family-doctor-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="doctor-duration">If yes, for How long?</Label>
                <Input id="doctor-duration" />
              </div>
              <div>
                <Label htmlFor="family-doctor-info">If not, Please provide the name and address of his family doctor</Label>
                <Textarea id="family-doctor-info" />
              </div>
              <div>
                <Label htmlFor="previous-treatment">When and for what ailments did you treat the deceased preceding his last illness?</Label>
                <Textarea id="previous-treatment" />
              </div>
              <div>
                <Label>Did you know any other medical practitioner/Hospital who attended the deceased?</Label>
                <RadioGroup defaultValue="no" className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="other-doctor-yes" />
                    <Label htmlFor="other-doctor-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="other-doctor-no" />
                    <Label htmlFor="other-doctor-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="other-doctors">If yes, please provide their names and addresses</Label>
                <Textarea id="other-doctors" />
              </div>
              <div>
                <Label>Was any Post Mortem Examination of the body done?</Label>
                <RadioGroup defaultValue="no" className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="postmortem-yes" />
                    <Label htmlFor="postmortem-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="postmortem-no" />
                    <Label htmlFor="postmortem-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Declaration Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="register-no">Register No.</Label>
                <Input id="register-no" />
              </div>
              <div>
                <Label htmlFor="entry-no">Entry No.</Label>
                <Input id="entry-no" />
              </div>
            </div>
            <div>
              <Label htmlFor="declaration-date">Date</Label>
              <Input id="declaration-date" type="date" />
            </div>
            <div>
              <Label htmlFor="doctor-name">Name of the Doctor</Label>
              <Input id="doctor-name" />
            </div>
            <div>
              <Label htmlFor="qualification">Qualification</Label>
              <Input id="qualification" />
            </div>
            <div>
              <Label htmlFor="registration-no">Registration No.</Label>
              <Input id="registration-no" />
            </div>
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" />
            </div>
            <div>
              <Label htmlFor="hospital-address">Address of Hospital / Clinic</Label>
              <Textarea id="hospital-address" />
            </div>
            <div>
              <Label htmlFor="contact-no">Contact No.</Label>
              <Input id="contact-no" type="tel" />
            </div>
            <div>
              <Label htmlFor="signature">Certifying Doctor Signature with Stamp of the Clinic / Hospital</Label>
              <Input id="signature" type="file" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Reset</Button>
          <Button type="submit">Submit Form</Button>
        </div>
      </form>
    </div>
  );
};
