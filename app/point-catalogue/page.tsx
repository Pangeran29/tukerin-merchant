import Layout from '../components/layout'
import { Search, Plus, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const pointTypes = [
  { id: 1, icon: '🛍️', name: 'Purchase Points', description:'Earn points for every purchase' },
  { id: 2, icon: '🎂', name: 'Birthday Bonus', description: 'Special points on your birthday' },
  { id: 3, icon: '👥', name: 'Referral Reward', description: 'Earn points by referring friends' },
  { id: 4, icon: '📝', name: 'Review Points', description: 'Get points for leaving reviews' },
  { id: 5, icon: '📅', name: 'Check-in Bonus', description: 'Earn points for regular visits' },
  { id: 6, icon: '🏆', name: 'Loyalty Milestone', description: 'Bonus points for loyal customers' },
  { id: 7, icon: '📱', name: 'App Download', description: 'One-time points for app download' },
  { id: 8, icon: '🎉', name: 'Special Event', description: 'Limited-time bonus point events' },
]

export default function PointCataloguePage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Point Catalogue</h1>
          <Link href="/point-catalogue/add">
            <Button className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
              <Plus className="w-5 h-5 mr-2" /> Add New Point Type
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Point System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg text-gray-800">Total Point Types</h3>
                <p className="text-3xl font-semibold text-gray-800">{pointTypes.length}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg text-gray-800">Active Campaigns</h3>
                <p className="text-3xl font-semibold">5</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg text-gray-800">Avg. Points/Customer</h3>
                <p className="text-3xl font-semibold" >250</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg text-gray-800">Total Points Issued</h3>
                <p className="text-3xl font-semibold">50,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Search point types" 
                  className="pl-10 bg-white border-gray-300"
                />
              </div>
              <div className="flex space-x-2">
                <Select>
                  <SelectTrigger className="w-[150px] border-gray-300">
                    <SelectValue placeholder="Point Type" />
                  </SelectTrigger>
                <SelectContent className='bg-[#FBFBFB]'>
                    <SelectItem value="all" className='hover:bg-[#FDDF23]/80'>By Price</SelectItem>
                    <SelectItem value="active" className='hover:bg-[#FDDF23]/80'>By Menu Item</SelectItem>
                    <SelectItem value="inactive" className='hover:bg-[#FDDF23]/80'>By Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Point Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Point Type Cards */}
          {pointTypes.map((pointType) => (
            <Card key={pointType.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{pointType.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{pointType.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{pointType.description}</p>
                <div className="flex flex-col justify-between items-start">
                  <span className="text-sm font-medium text-gray-500">Earn up to</span>
                  <span className="text-xl font-bold text-gray-600">{pointType.id * 10} pts</span>
                </div>
                <Link href={`/point-catalogue/${pointType.id}`}>
                  <Button variant="outline" size="sm" className="w-full mt-4">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">Showing all {pointTypes.length} point types</span>
          <div className="space-x-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button variant="outline" disabled>Next</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

