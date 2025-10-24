'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Bell, 
  Settings, 
  LogOut,
  User,
  ChevronDown
} from 'lucide-react'

interface HeaderProps {
  onSearch: (value: string) => void
  searchValue: string
}

export function Header({ onSearch, searchValue }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const notifications = [
    { id: 1, title: 'Chứng thư mới', message: 'CT-2024-001 đã được duyệt', time: '5 phút trước', read: false },
    { id: 2, title: 'Task sắp hết hạn', message: 'Kiểm tra hệ thống điện XYZ', time: '1 giờ trước', read: false },
    { id: 3, title: 'Báo cáo mới', message: 'Báo cáo giám định máy phát điện', time: '2 giờ trước', read: true }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="bg-white border-b border-[#D1E5F0] px-3 py-2.5">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm..."
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-7 pr-3 h-7 text-sm bg-white border-[#D1E5F0] focus:bg-white focus:border-[#3A7BD5]"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 ml-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative h-7 w-7 p-0 hover:bg-[#E1EEFA]"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-sm bg-[#3A7BD5]">
                  {unreadCount}
                </Badge>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-1 w-72 bg-white rounded-sm shadow-sm border border-[#D1E5F0] z-50">
                <div className="p-2 border-b border-[#D1E5F0]">
                  <h3 className="text-sm font-semibold text-[#1A365D]">Thông báo</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-2 border-b border-[#F0F7FC] hover:bg-[#F8FBFF] cursor-pointer text-sm ${!notif.read ? 'bg-[#E1EEFA]' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{notif.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{notif.message}</p>
                          <p className="text-sm text-slate-400 mt-1">{notif.time}</p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-[#3A7BD5] rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-1 h-7 px-2 hover:bg-[#E1EEFA]"
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-sm">ND</AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4" />
            </Button>

            {showProfile && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-sm shadow-sm border border-[#D1E5F0] z-50">
                <div className="p-2 border-b border-[#D1E5F0]">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-sm">ND</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Nguyễn Văn D</p>
                      <p className="text-sm text-slate-600">admin@gpems.net</p>
                    </div>
                  </div>
                </div>
                <div className="p-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start h-7 text-sm hover:bg-[#E1EEFA]">
                    <User className="w-4 h-4 mr-1" />
                    Hồ sơ
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start h-7 text-sm hover:bg-[#E1EEFA]">
                    <Settings className="w-4 h-4 mr-1" />
                    Cài đặt
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start h-7 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4 mr-1" />
                    Đăng xuất
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}