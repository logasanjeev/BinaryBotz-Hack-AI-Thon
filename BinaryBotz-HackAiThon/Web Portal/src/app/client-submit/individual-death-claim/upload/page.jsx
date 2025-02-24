'use client'
import { useState } from 'react'
import RoleProtected from '@/components/RoleProtected'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import IDUpload from '@/components/IDUploader'

const formSchema = z.object({
  lifeAssuredName: z.string().min(2, "Name must be at least 2 characters"),
  fatherSpouseName: z.string().min(2, "Name must be at least 2 characters"),
  dateOfDeath: z.string(),
  placeOfDeath: z.enum(["Hospital", "Clinic", "Residence", "Office", "Others"]),
  placeOfDeathOther: z.string().optional(),
  familyDoctorName: z.string(),
  familyDoctorRegNo: z.string(),
  familyDoctorContact: z.string(),
  lastDoctorName: z.string(),
  lastDoctorRegNo: z.string(),
  lastDoctorContact: z.string(),
  lastEmployerName: z.string().optional(),
  lastEmployerContactPerson: z.string().optional(),
  lastEmployerContact: z.string().optional(),
  lastEmployerAddress: z.string().optional(),
  natureOfDeath: z.enum(["Medical", "Natural", "Accident", "Murder", "Suicide"]),
  causeOfDeath: z.string(),
  natureOfIllness: z.array(z.string()),
  otherIllness: z.string().optional(),
  consumptionHabits: z.array(z.string()),
  consumptionDuration: z.string().optional(),
  consumptionQuantity: z.string().optional(),
  diagnosisDate: z.string().optional(),
  admissionDate: z.string().optional(),
  dischargeDate: z.string().optional(),
  policyDocument: z.instanceof(File, { message: "Original Policy Document is required" }),
  deathCertificate: z.instanceof(File, { message: "Death Certificate is required" }),
  addressProof: z.instanceof(File, { message: "Address proof is required" }),
  idProof: z.instanceof(File, { message: "ID proof is required" }),
  bankDocument: z.instanceof(File, { message: "Bank document is required" }),
})

export default function UploadPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lifeAssuredName: "",
      fatherSpouseName: "",
      dateOfDeath: "",
      placeOfDeath: "Hospital",
      placeOfDeathOther: "",
      familyDoctorName: "",
      familyDoctorRegNo: "",
      familyDoctorContact: "",
      lastDoctorName: "",
      lastDoctorRegNo: "",
      lastDoctorContact: "",
      lastEmployerName: "",
      lastEmployerContactPerson: "",
      lastEmployerContact: "",
      lastEmployerAddress: "",
      natureOfDeath: "Natural",
      causeOfDeath: "",
      natureOfIllness: [],
      otherIllness: "",
      consumptionHabits: [],
      consumptionDuration: "",
      consumptionQuantity: "",
      diagnosisDate: "",
      admissionDate: "",
      dischargeDate: "",
      policyDocument: undefined,
      deathCertificate: undefined,
      addressProof: undefined,
      idProof: undefined,
      bankDocument: undefined,
    }
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // In a real app, you would send this to your API
      // Create FormData to handle file uploads
      const formData = new FormData()
      
      // Append all form fields
      Object.keys(data).forEach(key => {
        if (data[key] instanceof File) {
          formData.append(key, data[key])
        } else {
          formData.append(key, JSON.stringify(data[key]))
        }
      })
  
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Death claim details and documents submitted successfully')
      localStorage.setItem('individualDeathClaim_upload', 'completed')
      router.push('/client-submit/individual-death-claim')
    } catch (error) {
      toast.error('Error submitting claim')
    } finally {
      setIsSubmitting(false)
    }
  }

  const illnessOptions = [
    "Hypertension",
    "Diabetes",
    "Heart Disease",
    "Liver Disease",
    "Kidney Disease",
    "Cancer",
    "Other"
  ]

  const consumptionOptions = ["Smoking", "Tobacco", "Drugs"]

  return (
    <RoleProtected allowedRole="client">
      <div className="container max-w-3xl py-10">
        <Button 
          onClick={() => router.back()}
          variant="outline"
          className="mb-6"
        >
          ← Back
        </Button>

        <Card>
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold mb-6">Death Claim Details</h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h2 className="text-lg font-semibold">Basic Information</h2>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="lifeAssuredName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of Life Assured</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fatherSpouseName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father's/Spouse's Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfDeath"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Death</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="placeOfDeath"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Place of Death</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select place of death" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {["Hospital", "Clinic", "Residence", "Office", "Others"].map((place) => (
                                <SelectItem key={place} value={place}>
                                  {place}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Doctor Information */}
                <div>
                  <h2 className="text-lg font-semibold">Doctor Information</h2>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    {/* Family Doctor Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="familyDoctorName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Family Doctor Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="familyDoctorRegNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registration No.</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="familyDoctorContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact No.</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Last Treated Doctor Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="lastDoctorName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Treated Doctor Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastDoctorRegNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registration No.</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastDoctorContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact No.</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Death Details */}
                <div>
                  <h2 className="text-lg font-semibold">Death Details</h2>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="natureOfDeath"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nature of Death</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select nature of death" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {["Medical", "Natural", "Accident", "Murder", "Suicide"].map((nature) => (
                                <SelectItem key={nature} value={nature}>
                                  {nature}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="natureOfIllness"
                      render={() => (
                        <FormItem>
                          <FormLabel>Nature of Illness</FormLabel>
                          <div className="grid grid-cols-2 gap-4">
                            {illnessOptions.map((illness) => (
                              <FormField
                                key={illness}
                                control={form.control}
                                name="natureOfIllness"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-3">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(illness)}
                                        onCheckedChange={(checked) => {
                                          const newValue = checked
                                            ? [...field.value, illness]
                                            : field.value?.filter((val) => val !== illness)
                                          field.onChange(newValue)
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {illness}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="diagnosisDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Diagnosis</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="admissionDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Admission</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dischargeDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Discharge</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Consumption Habits */}
                <div>
                  <h2 className="text-lg font-semibold">Consumption Habits</h2>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="consumptionHabits"
                      render={() => (
                        <FormItem>
                          <div className="grid grid-cols-3 gap-4">
                            {consumptionOptions.map((habit) => (
                              <FormField
                                key={habit}
                                control={form.control}
                                name="consumptionHabits"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-3">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(habit)}
                                        onCheckedChange={(checked) => {
                                          const newValue = checked
                                            ? [...field.value, habit]
                                            : field.value?.filter((val) => val !== habit)
                                          field.onChange(newValue)
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {habit}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="consumptionDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration of Consumption</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="consumptionQuantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity Consumed</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* File Uploads */}
                <div>
                  <h2 className="text-lg font-semibold">File Uploads</h2>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="policyDocument"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Original Policy Document</FormLabel>
                          <div className='text-green-600 border-black border-2 rounded-sm'>Uploaded</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deathCertificate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Death Certificate</FormLabel>
                          <div className='text-green-600 border-black border-2 rounded-sm'>Uploaded</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

<FormField
                      control={form.control}
                      name="deathCertificate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adress Proof</FormLabel>
                          <div className='text-green-600 border-black border-2 rounded-sm'>Uploaded</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                    <FormField
                      control={form.control}
                      name="idProof"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Proof</FormLabel>
                            <div className='text-green-600 border-black border-2 rounded-sm'>Uploaded</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bankDocument"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Document</FormLabel>
                          <div className='text-green-600 border-black border-2 rounded-sm'>Uploaded</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>


                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Death Claim Details"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </RoleProtected>
  )
}