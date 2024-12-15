import Layout from '../components/layout'
import { Search, Plus, ChevronDown } from 'lucide-react'
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
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const rewardTypes = ['All Rewards', 'Voucher', 'Physical Good', 'Experience']

export default function RewardCataloguePage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Reward Catalogue</h1>
          <Link href="/reward-catalogue/add">
            <Button className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
              <Plus className="w-5 h-5 mr-2" /> Add New Reward
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Search rewards" 
                  className="pl-10 bg-white border-gray-300"
                />
              </div>
              
              <Select>
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Reward Type" />
                </SelectTrigger>
                <SelectContent>
                  {rewardTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="points-high">Highest Points</SelectItem>
                  <SelectItem value="points-low">Lowest Points</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              {['Out of Stock', 'Free Rewards', 'Featured'].map((filter) => (
                <div key={filter} className="flex items-center space-x-2">
                  <Checkbox id={filter.toLowerCase().replace(' ', '-')} />
                  <Label htmlFor={filter.toLowerCase().replace(' ', '-')}>{filter}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reward Catalogue */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 7 }).map((_, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="aspect-square relative">
                <img
                  src={`/placeholder.svg?text=Reward ${index + 1}&bg=FDDF23&fg=000000`}
                  alt={`Reward ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                  {['Voucher', 'Physical', 'Experience'][index % 3]}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Reward Title {index + 1}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Short description of the reward. This is a brief explanation of what the customer will receive.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#FDDF23]">{(index + 1) * 100} pts</span>
                  <Link href={`/reward-catalogue/${index + 1}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">Showing 8 out of 16 rewards</span>
          <div className="space-x-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

