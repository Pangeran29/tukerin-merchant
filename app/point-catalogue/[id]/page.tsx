'use client'

import { useState, useEffect } from 'react'
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

// Mock data for a point type (you would fetch this from an API in a real application)
const mockPointType = {
  id: '1',
  title: 'Purchase Points',
  description: 'Earn points for every purchase',
  icon: 'coins',
  pointType: 'by-price',
  priceRatio: 10,
  terms: 'Earn 1 point for every $10 spent',
  startDate: new Date('2023-01-01'),
  endDate: new Date('2023-12-31'),
  expiryDays: 365,
  isActive: true,
  isBonus: false,
}

export default function PointDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [pointType, setPointType] = useState(mockPointType)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch the point type data here
    // For now, we're using the mock data
    setPointType({ ...mockPointType, id: params.id })
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPointType(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setPointType(prev => ({ ...prev, [name]: checked }))
  }

  const handleDateChange = (name: 'startDate' | 'endDate') => (date: Date | undefined) => {
    if (date) {
      setPointType(prev => ({ ...prev, [name]: date }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated point type data to your backend
    console.log('Updated point type:', pointType)
    setIsEditing(false)
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Point Type' : 'Point Type Details'}
          </h1>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>

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
                    <Input
                      id="title"
                      name="title"
                      value={pointType.title}
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
                      value={pointType.description}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon">Point Icon</Label>
                    <Select
                      value={pointType.icon}
                      onValueChange={(value) => setPointType(prev => ({ ...prev, icon: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="w-full border-gray-300">
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coins"><Coins className="inline-block mr-2" /> Coins</SelectItem>
                        <SelectItem value="shopping"><ShoppingBag className="inline-block mr-2" /> Shopping Bag</SelectItem>
                        <SelectItem value="users"><Users className="inline-block mr-2" /> Users</SelectItem>
                        <SelectItem value="star"><Star className="inline-block mr-2" /> Star</SelectItem>
                        <SelectItem value="coffee"><Coffee className="inline-block mr-2" /> Coffee</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <RadioGroup
                      value={pointType.pointType}
                      onValueChange={(value) => setPointType(prev => ({ ...prev, pointType: value }))}
                      disabled={!isEditing}
                    >
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
                        <Label htmlFor="fixed">Fixed Amount</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {pointType.pointType === 'by-price' && (
                    <div className="space-y-2">
                      <Label htmlFor="priceRatio">Points per Currency Unit</Label>
                      <Input
                        id="priceRatio"
                        name="priceRatio"
                        type="number"
                        value={pointType.priceRatio}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300"
                        disabled={!isEditing}
                      />
                    </div>
                  )}

                  {pointType.pointType === 'by-menu' && (
                    <div className="space-y-2">
                      <Label htmlFor="menuItem">Menu Item</Label>
                      <Input
                        id="menuItem"
                        name="menuItem"
                        className="bg-white border-gray-300"
                        disabled={!isEditing}
                      />
                      <Label htmlFor="itemPoints">Points for this Item</Label>
                      <Input
                        id="itemPoints"
                        name="itemPoints"
                        type="number"
                        className="bg-white border-gray-300"
                        disabled={!isEditing}
                      />
                    </div>
                  )}

                  {pointType.pointType === 'fixed' && (
                    <div className="space-y-2">
                      <Label htmlFor="fixedPoints">Fixed Point Amount</Label>
                      <Input
                        id="fixedPoints"
                        name="fixedPoints"
                        type="number"
                        className="bg-white border-gray-300"
                        disabled={!isEditing}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="terms">Terms and Conditions</Label>
                    <Textarea
                      id="terms"
                      name="terms"
                      value={pointType.terms}
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
                  <CardTitle>Point Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                            {pointType.startDate ? format(pointType.startDate, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={pointType.startDate}
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
                            {pointType.endDate ? format(pointType.endDate, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={pointType.endDate}
                            onSelect={handleDateChange('endDate')}
                            disabled={!isEditing}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDays">Point Expiry (days)</Label>
                    <Input
                      id="expiryDays"
                      name="expiryDays"
                      type="number"
                      value={pointType.expiryDays}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isActive"
                      checked={pointType.isActive}
                      onCheckedChange={handleCheckboxChange('isActive')}
                      disabled={!isEditing}
                    />
                    <Label htmlFor="isActive">Is Active Point Type</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isBonus"
                      checked={pointType.isBonus}
                      onCheckedChange={handleCheckboxChange('isBonus')}
                      disabled={!isEditing}
                    />
                    <Label htmlFor="isBonus">Is Bonus Point</Label>
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

