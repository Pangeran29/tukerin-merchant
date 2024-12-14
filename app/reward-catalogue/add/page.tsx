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
import { CalendarIcon, Upload, Gift, Coffee, Tag, Settings, ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Reward</h1>
        <p className="text-gray-600 mb-8">Design an enticing reward that will delight your customers and boost engagement in your loyalty program.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Reward Details</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Reward Title</Label>
                    <Input id="title" className="bg-white border-gray-300" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" className="bg-white border-gray-300" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Reward Image</Label>
                    <div 
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-[#FDDF23]"
                      onClick={handleImageClick}
                    >
                      <div className="space-y-1 text-center">
                        {image ? (
                          <ImageIcon className="mx-auto h-12 w-12 text-[#FDDF23]" />
                        ) : (
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        )}
                        <div className="flex text-sm text-gray-600">
                          <Label htmlFor="image" className="relative cursor-pointer rounded-md font-medium text-[#FDDF23] hover:text-[#FDDF23]/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#FDDF23]">
                            <span>{image ? 'Change image' : 'Upload an image'}</span>
                            <Input 
                              id="image" 
                              type="file" 
                              className="sr-only" 
                              onChange={handleImageChange}
                              ref={fileInputRef}
                              accept="image/*"
                            />
                          </Label>
                          {!image && <p className="pl-1">or drag and drop</p>}
                        </div>
                        <p className="text-xs text-gray-500">
                          {image ? image.name : 'PNG, JPG, GIF up to 10MB'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Reward Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (Points)</Label>
                    <Input id="price" type="number" className="bg-white border-gray-300" required />
                  </div>

                  <div className="space-y-2">
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
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="experience" id="experience" />
                        <Label htmlFor="experience">Experience</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" className="bg-white border-gray-300" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="terms">Terms and Conditions</Label>
                    <Textarea id="terms" className="bg-white border-gray-300" required />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Reward Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxDaily">Max Daily Redeem</Label>
                      <Input id="maxDaily" type="number" className="bg-white border-gray-300" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxMonthly">Max Monthly Redeem</Label>
                      <Input id="maxMonthly" type="number" className="bg-white border-gray-300" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="viewOrder">Display Order</Label>
                    <Input id="viewOrder" type="number" className="bg-white border-gray-300" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-300">
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
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-300">
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

                  <div className="flex items-center space-x-2">
                    <Checkbox id="isFree" />
                    <Label htmlFor="isFree">Is Free Reward</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="isActive" />
                    <Label htmlFor="isActive">Is Active Reward</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Reward Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {image ? (
                    <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4">
                      <img src={URL.createObjectURL(image)} alt="Reward" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-[#FDDF23] rounded-full flex items-center justify-center mr-4">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Your New Reward</h3>
                    <p className="text-sm text-gray-500">Reward Type • Limited Time</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Your reward description will appear here. Make it enticing!</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#FDDF23]">500 pts</span>
                  <Button className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">Redeem</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => router.push('/reward-catalogue')}>Cancel</Button>
            <Button type="submit" className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
              Create Reward
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

