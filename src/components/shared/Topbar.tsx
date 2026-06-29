'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, HelpCircle, Settings, Bell, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { navItems } from './Sidebar';

export function Topbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-20 bg-transparent flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-xl">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search here..."
              className="pl-11 bg-white border-0 shadow-sm h-11 rounded-full focus-visible:ring-1 text-sm font-medium placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-5 text-slate-500">
            <button className="hover:text-slate-700 transition-colors" aria-label="Help"><HelpCircle className="w-5 h-5" /></button>
            <button className="hover:text-slate-700 transition-colors" aria-label="Settings"><Settings className="w-5 h-5" /></button>
            <button className="relative hover:text-slate-700 transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#F8FAFC]"></span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right flex flex-col justify-center">
              <span className="text-xs text-slate-500 font-medium leading-none mb-1">Admin</span>
              <span className="text-sm font-bold text-slate-900 leading-none">John Doe</span>
            </div>
            <Avatar className="h-10 w-10 border border-slate-200">
              <AvatarImage src="" alt="John Doe" />
              <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative h-full w-[min(92vw,320px)] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <div className="text-lg font-semibold text-slate-900">Navigation</div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
