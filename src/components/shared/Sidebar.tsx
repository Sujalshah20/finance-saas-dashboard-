'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Users, FileText, Calendar, CheckSquare, Activity
} from 'lucide-react';

export const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: FileText, label: 'Invoicing', href: '/invoicing' },
  { icon: Users, label: 'Contacts', href: '/contacts' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: CheckSquare, label: 'Todo List', href: '/todo' },
  { icon: Activity, label: 'Latest Activity', href: '/activity' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-full flex-col hidden md:flex">
      <div className="h-20 flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-6 bg-orange-400 rounded-full"></div>
            <div className="w-2 h-6 bg-yellow-400 rounded-full"></div>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800 ml-1">NEXORA</span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "text-slate-900 font-semibold bg-slate-50" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-slate-700" : "text-slate-400")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

