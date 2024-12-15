'use client'

import { useState, useEffect } from 'react'
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

// Mock data for a reward (you would fetch this from an API in a real application)
const mockReward = {
  id: '1',
  title: 'Free Coffee',
  description: 'Enjoy a free coffee of your choice',
  image: '/placeholder.svg?height=200&width=200',
  price: 500,
  type: 'voucher',
  stock: 100,
  terms: 'Valid for one standard coffee. Cannot be combined with other offers.',
  maxDaily: 5,
  maxMonthly: 20,
  viewOrder: 1,
  startDate: new Date('2023-01-01'),
  endDate: new Date('2023-12-31'),
  isFree: false,
  isActive: true,
}

export default function RewardDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [reward, setReward] = useState(mockReward)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch the reward data here
    // For now, we're using the mock data
    setReward({ ...mockReward, id: params.id })
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReward(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setReward(prev => ({ ...prev, [name]: checked }))
  }

  const handleDateChange = (name: 'startDate' | 'endDate') => (date: Date | undefined) => {
    if (date) {
      setReward(prev => ({ ...prev, [name]: date }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated reward data to your backend
    console.log('Updated reward:', reward)
    setIsEditing(false)
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Reward' : 'Reward Details'}
          </h1>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>

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
                    <Input
                      id="title"
                      name="title"
                      value={reward.title}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={reward.description}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Reward Image</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                      <div className="space-y-1 text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <Label htmlFor="image" className="relative cursor-pointer rounded-md font-medium text-[#FDDF23] hover:text-[#FDDF23]/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#FDDF23]">
                            <span>{isEditing ? 'Change image' : 'Current image'}</span>
                            <Input id="image" name="image" type="file" className="sr-only" disabled={!isEditing} />
                          </Label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={reward.price}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Type of Reward</Label>
                    <RadioGroup
                      value={reward.type}
                      onValueChange={(value) => setReward(prev => ({ ...prev, type: value }))}
                      disabled={!isEditing}
                    >
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
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={reward.stock}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="terms">Terms and Conditions</Label>
                    <Textarea
                      id="terms"
                      name="terms"
                      value={reward.terms}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      disabled={!isEditing}
                    />
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
                      <Input
                        id="maxDaily"
                        name="maxDaily"
                        type="number"
                        value={reward.maxDaily}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxMonthly">Max Monthly Redeem</Label>
                      <Input
                        id="maxMonthly"
                        name="maxMonthly"
                        type="number"
                        value={reward.maxMonthly}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="viewOrder">Display Order</Label>
                    <Input
                      id="viewOrder"
                      name="viewOrder"
                      type="number"
                      value={reward.viewOrder}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                            disabled={!isEditing}
                          >
                            {reward.startDate ? format(reward.startDate, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={reward.startDate}
                            onSelect={handleDateChange('startDate')}
                            disabled={!isEditing}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                            disabled={!isEditing}
                          >
                            {reward.endDate ? format(reward.endDate, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={reward.endDate}
                            onSelect={handleDateChange('endDate')}
                            disabled={!isEditing}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isFree"
                      checked={reward.isFree}
                      onCheckedChange={handleCheckboxChange('isFree')}
                      disabled={!isEditing}
                    />
                    <Label htmlFor="isFree">Is Free Reward</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isActive"
                      checked={reward.isActive}
                      onCheckedChange={handleCheckboxChange('isActive')}
                      disabled={!isEditing}
                    />
                    <Label htmlFor="isActive">Is Active Reward</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {isEditing && (
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </div>
    </Layout>
  )
}

