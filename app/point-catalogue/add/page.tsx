'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function AddPointPage() {
  const router = useRouter()
  const [pointType, setPointType] = useState('by-price')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
    // Redirect back to point catalogue page
    router.push('/point-catalogue')
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Add New Point</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" className="bg-white border-[#FDDF23]" required />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" className="bg-white border-[#FDDF23]" required />
          </div>

          <div>
            <Label htmlFor="terms">Terms and Conditions</Label>
            <Textarea id="terms" className="bg-white border-[#FDDF23]" required />
          </div>

          <div>
            <Label htmlFor="point">Point Value</Label>
            <Input id="point" type="number" className="bg-white border-[#FDDF23]" required />
          </div>

          <div>
            <Label>Point Type</Label>
            <RadioGroup value={pointType} onValueChange={setPointType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="by-price" id="by-price" />
                <Label htmlFor="by-price">By Price</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="by-menu" id="by-menu" />
                <Label htmlFor="by-menu">By Menu</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
            Add Point
          </Button>
        </form>
      </div>
    </Layout>
  )
}

