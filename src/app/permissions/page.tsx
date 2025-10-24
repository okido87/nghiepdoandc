'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AppLayout } from '@/components/app-layout'
import { 
  Settings, 
  Plus, 
  Search, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Filter,
  User,
  Shield,
  Key,
  Lock,
  Unlock,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface Permission {
  id: number
  roleName: string
  module: string
  permissions: string[]
  users: number
  description: string
  createdDate: string
  modifiedDate: string
  status: 'Active' | 'Inactive'
  level: 'Full' | 'Partial' | 'Read Only'
  restrictions: string[]
}

const mockPermissions: Permission[] = [
  { 
    id: 1, 
    roleName: 'Super Admin', 
    module: 'Hệ thống', 
    permissions: ['Tạo', 'Đọc', 'Cập nhật', 'Xóa', 'Phân quyền', 'Cài đặt hệ thống'], 
    users: 2, 
    description: 'Quyền quản trị cao nhất, toàn quyền truy cập hệ thống', 
    createdDate: '2024-01-01', 
    modifiedDate: '2024-01-15', 
    status: 'Active', 
    level: 'Full', 
    restrictions: []
  },
  { 
    id: 2, 
    roleName: 'Quản lý Giám định', 
    module: 'Giám định', 
    permissions: ['Tạo chứng thư', 'Đọc chứng thư', 'Cập nhật chứng thư', 'Duyệt chứng thư', 'Xem báo cáo'], 
    users: 5, 
    description: 'Quản lý tất cả hoạt động giám định và chứng thư', 
    createdDate: '2024-01-02', 
    modifiedDate: '2024-01-20', 
    status: 'Active', 
    level: 'Full', 
    restrictions: ['Không thể xóa chứng thư đã duyệt']
  },
  { 
    id: 3, 
    roleName: 'Giám định viên', 
    module: 'Giám định', 
    permissions: ['Đọc chứng thư', 'Cập nhật chứng thư', 'Tạo báo cáo', 'Tải lên tài liệu'], 
    users: 15, 
    description: 'Thực hiện các công việc giám định tại hiện trường', 
    createdDate: '2024-01-03', 
    modifiedDate: '2024-01-18', 
    status: 'Active', 
    level: 'Partial', 
    restrictions: ['Không thể duyệt chứng thư', 'Không thể xóa chứng thư']
  },
  { 
    id: 4, 
    roleName: 'Kỹ thuật viên', 
    module: 'Kỹ thuật', 
    permissions: ['Đọc kế hoạch', 'Cập nhật tiến độ', 'Tạo báo cáo kỹ thuật'], 
    users: 8, 
    description: 'Thực hiện các công việc kỹ thuật chuyên môn', 
    createdDate: '2024-01-04', 
    modifiedDate: '2024-01-22', 
    status: 'Active', 
    level: 'Partial', 
    restrictions: ['Không thể tạo kế hoạch mới', 'Không thể duyệt báo cáo']
  },
  { 
    id: 5, 
    roleName: 'Quản lý Dự án', 
    module: 'Dự án', 
    permissions: ['Tạo dự án', 'Đọc dự án', 'Cập nhật dự án', 'Xóa dự án', 'Phân công nhân sự'], 
    users: 3, 
    description: 'Quản lý toàn bộ dự án giám định', 
    createdDate: '2024-01-05', 
    modifiedDate: '2024-01-25', 
    status: 'Active', 
    level: 'Full', 
    restrictions: ['Không thể thay đổi ngân sách đã duyệt']
  },
  { 
    id: 6, 
    roleName: 'Kế toán', 
    module: 'Tài chính', 
    permissions: ['Đọc hóa đơn', 'Tạo hóa đơn', 'Cập nhật hóa đơn', 'Xem báo cáo tài chính'], 
    users: 4, 
    description: 'Quản lý các vấn đề tài chính, hóa đơn', 
    createdDate: '2024-01-06', 
    modifiedDate: '2024-01-19', 
    status: 'Active', 
    level: 'Partial', 
    restrictions: ['Không thể xóa hóa đơn đã xuất', 'Không thể thay đổi tỷ giá']
  },
  { 
    id: 7, 
    roleName: 'Nhân viên Kinh doanh', 
    module: 'Kinh doanh', 
    permissions: ['Tạo khách hàng', 'Đọc khách hàng', 'Cập nhật khách hàng', 'Tạo báo giá'], 
    users: 6, 
    description: 'Quản lý khách hàng và hoạt động kinh doanh', 
    createdDate: '2024-01-07', 
    modifiedDate: '2024-01-21', 
    status: 'Active', 
    level: 'Partial', 
    restrictions: ['Không thể xóa khách hàng', 'Không thể duyệt báo giá']
  },
  { 
    id: 8, 
    roleName: 'Quản lý Nhân sự', 
    module: 'Nhân sự', 
    permissions: ['Tạo nhân viên', 'Đọc nhân viên', 'Cập nhật nhân viên', 'Xóa nhân viên', 'Quản lý lương'], 
    users: 2, 
    description: 'Quản lý toàn bộ nhân sự và chấm công', 
    createdDate: '2024-01-08', 
    modifiedDate: '2024-01-23', 
    status: 'Active', 
    level: 'Full', 
    restrictions: ['Không thể tự thay đổi lương của bản thân']
  },
  { 
    id: 9, 
    roleName: 'Chuyên viên Báo cáo', 
    module: 'Báo cáo', 
    permissions: ['Đọc báo cáo', 'Tạo báo cáo', 'Cập nhật báo cáo', 'Xuất báo cáo'], 
    users: 3, 
    description: 'Lập và quản lý các loại báo cáo', 
    createdDate: '2024-01-09', 
    modifiedDate: '2024-01-24', 
    status: 'Active', 
    level: 'Partial', 
    restrictions: ['Không thể xóa báo cáo đã duyệt']
  },
  { 
    id: 10, 
    roleName: 'Khách hàng', 
    module: 'Dịch vụ', 
    permissions: ['Đọc chứng thư', 'Tải xuống tài liệu', 'Xem tiến độ'], 
    users: 50, 
    description: 'Khách hàng xem thông tin dự án của mình', 
    createdDate: '2024-01-10', 
    modifiedDate: '2024-01-16', 
    status: 'Active', 
    level: 'Read Only', 
    restrictions: ['Chỉ xem được dự án của mình', 'Không thể tải xuống tài liệu nhạy cảm']
  },
  { 
    id: 11, 
    roleName: 'Quản lý Chất lượng', 
    module: 'Chất lượng', 
    permissions: ['Đọc tiêu chuẩn', 'Tạo tiêu chuẩn', 'Cập nhật tiêu chuẩn', 'Kiểm tra chất lượng'], 
    users: 2, 
    description: 'Quản lý tiêu chuẩn chất lượng và kiểm tra', 
    createdDate: '2024-01-11', 
    modifiedDate: '2024-01-26', 
    status: 'Active', 
    level: 'Full', 
    restrictions: ['Không thể xóa tiêu chuẩn đang sử dụng']
  },
  { 
    id: 12, 
    roleName: 'Nhân viên Kho', 
    module: 'Kho', 
    permissions: ['Đọc thiết bị', 'Cập nhật thiết bị', 'Xuất nhập kho'], 
    users: 4, 
    description: 'Quản lý thiết bị và vật tư trong kho', 
    createdDate: '2024-01-12', 
    modifiedDate: '2024-01-27', 
    status: 'Active', 
    level: 'Partial', 
    restrictions: ['Không thể xóa thiết bị', 'Không thể điều chỉnh giá trị']
  },
  { 
    id: 13, 
    roleName: 'Trợ lý Giám đốc', 
    module: 'Hỗ trợ', 
    permissions: ['Đọc tất cả', 'Tạo lịch họp', 'Cập nhật lịch họp', 'Xem báo cáo tổng hợp'], 
    users: 1, 
    description: 'Hỗ trợ giám đốc trong các công việc hàng ngày', 
    createdDate: '2024-01-13', 
    modifiedDate: '2024-01-28', 
    status: 'Active', 
    level: 'Partial', 
    restrictions: ['Không thể duyệt giao dịch', 'Không thể thay đổi cấu hình hệ thống']
  },
  { 
    id: 14, 
    roleName: 'Admin IT', 
    module: 'IT', 
    permissions: ['Quản lý user', 'Sao lưu dữ liệu', 'Cài đặt hệ thống', 'Kiểm tra log'], 
    users: 2, 
    description: 'Quản trị hệ thống và hỗ trợ kỹ thuật', 
    createdDate: '2024-01-14', 
    modifiedDate: '2024-01-29', 
    status: 'Active', 
    level: 'Full', 
    restrictions: ['Không thể truy cập dữ liệu tài chính nhạy cảm']
  },
  { 
    id: 15, 
    roleName: 'Thực tập sinh', 
    module: 'Hỗ trợ', 
    permissions: ['Đọc tài liệu', 'Xem dự án'], 
    users: 8, 
    description: 'Thực tập sinh học hỏi và hỗ trợ', 
    createdDate: '2024-01-15', 
    modifiedDate: '2024-01-30', 
    status: 'Active', 
    level: 'Read Only', 
    restrictions: ['Không thể tải xuống tài liệu', 'Không thể xem thông tin khách hàng']
  },
  { 
    id: 16, 
    roleName: 'Đối tác', 
    module: 'Đối tác', 
    permissions: ['Đọc dự án chung', 'Tải xuống tài liệu chung', 'Cập nhật tiến độ'], 
    users: 12, 
    description: 'Đối tác hợp tác thực hiện dự án', 
    createdDate: '2024-01-16', 
    modifiedDate: '2024-01-31', 
    status: 'Active', 
    level: 'Partial', 
    restrictions: ['Chỉ xem được dự án liên quan', 'Không thể xem thông tin tài chính']
  },
  { 
    id: 17, 
    roleName: 'Quản lý Training', 
    module: 'Đào tạo', 
    permissions: ['Tạo khóa học', 'Đọc khóa học', 'Cập nhật khóa học', 'Quản lý học viên'], 
    users: 2, 
    description: 'Quản lý các chương trình đào tạo nội bộ', 
    createdDate: '2024-01-17', 
    modifiedDate: '2024-02-01', 
    status: 'Active', 
    level: 'Full', 
    restrictions: ['Không thể xóa khóa học có học viên']
  },
  { 
    id: 18, 
    roleName: 'Hỗ trợ Khách hàng', 
    module: 'CSKH', 
    permissions: ['Đọc khách hàng', 'Cập nhật khách hàng', 'Tạo ticket hỗ trợ', 'Xem lịch sử'], 
    users: 5, 
    description: 'Hỗ trợ và chăm sóc khách hàng', 
    createdDate: '2024-01-18', 
    modifiedDate: '2024-02-02', 
    status: 'Active', 
    level: 'Partial', 
    restrictions: ['Không thể xóa khách hàng', 'Không thể xem thông tin tài chính']
  },
  { 
    id: 19, 
    roleName: 'Kiểm toán viên', 
    module: 'Kiểm toán', 
    permissions: ['Đọc tất cả', 'Xuất báo cáo kiểm toán', 'Xem log hệ thống'], 
    users: 1, 
    description: 'Kiểm toán và đánh giá hệ thống', 
    createdDate: '2024-01-19', 
    modifiedDate: '2024-02-03', 
    status: 'Active', 
    level: 'Read Only', 
    restrictions: ['Không thể thay đổi dữ liệu', 'Chỉ xem trong thời gian kiểm toán']
  },
  { 
    id: 20, 
    roleName: 'Quản lý Rủi ro', 
    module: 'Rủi ro', 
    permissions: ['Đọc rủi ro', 'Tạo rủi ro', 'Cập nhật rủi ro', 'Tạo kế hoạch xử lý'], 
    users: 2, 
    description: 'Quản lý và đánh giá rủi ro trong dự án', 
    createdDate: '2024-01-20', 
    modifiedDate: '2024-02-04', 
    status: 'Active', 
    level: 'Full', 
    restrictions: ['Không thể xóa rủi ro đã xác nhận']
  }
]

export default function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModule, setSelectedModule] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [viewingPermission, setViewingPermission] = useState<Permission | null>(null)

  const filteredPermissions = useMemo(() => {
    return mockPermissions.filter(permission => {
      const matchesSearch = permission.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           permission.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           permission.permissions.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesModule = selectedModule === 'all' || permission.module === selectedModule
      const matchesLevel = selectedLevel === 'all' || permission.level === selectedLevel
      const matchesStatus = selectedStatus === 'all' || permission.status === selectedStatus
      
      return matchesSearch && matchesModule && matchesLevel && matchesStatus
    })
  }, [searchTerm, selectedModule, selectedLevel, selectedStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Full': return 'bg-purple-100 text-purple-800'
      case 'Partial': return 'bg-blue-100 text-blue-800'
      case 'Read Only': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Full': return <Unlock className="w-4 h-4 text-purple-600" />
      case 'Partial': return <Key className="w-4 h-4 text-blue-600" />
      case 'Read Only': return <Lock className="w-4 h-4 text-gray-600" />
      default: return <Lock className="w-4 h-4 text-gray-600" />
    }
  }

  const columns = [
    {
      id: 'roleName',
      header: 'Tên vai trò',
      accessorKey: 'roleName',
      sortable: true,
    },
    {
      id: 'module',
      header: 'Module',
      accessorKey: 'module',
      sortable: true,
    },
    {
      id: 'level',
      header: 'Cấp độ',
      accessorKey: 'level',
      sortable: true,
    },
    {
      id: 'permissions',
      header: 'Quyền hạn',
      accessorKey: 'permissions',
      sortable: true,
    },
    {
      id: 'users',
      header: 'Số người dùng',
      accessorKey: 'users',
      sortable: true,
    },
    {
      id: 'status',
      header: 'Trạng thái',
      accessorKey: 'status',
      sortable: true,
    },
    {
      id: 'createdDate',
      header: 'Ngày tạo',
      accessorKey: 'createdDate',
      sortable: true,
    },
    {
      id: 'modifiedDate',
      header: 'Ngày sửa',
      accessorKey: 'modifiedDate',
      sortable: true,
    },
    {
      id: 'actions',
      header: 'Thao tác',
      sortable: false,
    }
  ]

  const renderCell = (permission: Permission, column: string) => {
    switch (column) {
      case 'level':
        return (
          <div className="flex items-center space-x-2">
            {getLevelIcon(permission.level)}
            <Badge className={`text-xs ${getLevelColor(permission.level)}`}>{permission.level}</Badge>
          </div>
        )
      case 'status':
        return (
          <div className="flex items-center space-x-2">
            {permission.status === 'Active' ? 
              <CheckCircle className="w-4 h-4 text-green-600" /> : 
              <XCircle className="w-4 h-4 text-red-600" />
            }
            <Badge className={`text-xs ${getStatusColor(permission.status)}`}>{permission.status}</Badge>
          </div>
        )
      case 'permissions':
        return (
          <div className="max-w-xs">
            <div className="flex flex-wrap gap-1">
              {permission.permissions.slice(0, 3).map((perm, index) => (
                <Badge key={index} className="text-xs bg-blue-100 text-blue-800">
                  {perm}
                </Badge>
              ))}
              {permission.permissions.length > 3 && (
                <Badge className="text-xs bg-gray-100 text-gray-800">
                  +{permission.permissions.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )
      case 'users':
        return (
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4 text-slate-500" />
            <span className="text-sm">{permission.users}</span>
          </div>
        )
      case 'actions':
        return (
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )
      default:
        return permission[column as keyof Permission]
    }
  }

  const modules = Array.from(new Set(mockPermissions.map(p => p.module)))

  const handleView = (permission: Permission) => {
    setViewingPermission(permission)
  }

  return (
    <AppLayout>
      <div className="space-y-4">
      {/* Header with Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Phân quyền</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-md bg-white text-sm"
          >
            <option value="all">Tất cả modules</option>
            {modules.map(module => (
              <option key={module} value={module}>{module}</option>
            ))}
          </select>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-md bg-white text-sm"
          >
            <option value="all">Tất cả cấp độ</option>
            <option value="Full">Full</option>
            <option value="Partial">Partial</option>
            <option value="Read Only">Read Only</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-md bg-white text-sm"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Tạo vai trò mới
          </Button>
        </div>
      </div>

      {/* Permission Levels Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Các cấp độ quyền</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Unlock className="w-5 h-5 text-purple-600" />
              <Badge className="bg-purple-100 text-purple-800">Full</Badge>
              <span className="text-sm">Toàn quyền truy cập module</span>
            </div>
            <div className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-800">Partial</Badge>
              <span className="text-sm">Quyền truy cập một phần</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-gray-600" />
              <Badge className="bg-gray-100 text-gray-800">Read Only</Badge>
              <span className="text-sm">Chỉ được xem thông tin</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danh sách phân quyền</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredPermissions}
            columns={columns}
            renderCell={renderCell}
            searchable={false}
            pagination={true}
            itemsPerPage={10}
            onRowClick={handleView}
          />
        </CardContent>
      </Card>

      {/* View Permission Dialog */}
      <Dialog open={!!viewingPermission} onOpenChange={() => setViewingPermission(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết Phân quyền</DialogTitle>
          </DialogHeader>
          {viewingPermission && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{viewingPermission.roleName}</h3>
                  <p className="text-sm text-slate-600">{viewingPermission.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {getLevelIcon(viewingPermission.level)}
                    <Badge className={`text-xs ${getLevelColor(viewingPermission.level)}`}>{viewingPermission.level}</Badge>
                    <Badge className={`text-xs ${getStatusColor(viewingPermission.status)}`}>{viewingPermission.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Module</h4>
                  <p className="text-sm">{viewingPermission.module}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Số người dùng</h4>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4 text-slate-500" />
                    <span className="text-sm">{viewingPermission.users}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Ngày tạo</h4>
                  <p className="text-sm">{viewingPermission.createdDate}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Ngày sửa</h4>
                  <p className="text-sm">{viewingPermission.modifiedDate}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-slate-700 mb-2">Quyền hạn</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingPermission.permissions.map((perm, index) => (
                    <Badge key={index} className="text-xs bg-blue-100 text-blue-800">
                      {perm}
                    </Badge>
                  ))}
                </div>
              </div>

              {viewingPermission.restrictions.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Hạn chế</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {viewingPermission.restrictions.map((restriction, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setViewingPermission(null)}>
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </AppLayout>
  )
}