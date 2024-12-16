'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import { Search, Filter, Download, MoreHorizontal } from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for point exchanges
const pointExchanges = [
  { id: 1, pointCatalogue: 'Welcome Bonus', customer: 'John Doe', pointsClaimed: 500, date: '2023-05-15', status: 'Completed' },
  { id: 2, pointCatalogue: 'Purchase Reward', customer: 'Jane Smith', pointsClaimed: 100, date: '2023-05-16', status: 'Pending' },
  { id: 3, pointCatalogue: 'Referral Bonus', customer: 'Bob Johnson', pointsClaimed: 250, date: '2023-05-17', status: 'Completed' },
  { id: 4, pointCatalogue: 'Birthday Points', customer: 'Alice Brown', pointsClaimed: 1000, date: '2023-05-18', status: 'Completed' },
  { id: 5, pointCatalogue: 'Loyalty Milestone', customer: 'Charlie Davis', pointsClaimed: 5000, date: '2023-05-19', status: 'Pending' },
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Point Exchange</h1>
          <Button className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
            <Download className="w-5 h-5 mr-2" /> Export Data
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Exchange Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800">Total Exchanges</h3>
                <p className="text-3xl font-bold text-blue-600">{pointExchanges.length}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">Completed Exchanges</h3>
                <p className="text-3xl font-bold text-green-600">
                  {pointExchanges.filter(e => e.status === 'Completed').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800">Pending Exchanges</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {pointExchanges.filter(e => e.status === 'Pending').length}
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800">Total Points Exchanged</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {pointExchanges.reduce((sum, e) => sum + e.pointsClaimed, 0).toLocaleString()}
                </p>
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
                  placeholder="Search exchanges" 
                  className="pl-10 bg-white border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Select>
                  <SelectTrigger className="w-[150px] border-gray-300 bg-white">
                    <SelectValue placeholder="Status"/>
                  </SelectTrigger>
                  <SelectContent className='bg-[#FBFBFB]'>
                    <SelectItem value="all" className='hover:bg-[#FDDF23]/80'>All Status</SelectItem>
                    <SelectItem value="completed" className='hover:bg-[#FDDF23]/80'>Completed</SelectItem>
                    <SelectItem value="pending" className='hover:bg-[#FDDF23]/80'>Pending</SelectItem>
                  </SelectContent>
                </Select>
             
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Point Catalogue</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Points Claimed</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExchanges.map((exchange) => (
                  <TableRow key={exchange.id}>
                    <TableCell className="font-medium">{exchange.pointCatalogue}</TableCell>
                    <TableCell>{exchange.customer}</TableCell>
                    <TableCell>{exchange.pointsClaimed.toLocaleString()}</TableCell>
                    <TableCell>{exchange.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        exchange.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {exchange.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Exchange</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Cancel Exchange</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">Showing {filteredExchanges.length} of {pointExchanges.length} exchanges</span>
          <div className="space-x-2">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

