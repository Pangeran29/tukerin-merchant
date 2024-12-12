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

export default function RewardCataloguePage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Input 
              placeholder="Cari Hadiah" 
              className="pl-10 bg-white border-[#FDDF23]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-[#FDDF23] hover:bg-[#FDDF23] hover:text-black">
              Pilih Periode
            </Button>
            <Button variant="outline" className="border-[#FDDF23] hover:bg-[#FDDF23] hover:text-black">
              Pilih Periode
            </Button>
            <Select>
              <SelectTrigger className="w-[180px] border-[#FDDF23]">
                <SelectValue placeholder="Tipe Hadiah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Hadiah</SelectItem>
                <SelectItem value="voucher">Voucher</SelectItem>
                <SelectItem value="physical">Barang Fisik</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="hadiah-habis" />
              <Label htmlFor="hadiah-habis">Hadiah Habis</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hadiah-gratis" />
              <Label htmlFor="hadiah-gratis">Hadiah Gratis</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hadiah-draf" />
              <Label htmlFor="hadiah-draf">Hadiah Draf</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hadiah-unggulan" />
              <Label htmlFor="hadiah-unggulan">Hadiah Unggulan</Label>
            </div>
          </div>
        </div>

        {/* Reward Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Add New Reward Card */}
          <Link href="/reward-catalogue/add" className="block">
            <div className="border border-dashed border-[#FDDF23] rounded-lg p-4 flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-gray-50">
              <div className="w-12 h-12 rounded-full bg-[#FDDF23] flex items-center justify-center mb-2">
                <Plus className="w-6 h-6 text-black" />
              </div>
              <span className="text-black">Tambah Hadiah</span>
            </div>
          </Link>

          {/* Reward Cards */}
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="border border-[#FDDF23] rounded-lg overflow-hidden bg-white">
              <div className="aspect-square relative">
                <img
                  src="/placeholder.svg"
                  alt="Voucher Discount"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-black mb-2">Voucher Discount 20%</h3>
                <p className="text-sm text-gray-600">
                  1 December 2024 - 31 December 2024
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">8 / 16</span>
          <Button 
            variant="outline" 
            className="border-[#FDDF23] hover:bg-[#FDDF23] hover:text-black"
          >
            Next
          </Button>
        </div>
      </div>
    </Layout>
  )
}

