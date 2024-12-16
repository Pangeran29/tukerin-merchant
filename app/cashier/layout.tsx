import { ReactNode } from "react";

export default function CashierLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen">
      <header className="mx-auto max-w-7xl bg-primary px-4 py-4 text-black sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Sip n Sup x Tukerin Cashier</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
