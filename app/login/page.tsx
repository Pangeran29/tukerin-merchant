'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-48 h-12 bg-[#FDDF23] rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-black">CMS Logo</span>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-black">Welcome Back!</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-black">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-white border-[#FDDF23] mt-1"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-black">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white border-[#FDDF23] mt-1"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-[#FDDF23] text-[#FDDF23]"
                />
                <Label htmlFor="remember-me" className="ml-2 text-sm text-black">
                  Remember me
                </Label>
              </div>

              <button type="button" className="text-sm text-[#FDDF23] hover:underline">
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:block lg:w-1/2 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FDDF23]/10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("/placeholder.svg?height=600&width=800")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 bg-gradient-to-t from-white/80 to-transparent">
          <h1 className="text-4xl font-bold text-black mb-4">Welcome to Our CMS!</h1>
          <p className="text-xl text-black text-center max-w-md">
            Manage your content, rewards, and customer points all in one place. Sign in to get started.
          </p>
        </div>
      </div>
    </div>
  )
}

