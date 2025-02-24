'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth, db } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { toast, Toaster } from 'sonner'
import Image from 'next/image'
import SUI from "@/assets/signupImage.jpg";
import InsuranceCarousel from '@/components/contentCarousel'

const ROLE_REDIRECTS = {
  client: '/client-submit',
  hospital: '/hospital-process',
  admin: '/admin-check'
}

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('client')
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    criteriaMode: "all",
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      const userDoc = await getDoc(doc(db, `users_${activeTab}`, userCredential.user.uid))

      if (!userDoc.exists()) {
        await auth.signOut()
        toast.error("Access denied", {
          description: `You are not registered as a ${activeTab}`
        })
        setIsLoading(false)
        return
      }

      // Get the ID token
      const idToken = await userCredential.user.getIdToken()
      
      // Set session cookie
      document.cookie = `session=${idToken}; path=/`
      // Set role cookie
      document.cookie = `user_role=${activeTab}; path=/`

      toast.success("Login successful!", {
        description: `Welcome back, ${userDoc.data().name}`
      })

      // Redirect to role-specific page
      router.push(ROLE_REDIRECTS[activeTab])

    } catch (error) {
      toast.error("Login failed", {
        description: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center h-[89.7vh]'>
    <div className="container mx-auto max-w-md py-10 border-0 shadow-none w-[30%]">
      <Toaster />
      <Card className='border-none shadow-none'>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-pink-800">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="client" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="client">Client</TabsTrigger>
              <TabsTrigger value="hospital">Hospital</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            {['client', 'hospital', 'admin'].map((role) => (
              <TabsContent key={role} value={role}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <label>Email</label>
                    <Input 
                      type="email" 
                      {...form.register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                    {form.formState.errors.email && (
                      <span className="text-sm text-destructive">
                        {form.formState.errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label>Password</label>
                    <Input 
                      type="password" 
                      {...form.register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                    />
                    {form.formState.errors.password && (
                      <span className="text-sm text-destructive">
                        {form.formState.errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Button 
                      type="button"
                      variant="link" 
                      className="px-0 text-sm text-muted-foreground"
                      onClick={() => router.push('/forgot-password')}
                    >
                      Forgot password?
                    </Button>
                    <Button 
                      type="button"
                      variant="link" 
                      className="px-0 text-sm text-muted-foreground"
                      onClick={() => router.push('/signup')}
                    >
                      Create account
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-maingrad" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent  " />
                        Logging in...
                      </div>
                    ) : (
                      `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`
                    )}
                  </Button>
                </form>
              </TabsContent>
            ))}
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