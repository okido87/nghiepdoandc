import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { 
  Menu, 
  X, 
  Home, 
  FileCheck, 
  FileText, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  Bell,
  Search,
  TrendingUp,
  ClipboardList,
  CheckSquare,
  Clock,
  AlertTriangle,
  GitBranch,
  Camera,
  MessageSquare,
  Upload,
  User,
  Activity
} from 'lucide-react'

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

const menuItems = [
  { icon: Home, label: 'Tổng quan', href: '/', badge: null },
  { icon: FileCheck, label: 'Orders', href: '/orders', badge: '12' },
  { icon: ClipboardList, label: 'Kế hoạch', href: '/plans', badge: null },
  { icon: Users, label: 'Khách hàng', href: '/customers', badge: null },
  { icon: GitBranch, label: 'Chi nhánh', href: '/branches', badge: null },
  { icon: Users, label: 'Nhân sự', href: '/rasci', badge: null },
  { icon: Camera, label: 'Báo cáo', href: '/reports', badge: '3' },
  { icon: AlertTriangle, label: 'EAIP', href: '/eaip', badge: '2' },
  { icon: GitBranch, label: 'Timeline', href: '/timeline', badge: null },
  { icon: CheckSquare, label: 'Tasks', href: '/tasks', badge: '23' },
  { icon: User, label: 'Users', href: '/users', badge: null },
  { icon: Settings, label: 'Phân quyền', href: '/permissions', badge: null },
  { icon: BarChart3, label: 'Master Data', href: '/master-data', badge: null },
  { icon: Activity, label: 'Quy trình', href: '/workflows', badge: null },
  { icon: BarChart3, label: 'Analytics', href: '/analytics', badge: null },
  { icon: TrendingUp, label: 'Thu Chi', href: '/finance', badge: null },
  { icon: Settings, label: 'Cài đặt', href: '/settings', badge: null }
]

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <div className={`relative bg-[#F8FBFF] border-r border-[#D1E5F0] transition-all duration-300 ${isCollapsed ? 'w-14' : 'w-64'}`}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="absolute -right-3 top-4 z-10 h-6 w-6 rounded-full bg-white border border-[#D1E5F0] shadow-sm hover:bg-slate-50"
      >
        {isCollapsed ? (
          <Menu className="h-4 w-4" />
        ) : (
          <X className="h-4 w-4" />
        )}
      </Button>

      {/* Logo */}
      <div className="p-2 border-b border-[#D1E5F0]">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            <img 
              src="https://gpems.net/logo-icon.png" 
              alt="EMS SOLUTION" 
              className="w-6 h-6 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="w-6 h-6 bg-gradient-to-r from-[#3A7BD5] to-[#5AB2F2] rounded-sm flex items-center justify-center" style={{display: 'none'}}>
              <FileCheck className="w-4 h-4 text-white" />
            </div>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-base font-bold text-[#1A365D]">Giám định</h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 h-[calc(100vh-6rem)]">
        <nav className="p-1 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full justify-start h-7 ${isCollapsed ? 'px-1' : 'px-2'} hover:bg-[#E1EEFA] text-sm`}
              asChild
            >
              <Link href={item.href} className="flex items-center">
                <item.icon className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'}`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-sm h-5 px-1">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}