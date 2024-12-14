import { ReactNode } from 'react'

export default function CashierLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#FDDF23] text-black p-4">
        <h1 className="text-2xl font-bold">Makmur Jaya Coffee Roaster</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

