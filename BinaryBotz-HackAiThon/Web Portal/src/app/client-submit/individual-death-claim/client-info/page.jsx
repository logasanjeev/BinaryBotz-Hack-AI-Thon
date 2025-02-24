'use client'

import RoleProtected from '@/components/RoleProtected'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  dob: z.string(),
  address: z.string().min(10, "Address must be at least 10 characters"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  phone: z.string().regex(/^\+91[0-9]{10}$/, "Invalid Indian phone number"),
  relation: z.enum(["Spouse", "children", "parents", "others"]),
  claimantTitle: z.enum(["nominee", "executer", "trustee", "appointee", "emplyer", "assignee", "beneficiary"]),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number"),
  politicallyExposed: z.boolean(),
  residentStatus: z.enum([
    "Resident Indian",
    "Non Resident Indian (NRI)",
    "Foreign National",
    "Person of Indian Origin (PIO)"
  ]),
  bankAccountNo: z.string().min(8, "Invalid account number"),
  accountHolderName: z.string().min(2, "Invalid account holder name"),
  bankDetails: z.string().min(5, "Invalid bank details"),
  accountType: z.enum(["Savings", "Current", "NRO", "NRE"]),
  ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC"),
  micr: z.string().length(9, "MICR must be 9 digits"),
  pensionPreference: z.enum([
    "Entire amount as lumpsum",
    "Entire amount as Annuity",
    "Part as annuity Part as Lumpsump",
    "As Installments"
  ])
})

export default function IndividualDeathClaimPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: "",
      address: "",
      pincode: "",
      phone: "+91",
      relation: "Spouse",
      claimantTitle: "nominee",
      panNumber: "",
      politicallyExposed: false,
      residentStatus: "Resident Indian",
      bankAccountNo: "",
      accountHolderName: "",
      bankDetails: "",
      accountType: "Savings",
      ifsc: "",
      micr: "",
      pensionPreference: "Entire amount as lumpsum"
    }
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call and validation against .env.local values
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, you would validate against actual API
      if (
        data.name === process.env.MOCK_NAME &&
        data.phone === process.env.MOCK_PHONE
        // Add other validations as needed
      ) {
        toast.success('Claim submitted successfully', {
          description: 'Your claim has been received and is being processed.',
        })
        router.push('/client-submit')
        localStorage.setItem('individualDeathClaim_clientInfo', 'completed')
        toast.success('Information submitted successfully')
        router.push('/client-submit/individual-death-claim')
      } else {
        toast.error('Validation Error', {
          description: 'Please check your information and try again.',
        })
      }
    } catch (error) {
      toast.error('Error submitting claim', {
        description: 'Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <h1 className="text-2xl font-bold mb-6">Individual Death Claim</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h2 className="text-lg font-semibold">Personal Information</h2>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter your complete address"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter 6-digit pincode" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Claim Information Section */}
                <div>
                  <h2 className="text-lg font-semibold">Claim Information</h2>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="relation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relation with Life Assured</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select relation" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["Spouse", "children", "parents", "others"].map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
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
                        name="claimantTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Claimant Title</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select title" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["nominee", "executer", "trustee", "appointee", "emplyer", "assignee", "beneficiary"].map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="panNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PAN Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter PAN number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="politicallyExposed"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Politically Exposed
                            </FormLabel>
                            <FormDescription>
                              Are you a politically exposed person?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="residentStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resident Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[
                                "Resident Indian",
                                "Non Resident Indian (NRI)",
                                "Foreign National",
                                "Person of Indian Origin (PIO)"
                              ].map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
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

                {/* Bank Details Section */}
                <div>
                  <h2 className="text-lg font-semibold">Bank Details</h2>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="bankAccountNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accountHolderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Holder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account holder name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bankDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name & Branch</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter bank name and branch" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="accountType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["Savings", "Current", "NRO", "NRE"].map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
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
                        name="ifsc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IFSC Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter IFSC code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="micr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MICR Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter MICR code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Pension Preference Section */}
                <div>
                  <h2 className="text-lg font-semibold">Pension Preference</h2>
                  <Separator className="my-4" />
                  <FormField
                    control={form.control}
                    name="pensionPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How would you like to receive the benefits?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "Entire amount as lumpsum",
                              "Entire amount as Annuity",
                              "Part as annuity Part as Lumpsump",
                              "As Installments"
                            ].map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Claim"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </RoleProtected>
  )
}