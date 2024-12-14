'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Gift, Coins, RefreshCw, Users, LogOut, Menu, X } from 'lucide-react'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-quaternary shadow-md">
        <div className="p-4 bg-[#FDDF23]">
          <h1 className="text-2xl font-bold text-black">CMS Dashboard</h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                pathname === item.href ? 'bg-gray-100 border-r-4 border-[#FDDF23]' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full text-text hover:bg-tertiary"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-quaternary shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {navItems.find((item) => item.href === pathname)?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
              <div className="hidden md:flex items-center">
                <Users className="w-8 h-8 text-[#FDDF23]" />
                <span className="ml-2 text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-quaternary shadow-md">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </nav>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-quaternary">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

