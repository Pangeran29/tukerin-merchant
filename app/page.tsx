import Layout from './components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Users, FileText, ArrowUpRight } from 'lucide-react'

export default function DashboardPage() {
  return (
    <Layout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border border-[#FDDF23]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Total Users</CardTitle>
            <Users className="h-4 w-4 text-[#FDDF23]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">1,234</div>
            <p className="text-xs text-black">+10% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-[#FDDF23]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-[#FDDF23]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">567</div>
            <p className="text-xs text-black">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-[#FDDF23]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Page Views</CardTitle>
            <BarChart className="h-4 w-4 text-[#FDDF23]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">45,678</div>
            <p className="text-xs text-black">+20% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-[#FDDF23]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Engagement Rate</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-[#FDDF23]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">5.67%</div>
            <p className="text-xs text-black">+2% from last month</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

