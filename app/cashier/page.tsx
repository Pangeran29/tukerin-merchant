'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { Coffee, Utensils, Gift, UserPlus, Clock, Calendar, Zap, AlertCircle, QrCode, Send, CheckCircle, Ticket } from 'lucide-react'

// Enhanced mock data for point catalogue
const pointCatalogue = [
  { 
    id: 1, 
    name: 'Coffee Purchase', 
    points: 50, 
    description: 'Earn points for every coffee purchase', 
    icon: Coffee,
    category: 'Beverages',
    expiryDays: 30,
    color: 'bg-amber-100'
  },
  { 
    id: 2, 
    name: 'Lunch Special', 
    points: 100, 
    description: 'Double points for lunch menu items', 
    icon: Utensils,
    category: 'Food',
    expiryDays: 14,
    color: 'bg-green-100'
  },
  { 
    id: 3, 
    name: 'Loyalty Bonus', 
    points: 200, 
    description: 'Monthly bonus for loyal customers', 
    icon: Gift,
    category: 'Rewards',
    expiryDays: 60,
    color: 'bg-purple-100'
  },
  { 
    id: 4, 
    name: 'Referral Reward', 
    points: 150, 
    description: 'Points for referring a new customer', 
    icon: UserPlus,
    category: 'Referral',
    expiryDays: 90,
    color: 'bg-blue-100'
  },
]

// Mock reward data
const mockReward = {
  title: "Free Coffee Voucher",
  image: "/placeholder.svg?height=200&width=200",
  description: "Enjoy a free coffee of your choice!",
  points: 100,
  termsAndConditions: "Valid for one standard coffee. Cannot be combined with other offers. Expires in 30 days.",
}

export default function CashierPage() {
  const [selectedPoints, setSelectedPoints] = useState<number[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [selectedOption, setSelectedOption] = useState<'qr' | 'whatsapp' | null>(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [pointsSent, setPointsSent] = useState(false)
  const [isRedeemingReward, setIsRedeemingReward] = useState(false)
  const [voucherCode, setVoucherCode] = useState('')
  const [showRewardDetails, setShowRewardDetails] = useState(false)

  const handlePointSelection = (pointId: number) => {
    setSelectedPoints(prev => 
      prev.includes(pointId) 
        ? prev.filter(id => id !== pointId)
        : [...prev, pointId]
    )
  }

  const handleProcess = () => {
    setIsProcessing(true)
    setSelectedOption(null)
  }

  const handleOptionSelect = (option: 'qr' | 'whatsapp') => {
    setSelectedOption(option)
    if (option === 'qr') {
      setShowQR(true)
    }
  }

  const handleFinish = () => {
    setSelectedPoints([])
    setIsProcessing(false)
    setShowQR(false)
    setSelectedOption(null)
    setPhoneNumber('')
    setPointsSent(false)
  }

  const handleSendPoints = () => {
    console.log(`Sending ${totalPoints} points to ${phoneNumber}`)
    setPointsSent(true)
  }

  const handleRedeemReward = () => {
    setIsRedeemingReward(true)
  }

  const handleSubmitVoucherCode = () => {
    // Here you would typically validate the voucher code
    // For this example, we'll just show the reward details
    setIsRedeemingReward(false)
    setShowRewardDetails(true)
  }

  const totalPoints = selectedPoints.reduce((sum, id) => 
    sum + pointCatalogue.find(item => item.id === id)!.points, 0
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">Cashier Dashboard</h1>
          <p className="text-base sm:text-xl text-gray-600">Welcome to Makmur Jaya Coffee Roaster's point management system</p>
        </div>

        <div className="w-full mb-6 sm:mb-12 rounded-lg overflow-hidden shadow-lg relative">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Makmur Jaya Coffee Roaster Banner"
            width={1200}
            height={400}
            className="w-full h-[150px] sm:h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">Reward Your Customers</h2>
              <p className="text-sm sm:text-xl">Build loyalty with our point system</p>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Available Point Catalogues</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {pointCatalogue.map((item) => {
              const Icon = item.icon
              return (
                <Card 
                  key={item.id} 
                  className={`${
                    selectedPoints.includes(item.id) 
                      ? 'border-[#FDDF23] bg-[#FDDF23]/10' 
                      : `border-gray-200 ${item.color}`
                  } transition-all duration-200 ease-in-out hover:shadow-lg`}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 sm:p-4">
                    <CardTitle className="text-sm sm:text-xl font-bold">{item.name}</CardTitle>
                    <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" />
                  </CardHeader>
                  <CardContent 
                    className="cursor-pointer p-2 sm:p-4"
                    onClick={() => handlePointSelection(item.id)}
                  >
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-500">{item.category}</span>
                      <Checkbox
                        checked={selectedPoints.includes(item.id)}
                        onCheckedChange={() => {}}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg sm:text-2xl font-bold text-[#FDDF23]">{item.points}</span>
                      <div className="flex items-center text-xs sm:text-sm text-gray-500">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span>Expires in {item.expiryDays} days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Point System Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#FDDF23] mr-2 sm:mr-3" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Daily Rewards</h3>
                <p className="text-xs sm:text-sm text-gray-600">Encourage daily visits</p>
              </div>
            </div>
            <div className="flex items-center">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#FDDF23] mr-2 sm:mr-3" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Instant Redemption</h3>
                <p className="text-xs sm:text-sm text-gray-600">Quick and easy point use</p>
              </div>
            </div>
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#FDDF23] mr-2 sm:mr-3" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Expiry Reminders</h3>
                <p className="text-xs sm:text-sm text-gray-600">Notify customers before points expire</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 left-4 z-10 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 sm:bottom-8 sm:left-auto">
        <Dialog open={isRedeemingReward} onOpenChange={setIsRedeemingReward}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded-full shadow-lg w-full sm:w-auto"
              onClick={handleRedeemReward}
            >
              <Ticket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Redeem Reward
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-center mb-4">Redeem Reward</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <Label htmlFor="voucherCode" className="text-sm font-medium mb-2">Enter Voucher Code</Label>
              <Input
                id="voucherCode"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="mb-4"
                placeholder="e.g. COFFEE123"
              />
              <Button 
                onClick={handleSubmitVoucherCode}
                className="w-full bg-secondary text-text hover:bg-tertiary"
              >
                Validate Code
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showRewardDetails} onOpenChange={setShowRewardDetails}>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-center mb-4">Reward Details</DialogTitle>
            </DialogHeader>
            <div className="mt-4 flex flex-col items-center">
              <div className="w-full max-w-[200px] aspect-square relative mb-4">
                <Image src={mockReward.image} alt={mockReward.title} layout="fill" objectFit="cover" className="rounded-lg" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">{mockReward.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 text-center">{mockReward.description}</p>
              <div className="bg-secondary p-2 rounded-full mb-4">
                <span className="text-base sm:text-lg font-bold">{mockReward.points} Points</span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg w-full">
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Terms and Conditions:</h4>
                <p className="text-xs sm:text-sm text-gray-600">{mockReward.termsAndConditions}</p>
              </div>
              <Button 
                onClick={() => setShowRewardDetails(false)}
                className="mt-6 bg-secondary text-text hover:bg-tertiary w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isProcessing} onOpenChange={setIsProcessing}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded-full shadow-lg w-full sm:w-auto"
              disabled={selectedPoints.length === 0}
              onClick={handleProcess}
            >
              Process ({selectedPoints.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            {!selectedOption && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-center mb-4">Process Points</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <div className="bg-secondary p-4 rounded-lg mb-6">
                    <p className="text-base sm:text-lg font-semibold text-center">Total Points to Process</p>
                    <p className="text-2xl sm:text-4xl font-bold text-center">{totalPoints}</p>
                  </div>
                  <p className="text-sm sm:text-base text-center mb-6">Great job! You're about to reward your customer. How would you like to send the points?</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={() => handleOptionSelect('qr')}
                      className="bg-white border-2 border-secondary text-text hover:bg-secondary/10 flex flex-col items-center py-2 sm:py-4"
                    >
                      <QrCode className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
                      <span className="text-xs sm:text-sm">Generate QR</span>
                    </Button>
                    <Button 
                      onClick={() => handleOptionSelect('whatsapp')}
                      className="bg-white border-2 border-secondary text-text hover:bg-secondary/10 flex flex-col items-center py-2 sm:py-4"
                    >
                      <Send className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
                      <span className="text-xs sm:text-sm">Send to WhatsApp</span>
                    </Button>
                  </div>
                </div>
              </>
            )}
            {selectedOption === 'qr' && showQR && (
              <div className="flex flex-col items-center justify-center h-full">
                <Image src="/placeholder.svg?height=200&width=200" alt="QR Code" width={200} height={200} className="mb-4" />
                <p className="text-sm sm:text-base text-center mb-4">Scan this QR code to add points to the customer's account</p>
                <Button 
                  onClick={handleFinish}
                  className="bg-secondary text-text hover:bg-tertiary"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Finish
                </Button>
              </div>
            )}
            {selectedOption === 'whatsapp' && (
              <div className="flex flex-col items-center justify-center h-full">
                <Send className="w-12 h-12 sm:w-16 sm:h-16 text-secondary mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Send Points via WhatsApp</h3>
                <Label htmlFor="phone" className="text-sm font-medium mb-2">Customer's Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mb-4"
                />
                {!pointsSent ? (
                  <Button 
                    onClick={handleSendPoints}
                    className="bg-secondary text-text hover:bg-tertiary mb-2"
                    disabled={!phoneNumber}
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Send Points
                  </Button>
                ) : (
                  <div className="text-center mb-4">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm sm:text-base text-green-600 font-semibold">Points sent successfully!</p>
                  </div>
                )}
                <Button 
                  onClick={handleFinish}
                  className="bg-secondary text-text hover:bg-tertiary"
                  disabled={!pointsSent}
                >
                  Finish
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

