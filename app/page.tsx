'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import '@/app/globals.css'

export default function Home() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleLogin = () => {
    if (credentials.email && credentials.password) {
      localStorage.setItem('user', JSON.stringify(credentials))
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <Card className="w-[400px] shadow-lg">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Todo App</h1>
            <div className="space-y-4">
              <Input 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              />
              <Input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              />
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700" 
                onClick={handleLogin}
              >
                Sign in to continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}