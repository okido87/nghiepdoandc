'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AppLayout } from '@/components/app-layout'
import { 
  Settings, 
  Save, 
  Download, 
  Upload,
  Shield,
  Bell,
  Database,
  Mail,
  Lock,
  Globe,
  Palette,
  Users,
  FileText,
  Smartphone,
  Monitor,
  Key,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

interface SystemSetting {
  id: string
  category: string
  title: string
  description: string
  type: 'switch' | 'input' | 'select' | 'textarea'
  value: string | boolean | number
  options?: string[]
  required?: boolean
  icon?: React.ReactNode
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSetting[]>([
    // General Settings
    {
      id: 'company_name',
      category: 'Chung',
      title: 'Tên công ty',
      description: 'Tên chính thức của công ty',
      type: 'input',
      value: 'Công ty Giám định ABC',
      required: true,
      icon: <Building className="w-4 h-4" />
    },
    {
      id: 'company_address',
      category: 'Chung',
      title: 'Địa chỉ công ty',
      description: 'Địa chỉ trụ sở chính',
      type: 'input',
      value: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      required: true,
      icon: <MapPin className="w-4 h-4" />
    },
    {
      id: 'company_phone',
      category: 'Chung',
      title: 'Điện thoại',
      description: 'Số điện thoại liên hệ',
      type: 'input',
      value: '028-3821-2345',
      required: true,
      icon: <Phone className="w-4 h-4" />
    },
    {
      id: 'company_email',
      category: 'Chung',
      title: 'Email',
      description: 'Email liên hệ chính',
      type: 'input',
      value: 'info@giamdinhabc.vn',
      required: true,
      icon: <Mail className="w-4 h-4" />
    },
    {
      id: 'company_website',
      category: 'Chung',
      title: 'Website',
      description: 'Địa chỉ website công ty',
      type: 'input',
      value: 'www.giamdinhabc.vn',
      required: false,
      icon: <Globe className="w-4 h-4" />
    },
    {
      id: 'tax_code',
      category: 'Chung',
      title: 'Mã số thuế',
      description: 'Mã số thuế của công ty',
      type: 'input',
      value: '0123456789',
      required: true,
      icon: <FileText className="w-4 h-4" />
    },
    
    // System Settings
    {
      id: 'system_timezone',
      category: 'Hệ thống',
      title: 'Múi giờ',
      description: 'Múi giờ mặc định của hệ thống',
      type: 'select',
      value: 'Asia/Ho_Chi_Minh',
      options: ['Asia/Ho_Chi_Minh', 'Asia/Hanoi', 'UTC'],
      required: true,
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: 'system_language',
      category: 'Hệ thống',
      title: 'Ngôn ngữ',
      description: 'Ngôn ngữ giao diện mặc định',
      type: 'select',
      value: 'Vietnamese',
      options: ['Vietnamese', 'English'],
      required: true,
      icon: <Globe className="w-4 h-4" />
    },
    {
      id: 'system_currency',
      category: 'Hệ thống',
      title: 'Tiền tệ',
      description: 'Đơn vị tiền tệ mặc định',
      type: 'select',
      value: 'VND',
      options: ['VND', 'USD', 'EUR'],
      required: true,
      icon: <DollarSign className="w-4 h-4" />
    },
    {
      id: 'auto_backup',
      category: 'Hệ thống',
      title: 'Sao lưu tự động',
      description: 'Tự động sao lưu dữ liệu hàng ngày',
      type: 'switch',
      value: true,
      required: false,
      icon: <Database className="w-4 h-4" />
    },
    {
      id: 'backup_time',
      category: 'Hệ thống',
      title: 'Thời gian sao lưu',
      description: 'Giờ thực hiện sao lưu tự động',
      type: 'select',
      value: '02:00',
      options: ['01:00', '02:00', '03:00', '04:00'],
      required: false,
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: 'data_retention',
      category: 'Hệ thống',
      title: 'Thời gian lưu trữ dữ liệu',
      description: 'Số năm lưu trữ dữ liệu',
      type: 'select',
      value: 7,
      options: ['3', '5', '7', '10'],
      required: true,
      icon: <Database className="w-4 h-4" />
    },
    
    // Security Settings
    {
      id: 'password_policy',
      category: 'Bảo mật',
      title: 'Chính sách mật khẩu',
      description: 'Yêu cầu độ mạnh mật khẩu',
      type: 'switch',
      value: true,
      required: false,
      icon: <Lock className="w-4 h-4" />
    },
    {
      id: 'password_length',
      category: 'Bảo mật',
      title: 'Độ dài mật khẩu tối thiểu',
      description: 'Số ký tự tối thiểu cho mật khẩu',
      type: 'select',
      value: 8,
      options: ['6', '8', '10', '12'],
      required: true,
      icon: <Key className="w-4 h-4" />
    },
    {
      id: 'session_timeout',
      category: 'Bảo mật',
      title: 'Thời gian hết hạn phiên',
      description: 'Thời gian tự động đăng xuất (phút)',
      type: 'select',
      value: 30,
      options: ['15', '30', '60', '120'],
      required: true,
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: 'two_factor_auth',
      category: 'Bảo mật',
      title: 'Xác thực hai yếu tố',
      description: 'Bắt buộc xác thực hai yếu tố cho admin',
      type: 'switch',
      value: false,
      required: false,
      icon: <Shield className="w-4 h-4" />
    },
    {
      id: 'login_attempts',
      category: 'Bảo mật',
      title: 'Số lần đăng nhập sai',
      description: 'Số lần đăng nhập sai trước khi khóa tài khoản',
      type: 'select',
      value: 5,
      options: ['3', '5', '7', '10'],
      required: true,
      icon: <Lock className="w-4 h-4" />
    },
    
    // Notification Settings
    {
      id: 'email_notifications',
      category: 'Thông báo',
      title: 'Thông báo email',
      description: 'Bật thông báo qua email',
      type: 'switch',
      value: true,
      required: false,
      icon: <Mail className="w-4 h-4" />
    },
    {
      id: 'system_notifications',
      category: 'Thông báo',
      title: 'Thông báo hệ thống',
      description: 'Hiển thị thông báo trong hệ thống',
      type: 'switch',
      value: true,
      required: false,
      icon: <Bell className="w-4 h-4" />
    },
    {
      id: 'certificate_expiry_alert',
      category: 'Thông báo',
      title: 'Cảnh báo hết hạn chứng thư',
      description: 'Số ngày trước khi hết hạn để cảnh báo',
      type: 'select',
      value: 30,
      options: ['7', '15', '30', '60'],
      required: true,
      icon: <AlertTriangle className="w-4 h-4" />
    },
    {
      id: 'maintenance_reminder',
      category: 'Thông báo',
      title: 'Nhắc nhở bảo dưỡng',
      description: 'Nhắc nhở lịch bảo dưỡng thiết bị',
      type: 'switch',
      value: true,
      required: false,
      icon: <RefreshCw className="w-4 h-4" />
    },
    
    // UI Settings
    {
      id: 'theme',
      category: 'Giao diện',
      title: 'Chủ đề',
      description: 'Chủ đề giao diện hệ thống',
      type: 'select',
      value: 'Light',
      options: ['Light', 'Dark', 'Auto'],
      required: true,
      icon: <Palette className="w-4 h-4" />
    },
    {
      id: 'primary_color',
      category: 'Giao diện',
      title: 'Màu chính',
      description: 'Màu chủ đạo của giao diện',
      type: 'select',
      value: 'Blue',
      options: ['Blue', 'Green', 'Purple', 'Orange'],
      required: true,
      icon: <Palette className="w-4 h-4" />
    },
    {
      id: 'compact_mode',
      category: 'Giao diện',
      title: 'Chế độ thu gọn',
      description: 'Thu gọn giao diện để tối ưu không gian',
      type: 'switch',
      value: false,
      required: false,
      icon: <Monitor className="w-4 h-4" />
    },
    {
      id: 'mobile_responsive',
      category: 'Giao diện',
      title: 'Tối ưu di động',
      description: 'Tự động tối ưu cho thiết bị di động',
      type: 'switch',
      value: true,
      required: false,
      icon: <Smartphone className="w-4 h-4" />
    },
    
    // User Settings
    {
      id: 'user_registration',
      category: 'Người dùng',
      title: 'Cho phép đăng ký',
      description: 'Cho phép người dùng mới tự đăng ký',
      type: 'switch',
      value: false,
      required: false,
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 'email_verification',
      category: 'Người dùng',
      title: 'Xác thực email',
      description: 'Bắt buộc xác thực email khi đăng ký',
      type: 'switch',
      value: true,
      required: false,
      icon: <Mail className="w-4 h-4" />
    },
    {
      id: 'default_role',
      category: 'Người dùng',
      title: 'Vai trò mặc định',
      description: 'Vai trò mặc định cho người dùng mới',
      type: 'select',
      value: 'User',
      options: ['User', 'Viewer', 'Inspector'],
      required: true,
      icon: <Shield className="w-4 h-4" />
    },
    {
      id: 'profile_completion',
      category: 'Người dùng',
      title: 'Yêu cầu hoàn thành hồ sơ',
      description: 'Bắt buộc hoàn thành hồ sơ trước khi sử dụng',
      type: 'switch',
      value: true,
      required: false,
      icon: <Users className="w-4 h-4" />
    }
  ])

  const categories = Array.from(new Set(settings.map(s => s.category)))

  const updateSetting = (id: string, value: any) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, value } : setting
      )
    )
  }

  const saveSettings = () => {
    // Here you would typically save to backend
    console.log('Saving settings:', settings)
    // Show success message
  }

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'system-settings.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string)
          setSettings(importedSettings)
        } catch (error) {
          console.error('Error importing settings:', error)
        }
      }
      reader.readAsText(file)
    }
  }

  const renderSettingInput = (setting: SystemSetting) => {
    switch (setting.type) {
      case 'switch':
        return (
          <Switch
            checked={setting.value as boolean}
            onCheckedChange={(checked) => updateSetting(setting.id, checked)}
          />
        )
      case 'input':
        return (
          <Input
            value={setting.value as string}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            placeholder={setting.description}
          />
        )
      case 'select':
        return (
          <select
            value={setting.value as string}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {setting.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      case 'textarea':
        return (
          <textarea
            value={setting.value as string}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            placeholder={setting.description}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        )
      default:
        return null
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      'Chung': <Building className="w-5 h-5 text-blue-600" />,
      'Hệ thống': <Database className="w-5 h-5 text-purple-600" />,
      'Bảo mật': <Shield className="w-5 h-5 text-red-600" />,
      'Thông báo': <Bell className="w-5 h-5 text-orange-600" />,
      'Giao diện': <Palette className="w-5 h-5 text-pink-600" />,
      'Người dùng': <Users className="w-5 h-5 text-green-600" />
    }
    return icons[category] || <Settings className="w-5 h-5 text-gray-600" />
  }

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Cài đặt Hệ thống</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="w-4 h-4 mr-2" />
            Xuất cài đặt
          </Button>
          <Button variant="outline" onClick={() => document.getElementById('import-settings')?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Nhập cài đặt
          </Button>
          <input
            id="import-settings"
            type="file"
            accept=".json"
            onChange={importSettings}
            className="hidden"
          />
          <Button onClick={saveSettings} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Lưu cài đặt
          </Button>
        </div>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Trạng thái Hệ thống
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs">Hệ thống: Hoạt động</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs">CSDL: Kết nối</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs">Backup: Hoàn thành</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs">Phiên bản: 2.1.0</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs defaultValue="Chung" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="flex items-center gap-2">
              {getCategoryIcon(category)}
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  {getCategoryIcon(category)}
                  <span className="ml-2">{category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {settings
                    .filter(setting => setting.category === category)
                    .map(setting => (
                      <div key={setting.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            {setting.icon}
                            <label className="text-sm font-medium text-slate-900">
                              {setting.title}
                              {setting.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                          </div>
                          <p className="text-xs text-slate-500">{setting.description}</p>
                        </div>
                        <div className="md:col-span-2">
                          {renderSettingInput(setting)}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thao tác Nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full justify-start">
              <RefreshCw className="w-4 h-4 mr-2" />
              Khởi động lại hệ thống
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Database className="w-4 h-4 mr-2" />
              Sao lưu dữ liệu ngay
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Kiểm tra bảo mật
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Last Updated */}
      <div className="text-center text-sm text-slate-500">
        <p>Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}</p>
      </div>
      </div>
    </AppLayout>
  )
}

// Import missing icons
import { Building, MapPin, Phone, DollarSign, Clock } from 'lucide-react'