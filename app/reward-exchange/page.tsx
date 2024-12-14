'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Updated mock data to include reward type
const rewardExchanges = [
  { id: 1, reward: 'Voucher Discount 20%', customer: 'John Doe', points: 500, status: 'waiting approval', type: 'Voucher' },
  { id: 2, reward: 'Free Coffee', customer: 'Jane Smith', points: 300, status: 'processed', type: 'Voucher' },
  { id: 3, reward: 'Merchandise T-Shirt', customer: 'Bob Johnson', points: 1000, status: 'delivered', type: 'Physical Good' },
  { id: 4, reward: 'Voucher Discount 10%', customer: 'Alice Brown', points: 200, status: 'received', type: 'Voucher' },
  { id: 5, reward: 'Free Pastry', customer: 'Charlie Davis', points: 150, status: 'waiting approval', type: 'Physical Good' },
]

export default function RewardExchangePage() {
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredExchanges = statusFilter === 'all'
    ? rewardExchanges
    : rewardExchanges.filter(exchange => exchange.status === statusFilter)

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-black">Reward Exchange</h1>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-64">
            <Input 
              placeholder="Search rewards or customers" 
              className="pl-10 bg-white border-[#FDDF23]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <div className="w-full sm:w-auto">
            <Label htmlFor="status-filter" className="mr-2">Status:</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter" className="w-full sm:w-[180px] border-[#FDDF23]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="waiting approval">Waiting Approval</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="received">Received</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#FDDF23] rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-[#FDDF23]">
              <TableRow>
                <TableHead className="text-black">Reward</TableHead>
                <TableHead className="text-black">Customer</TableHead>
                <TableHead className="text-black">Points</TableHead>
                <TableHead className="text-black">Status</TableHead>
                <TableHead className="text-black">Reward Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExchanges.map((exchange) => (
                <TableRow key={exchange.id}>
                  <TableCell className="font-medium">{exchange.reward}</TableCell>
                  <TableCell>{exchange.customer}</TableCell>
                  <TableCell>{exchange.points}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      exchange.status === 'waiting approval' ? 'bg-yellow-200 text-yellow-800' :
                      exchange.status === 'processed' ? 'bg-blue-200 text-blue-800' :
                      exchange.status === 'delivered' ? 'bg-green-200 text-green-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {exchange.status.charAt(0).toUpperCase() + exchange.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{exchange.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">Showing {filteredExchanges.length} of {rewardExchanges.length} entries</span>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              className="border-[#FDDF23] hover:bg-[#FDDF23] hover:text-black"
              disabled
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              className="border-[#FDDF23] hover:bg-[#FDDF23] hover:text-black"
              disabled
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

