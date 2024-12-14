'use client'

import { useState } from 'react'
import Layout from './components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, CreditCard, ArrowUpRight, CalendarIcon, TrendingUp, ShoppingBag, Coffee } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DateRange } from 'react-day-picker'
import { addDays, format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// Mock data for the cards
const cardData = {
  dailyStats: { customers: 150, pointsClaimed: 5000 },
  monthlyStats: { customers: 4500, pointsClaimed: 150000 },
  returningCustomers: 75, // percentage
  totalSales: 12500, // in dollars
}

// Mock data for the charts
const topPointsData = [
  { name: 'Purchase Points', value: 1200 },
  { name: 'Referral Bonus', value: 800 },
  { name: 'Birthday Points', value: 600 },
  { name: 'Review Points', value: 400 },
  { name: 'Check-in Points', value: 200 },
]

const topRewardsData = [
  { name: 'Free Coffee', value: 500 },
  { name: 'Discount Voucher', value: 450 },
  { name: 'Merchandise', value: 300 },
  { name: 'Free Pastry', value: 250 },
  { name: 'Loyalty Card', value: 200 },
]

export default function DashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Top Section - Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cardData.dailyStats.customers}</div>
              <p className="text-xs text-muted-foreground">
                {cardData.dailyStats.pointsClaimed} Points Claimed Today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Customers</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cardData.monthlyStats.customers}</div>
              <p className="text-xs text-muted-foreground">
                {cardData.monthlyStats.pointsClaimed} Points Claimed This Month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Returning Customers</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cardData.returningCustomers}%</div>
              <p className="text-xs text-muted-foreground">
                Of customers are returning
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${cardData.totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Middle Section - Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Claimed Points</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPointsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FDDF23" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Claimed Rewards</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRewardsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FDDF23" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { icon: Coffee, text: "John Doe claimed 'Free Coffee' reward", time: "5 minutes ago" },
                { icon: Users, text: "New customer Sarah Smith joined the loyalty program", time: "1 hour ago" },
                { icon: CreditCard, text: "Emily Johnson redeemed 500 points for a discount", time: "3 hours ago" },
                { icon: TrendingUp, text: "Daily sales target reached", time: "5 hours ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-[#FDDF23] flex items-center justify-center mr-3">
                    <item.icon className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.text}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

