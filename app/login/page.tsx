"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Coffee, Lock, Mail } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-48 h-12 rounded-lg flex items-center justify-center">
              <Image
                src="/tukerin.svg" 
                alt="Tukerin Logo"
                width={240}
                height={80}
                className="h-auto"
                priority
              />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="mt-2 text-gray-600">
              Please sign in to your account to manage your loyalty program
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="">
              <div>
                <Label htmlFor="username" className="text-gray-700">
                  Username
                </Label>
                <div className="relative py-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-11 py-6 bg-white border-gray-300 focus:border-[#FDDF23] focus:ring-[#FDDF23]"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative flex justify-center">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-11 py-6 bg-white border-gray-300 focus:border-[#FDDF23] focus:ring-[#FDDF23]"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
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
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  className="border-gray-300 text-[#FDDF23] focus:ring-[#FDDF23]"
                />
                <Label
                  htmlFor="remember-me"
                  className="ml-4 text-sm text-gray-700"
                >
                  Remember me
                </Label>
              </div>

              <button
                type="button"
                className="text-sm text-gray-700 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#FDDF23] text-gray-700 hover:bg-[#FDDF23]/80"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <Image
          src="/coffee-shop.jpg"
          alt="Coffee Shop Interior"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[#FDDF23] text-black flex flex-col items-center justify-center p-12">
          <h1 className="text-4xl font-bold  mb-4">
            Boost Your Coffee Shop Loyalty
          </h1>
          <p className="text-xl text-center max-w-md">
            Manage your rewards program, track customer engagement, and grow
            your business with our powerful CMS.
          </p>
        </div>
      </div>
    </div>
  );
}
