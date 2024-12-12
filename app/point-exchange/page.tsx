'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock data for the table
const pointExchanges = [
  { id: 1, pointCatalogue: 'Welcome Bonus', customer: 'John Doe', pointsClaimed: 500 },
  { id: 2, pointCatalogue: 'Purchase Reward', customer: 'Jane Smith', pointsClaimed: 100 },
  { id: 3, pointCatalogue: 'Referral Bonus', customer: 'Bob Johnson', pointsClaimed: 250 },
  { id: 4, pointCatalogue: 'Birthday Points', customer: 'Alice Brown', pointsClaimed: 1000 },
  { id: 5, pointCatalogue: 'Loyalty Milestone', customer: 'Charlie Davis', pointsClaimed: 5000 },
]

export default function PointExchangePage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredExchanges = pointExchanges.filter(exchange =>
    exchange.pointCatalogue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exchange.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <div className="space-y-6">

        {/* Search */}
        <div className="relative w-full sm:w-96">
          <Input 
            placeholder="Search point catalogues or customers" 
            className="pl-10 bg-white border-[#FDDF23]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        {/* Table */}
        <div className="border border-[#FDDF23] rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-[#FDDF23]">
              <TableRow>
                <TableHead className="text-black">Point Catalogue</TableHead>
                <TableHead className="text-black">Customer</TableHead>
                <TableHead className="text-black">Points Claimed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExchanges.map((exchange) => (
                <TableRow key={exchange.id}>
                  <TableCell className="font-medium">{exchange.pointCatalogue}</TableCell>
                  <TableCell>{exchange.customer}</TableCell>
                  <TableCell>{exchange.pointsClaimed.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">Showing {filteredExchanges.length} of {pointExchanges.length} entries</span>
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

