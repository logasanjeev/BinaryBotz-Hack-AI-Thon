'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Toaster, toast } from 'sonner'
import Image from 'next/image'
import SUI from "@/assets/signupImage.jpg";
import InsuranceCarousel from '@/components/contentCarousel'

export default function SignUpPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('client')

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  })

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await setDoc(doc(db, `users_${activeTab}`, userCredential.user.uid), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: activeTab,
        createdAt: new Date().toISOString(),
      })

      toast.success("Account created successfully!", {
        description: "You can now log in with your credentials."
      })

      router.push('/login')
    } catch (error) {
      toast.error("Error creating account", {
        description: error.message
      })
    }
  }

  const SignUpForm = () => (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label>Full Name</label>
        <Input {...form.register("name", { required: true })} />
      </div>

      <div className="space-y-2">
        <label>Email</label>
        <Input type="email" {...form.register("email", { required: true })} />
      </div>

      <div className="space-y-2">
        <label>Password</label>
        <Input type="password" {...form.register("password", { required: true })} />
      </div>

      <div className="space-y-2">
        <label>Confirm Password</label>
        <Input type="password" {...form.register("confirmPassword", { required: true })} />
      </div>

      <div className="space-y-2">
        <label>Phone Number</label>
        <Input type="tel" {...form.register("phone", { required: true })} />
      </div>

      <Button type="submit" className="w-full bg-maingrad">
        Sign Up as {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </Button>
    </form>
  )

  return (
    <div className='flex items-center h-[89.7vh]'>
    <div className="container mx-auto max-w-md border-0 shadow-none w-[30%]">
      <Toaster position="top-center" />
      <Card className='border-none shadow-none'>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-pink-800">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="client" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="client">Client</TabsTrigger>
              <TabsTrigger value="hospital">Hospital</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="client">
              <SignUpForm />
            </TabsContent>
            <TabsContent value="hospital">
              <SignUpForm />
            </TabsContent>
            <TabsContent value="admin">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
    <div className="md:w-[70%] w-full hidden md:flex items-center justify-center h-full relative">
        <Image className="shadow-lg shadow-black/55 rounded-bl-xl rounded-tl-xl w-full h-full object-cover" src={SUI} alt="SignUpImg" />
        
        {/* Overlay Div */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-maingrad before:opacity-70 before:z-0 before:rounded-bl-xl before:rounded-tl-xl">
          <InsuranceCarousel />
        </div>
      </div>
    </div>
  )
}