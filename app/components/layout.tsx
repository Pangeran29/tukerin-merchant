'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Gift, Coins, RefreshCw, Users, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Gift, label: 'Reward Catalogue', href: '/reward-catalogue' },
  { icon: Coins, label: 'Point Catalogue', href: '/point-catalogue' },
  { icon: RefreshCw, label: 'Reward Exchange', href: '/reward-exchange' },
  { icon: RefreshCw, label: 'Point Exchange', href: '/point-exchange' },
  { icon: Users, label: 'Customer', href: '/customer' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus !== 'true') {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    router.push('/login')
  }

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-black">CMS Dashboard</h1>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 text-black hover:bg-[#FDDF23] ${
                pathname === item.href ? 'bg-[#FDDF23]' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">
              {navItems.find((item) => item.href === pathname)?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center">
              <Users className="w-8 h-8 text-[#FDDF23]" />
              <span className="ml-2 text-black">John Doe</span>
              <Button
                variant="ghost"
                className="ml-4 text-black hover:bg-[#FDDF23]"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

