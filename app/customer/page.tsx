'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import { Search, UserPlus, Filter, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
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

// Mock data for customers
const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', address: '123 Main St, City, Country', totalPoints: 1500, status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1987654321', address: '456 Elm St, Town, Country', totalPoints: 2200, status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1122334455', address: '789 Oak St, Village, Country', totalPoints: 1800, status: 'active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1555666777', address: '321 Pine St, Hamlet, Country', totalPoints: 3000, status: 'active' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', phone: '+1999888777', address: '654 Maple St, Borough, Country', totalPoints: 900, status: 'inactive' },
]

export default function CustomerPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [sortField, setSortField] = useState<'name' | 'totalPoints'>('totalPoints')

  const filteredAndSortedCustomers = customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else {
        return sortOrder === 'asc' ? a.totalPoints - b.totalPoints : b.totalPoints - a.totalPoints
      }
    })

  const handleSort = (field: 'name' | 'totalPoints') => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <Button className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
            <UserPlus className="w-5 h-5 mr-2" /> Add New Customer
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800">Total Customers</h3>
                <p className="text-3xl font-bold text-blue-600">{customers.length}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">Active Customers</h3>
                <p className="text-3xl font-bold text-green-600">{customers.filter(c => c.status === 'active').length}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800">Avg. Points</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {Math.round(customers.reduce((sum, c) => sum + c.totalPoints, 0) / customers.length)}
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800">Top Customer Points</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {Math.max(...customers.map(c => c.totalPoints))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Search customers" 
                  className="pl-10 bg-white border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Select>
                  <SelectTrigger className="w-[150px] border-gray-300">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-gray-300">
                  <Filter className="w-4 h-4 mr-2" /> More Filters
                </Button>
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
                  <TableHead className="w-[250px]">
                    <button className="flex items-center" onClick={() => handleSort('name')}>
                      Name
                      {sortField === 'name' && (sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
                    </button>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort('totalPoints')}>
                      Total Points
                      {sortField === 'totalPoints' && (sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
                    </button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
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
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Customer</DropdownMenuItem>
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
          <span className="text-sm text-gray-600">Showing {filteredAndSortedCustomers.length} of {customers.length} customers</span>
          <div className="space-x-2">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

