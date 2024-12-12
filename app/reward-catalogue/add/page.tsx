'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, Upload } from 'lucide-react'

export default function AddRewardPage() {
  const router = useRouter()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [image, setImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
    // Redirect back to reward catalogue page
    router.push('/reward-catalogue')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Add New Reward</h1>
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
            <Label htmlFor="price">Price (Points)</Label>
            <Input id="price" type="number" className="bg-white border-[#FDDF23]" required />
          </div>

          <div>
            <Label>Type of Reward</Label>
            <RadioGroup defaultValue="physical">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="physical" id="physical" />
                <Label htmlFor="physical">Physical Good</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="voucher" id="voucher" />
                <Label htmlFor="voucher">Voucher</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" type="number" className="bg-white border-[#FDDF23]" required />
          </div>

          <div>
            <Label htmlFor="maxDaily">Max Daily Redeem</Label>
            <Input id="maxDaily" type="number" className="bg-white border-[#FDDF23]" required />
          </div>

          <div>
            <Label htmlFor="maxMonthly">Max Monthly Redeem</Label>
            <Input id="maxMonthly" type="number" className="bg-white border-[#FDDF23]" required />
          </div>

          <div>
            <Label htmlFor="viewOrder">View Order</Label>
            <Input id="viewOrder" type="number" className="bg-white border-[#FDDF23]" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Period</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal border-[#FDDF23]">
                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>End Period</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal border-[#FDDF23]">
                    {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="image">Reward Image</Label>
            <div 
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-[#FDDF23] rounded-md cursor-pointer"
              onClick={handleImageClick}
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <Label htmlFor="image" className="relative cursor-pointer rounded-md font-medium text-[#FDDF23] hover:text-[#FDDF23]/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#FDDF23]">
                    <span>Upload a file</span>
                    <Input 
                      id="image" 
                      type="file" 
                      className="sr-only" 
                      onChange={handleImageChange}
                      ref={fileInputRef}
                      accept="image/*"
                    />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {image && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {image.name}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="isFree" />
            <Label htmlFor="isFree">Is Free Reward</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="isActive" />
            <Label htmlFor="isActive">Is Active Reward</Label>
          </div>

          <Button type="submit" className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
            Add Reward
          </Button>
        </form>
      </div>
    </Layout>
  )
}

