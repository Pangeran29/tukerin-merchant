'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
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
import { CalendarIcon, Coins, ShoppingBag, Users, Star, Coffee } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AddPointPage() {
  const router = useRouter()
  const [pointType, setPointType] = useState('by-price')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Point Type</h1>
        <p className="text-gray-600 mb-8">Design a new way for customers to earn points, encouraging engagement and loyalty in your program.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Point Information</TabsTrigger>
              <TabsTrigger value="rules">Earning Rules</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Point Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Point Title</Label>
                    <Input id="title" className="bg-white border-gray-300" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" className="bg-white border-gray-300" required />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rules">
              <Card>
                <CardHeader>
                  <CardTitle>Earning Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Point Type</Label>
                    <RadioGroup value={pointType} onValueChange={setPointType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="by-price" id="by-price" />
                        <Label htmlFor="by-price">By Price</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="by-menu" id="by-menu" />
                        <Label htmlFor="by-menu">By Menu Item</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fixed" id="fixed" />
                        <Label htmlFor="fixed">By Customer</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {pointType === 'by-price' && (
                    <div className="space-y-2">
                      <Label htmlFor="priceRatio">Points per Currency Unit</Label>
                      <Input id="priceRatio" type="number" className="bg-white border-gray-300" required />
                    </div>
                  )}

                  {pointType === 'by-menu' && (
                    <div className="space-y-2">
                      <Label htmlFor="menuItem">Menu Item</Label>
                      <Input id="menuItem" className="bg-white border-gray-300" required />
                      <Label htmlFor="itemPoints">Points for this Item</Label>
                      <Input id="itemPoints" type="number" className="bg-white border-gray-300" required />
                    </div>
                  )}

                  {pointType === 'fixed' && (
                    <div className="space-y-2">
                      <Label htmlFor="fixedPoints">Fixed Point Amount</Label>
                      <Input id="fixedPoints" type="number" className="bg-white border-gray-300" required />
                    </div>
                  )}

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
                  <CardTitle>Point Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="expiryDays">Point Expiry (days)</Label>
                    <Input id="expiryDays" type="number" className="bg-white border-gray-300" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="isActive" />
                    <Label htmlFor="isActive">Is Active Point Type</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="isBonus" />
                    <Label htmlFor="isBonus">Is Bonus Point</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Point Type Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#FDDF23] rounded-full flex items-center justify-center mr-4">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Your New Point Type</h3>
                    <p className="text-sm text-gray-500">{pointType === 'by-price' ? 'Price-based' : pointType === 'by-menu' ? 'Menu-based' : 'Fixed Amount'}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Your point description will appear here. Explain how customers can earn these points!</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#FDDF23]">Earn up to 500 pts</span>
                  <Button className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => router.push('/point-catalogue')}>Cancel</Button>
            <Button type="submit" className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
              Create Point Type
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

