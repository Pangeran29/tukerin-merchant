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
import { Card, CardContent } from '@/components/ui/card'

export default function PointCataloguePage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Input 
              placeholder="Cari Poin" 
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
                <SelectValue placeholder="Tipe Poin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Poin</SelectItem>
                <SelectItem value="regular">Poin Reguler</SelectItem>
                <SelectItem value="bonus">Poin Bonus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="poin-aktif" />
              <Label htmlFor="poin-aktif">Poin Aktif</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="poin-kadaluarsa" />
              <Label htmlFor="poin-kadaluarsa">Poin Kadaluarsa</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="poin-draf" />
              <Label htmlFor="poin-draf">Poin Draf</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="poin-unggulan" />
              <Label htmlFor="poin-unggulan">Poin Unggulan</Label>
            </div>
          </div>
        </div>

        {/* Point Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add New Point Card */}
          <Card className="border border-dashed border-[#FDDF23] bg-white hover:bg-gray-50 cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 rounded-full bg-[#FDDF23] flex items-center justify-center mb-2">
                <Plus className="w-6 h-6 text-black" />
              </div>
              <span className="text-black">Tambah Poin</span>
            </CardContent>
          </Card>

          {/* Point Cards */}
          {[
            { title: "Poin Belanja", description: "Dapatkan 1 poin untuk setiap pembelian Rp 10.000", points: 1 },
            { title: "Poin Ulang Tahun", description: "Bonus poin spesial di bulan ulang tahun Anda", points: 100 },
            { title: "Poin Referral", description: "Ajak teman dan dapatkan poin bonus", points: 50 },
            { title: "Poin Review", description: "Berikan ulasan produk dan dapatkan poin", points: 5 },
            { title: "Poin Check-in", description: "Check-in di toko kami dan kumpulkan poin", points: 2 },
            { title: "Poin Loyalitas", description: "Poin bonus untuk pelanggan setia", points: 200 },
            { title: "Poin Sosial Media", description: "Bagikan pembelian Anda di sosial media", points: 10 },
          ].map((item, index) => (
            <Card key={index} className="border border-[#FDDF23] bg-white">
              <CardContent className="p-4">
                <h3 className="font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <div className="text-lg font-bold text-[#FDDF23]">{item.points} Poin</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">1 / 3</span>
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

