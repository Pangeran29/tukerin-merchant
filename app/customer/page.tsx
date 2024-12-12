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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Mock data for customers
const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', address: '123 Main St, City, Country', totalPoints: 1500 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1987654321', address: '456 Elm St, Town, Country', totalPoints: 2200 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1122334455', address: '789 Oak St, Village, Country', totalPoints: 1800 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1555666777', address: '321 Pine St, Hamlet, Country', totalPoints: 3000 },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', phone: '+1999888777', address: '654 Maple St, Borough, Country', totalPoints: 900 },
]

export default function CustomerPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredAndSortedCustomers = customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    )
    .sort((a, b) => 
      sortOrder === 'desc' ? b.totalPoints - a.totalPoints : a.totalPoints - b.totalPoints
    )

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-black">Customer List</h1>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-64">
            <Input 
              placeholder="Search customers" 
              className="pl-10 bg-white border-[#FDDF23]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <div className="w-full sm:w-auto">
            <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
              <SelectTrigger className="w-full sm:w-[200px] border-[#FDDF23]">
                <SelectValue placeholder="Sort by total points" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Highest points first</SelectItem>
                <SelectItem value="asc">Lowest points first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#FDDF23] rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-[#FDDF23]">
              <TableRow>
                <TableHead className="text-black">Name</TableHead>
                <TableHead className="text-black">Email</TableHead>
                <TableHead className="text-black">Phone Number</TableHead>
                <TableHead className="text-black">Address</TableHead>
                <TableHead className="text-black">Total Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.totalPoints}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">Showing {filteredAndSortedCustomers.length} of {customers.length} customers</span>
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

