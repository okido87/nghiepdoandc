'use client'

import { useState } from 'react'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPlus, Edit, Trash2, Eye } from 'lucide-react'

// Demo data for Users
const usersData = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@giamdinh.com', role: 'Admin', department: 'Ban Giám đốc', status: 'Active', phone: '0901234567', joinDate: '2022-01-15', lastLogin: '2024-01-20 09:30' },
  { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@giamdinh.com', role: 'Manager', department: 'Phòng Kỹ thuật', status: 'Active', phone: '0902345678', joinDate: '2022-03-20', lastLogin: '2024-01-20 08:45' },
  { id: 3, name: 'Lê Văn Cường', email: 'cuong.le@giamdinh.com', role: 'Inspector', department: 'Đội Giám định 1', status: 'Active', phone: '0903456789', joinDate: '2022-05-10', lastLogin: '2024-01-19 16:20' },
  { id: 4, name: 'Phạm Thị Dung', email: 'dung.pham@giamdinh.com', role: 'Inspector', department: 'Đội Giám định 2', status: 'Active', phone: '0904567890', joinDate: '2022-07-15', lastLogin: '2024-01-20 10:15' },
  { id: 5, name: 'Hoàng Văn Em', email: 'em.hoang@giamdinh.com', role: 'Staff', department: 'Phòng Hành chính', status: 'Active', phone: '0905678901', joinDate: '2022-09-01', lastLogin: '2024-01-20 07:30' },
  { id: 6, name: 'Đỗ Thị Giang', email: 'giang.do@giamdinh.com', role: 'Manager', department: 'Phòng Kế hoạch', status: 'Active', phone: '0906789012', joinDate: '2022-11-10', lastLogin: '2024-01-19 14:45' },
  { id: 7, name: 'Bùi Văn Hùng', email: 'hung.bui@giamdinh.com', role: 'Inspector', department: 'Đội Giám định 1', status: 'Inactive', phone: '0907890123', joinDate: '2023-01-05', lastLogin: '2024-01-15 11:20' },
  { id: 8, name: 'Vũ Thị Lan', email: 'lan.vu@giamdinh.com', role: 'Staff', department: 'Phòng Kế toán', status: 'Active', phone: '0908901234', joinDate: '2023-02-15', lastLogin: '2024-01-20 09:00' },
  { id: 9, name: 'Đinh Văn Mạnh', email: 'manh.dinh@giamdinh.com', role: 'Inspector', department: 'Đội Giám định 3', status: 'Active', phone: '0909012345', joinDate: '2023-04-20', lastLogin: '2024-01-20 08:15' },
  { id: 10, name: 'Ngô Thị Nga', email: 'nga.ngo@giamdinh.com', role: 'Manager', department: 'Phòng Nhân sự', status: 'Active', phone: '0900123456', joinDate: '2023-06-10', lastLogin: '2024-01-19 17:30' },
  { id: 11, name: 'Phan Văn Phong', email: 'phong.phan@giamdinh.com', role: 'Staff', department: 'Phòng Hành chính', status: 'Active', phone: '0901234567', joinDate: '2023-08-15', lastLogin: '2024-01-20 07:45' },
  { id: 12, name: 'Lý Thị Quỳnh', email: 'quynh.ly@giamdinh.com', role: 'Inspector', department: 'Đội Giám định 2', status: 'Active', phone: '0902345678', joinDate: '2023-10-01', lastLogin: '2024-01-20 10:30' },
  { id: 13, name: 'Võ Văn Rồng', email: 'rong.vo@giamdinh.com', role: 'Staff', department: 'Phòng Kỹ thuật', status: 'Inactive', phone: '0903456789', joinDate: '2023-11-20', lastLogin: '2024-01-10 15:45' },
  { id: 14, name: 'Tô Thị Sương', email: 'suong.to@giamdinh.com', role: 'Manager', department: 'Phòng Marketing', status: 'Active', phone: '0904567890', joinDate: '2024-01-05', lastLogin: '2024-01-20 09:15' },
  { id: 15, name: 'Yên Văn Tài', email: 'tai.yen@giamdinh.com', role: 'Inspector', department: 'Đội Giám định 3', status: 'Active', phone: '0905678901', joinDate: '2024-01-10', lastLogin: '2024-01-20 08:00' },
  { id: 16, name: 'Khúc Thị Uyên', email: 'uyen.khuc@giamdinh.com', role: 'Staff', department: 'Phòng Kế toán', status: 'Active', phone: '0906789012', joinDate: '2024-01-12', lastLogin: '2024-01-19 16:00' },
  { id: 17, name: 'Ông Văn Vinh', email: 'vinh.ong@giamdinh.com', role: 'Inspector', department: 'Đội Giám định 1', status: 'Active', phone: '0907890123', joinDate: '2024-01-15', lastLogin: '2024-01-20 07:30' },
  { id: 18, name: 'Phùng Thị Xuân', email: 'xuan.phung@giamdinh.com', role: 'Manager', department: 'Phòng Pháp chế', status: 'Active', phone: '0908901234', joinDate: '2024-01-18', lastLogin: '2024-01-20 09:45' },
  { id: 19, name: 'Quách Văn Yên', email: 'yen.quach@giamdinh.com', role: 'Staff', department: 'Phòng Hành chính', status: 'Active', phone: '0909012345', joinDate: '2024-01-19', lastLogin: '2024-01-20 08:30' },
  { id: 20, name: 'Tăng Thị Zuni', email: 'zuni.tang@giamdinh.com', role: 'Inspector', department: 'Đội Giám định 2', status: 'Active', phone: '0900123456', joinDate: '2024-01-20', lastLogin: '2024-01-20 10:00' },
]

export function UsersView() {
  const [users, setUsers] = useState(usersData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [viewingUser, setViewingUser] = useState<any>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')

  // Get unique departments for filter
  const departments = Array.from(new Set(usersData.map(user => user.department)))

  // Filter users based on selected filters
  const filteredUsers = users.filter(user => {
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter
    return matchesStatus && matchesDepartment
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    }
    return (
      <Badge className={variants[status] || 'bg-gray-100 text-gray-800'}>
        {status === 'Active' ? 'Hoạt động' : status === 'Inactive' ? 'Không hoạt động' : 'Chờ duyệt'}
      </Badge>
    )
  }

  const getRoleBadge = (role: string) => {
    const variants: Record<string, string> = {
      'Admin': 'bg-purple-100 text-purple-800',
      'Manager': 'bg-blue-100 text-blue-800',
      'Inspector': 'bg-green-100 text-green-800',
      'Staff': 'bg-gray-100 text-gray-800'
    }
    return (
      <Badge className={variants[role] || 'bg-gray-100 text-gray-800'}>
        {role === 'Admin' ? 'Quản trị' : role === 'Manager' ? 'Quản lý' : role === 'Inspector' ? 'Giám định viên' : 'Nhân viên'}
      </Badge>
    )
  }

  const columns = [
    {
      key: 'name',
      label: 'Họ tên',
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={`/avatar-${row.id}.jpg`} />
            <AvatarFallback className="text-xs">{value.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'role',
      label: 'Vai trò',
      sortable: true,
      render: (value: string) => getRoleBadge(value)
    },
    {
      key: 'department',
      label: 'Phòng ban',
      sortable: true
    },
    {
      key: 'phone',
      label: 'Điện thoại',
      sortable: true
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'lastLogin',
      label: 'Lần đăng nhập cuối',
      sortable: true
    }
  ]

  const handleAdd = () => {
    setEditingUser(null)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (user: any) => {
    setEditingUser(user)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (user: any) => {
    if (confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.name}"?`)) {
      setUsers(users.filter(u => u.id !== user.id))
    }
  }

  const handleView = (user: any) => {
    setViewingUser(user)
  }

  const handleExport = () => {
    // CSV export logic
    const csv = [
      columns.map(c => c.label).join(','),
      ...users.map(user => 
        columns.map(c => user[c.key]).join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">Trạng thái:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Active">Hoạt động</SelectItem>
                  <SelectItem value="Inactive">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">Phòng ban:</Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <DataTable
        title="Quản lý Người dùng"
        data={filteredUsers}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onExport={handleExport}
      />

      {/* View User Dialog */}
      <Dialog open={!!viewingUser} onOpenChange={() => setViewingUser(null)}>
        <DialogContent className="dialog-responsive">
          <DialogHeader>
            <DialogTitle>Chi tiết người dùng</DialogTitle>
          </DialogHeader>
          {viewingUser && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/avatar-${viewingUser.id}.jpg`} />
                  <AvatarFallback>{viewingUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{viewingUser.name}</h3>
                  <p className="text-sm text-slate-600">{viewingUser.email}</p>
                  {getRoleBadge(viewingUser.role)}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-slate-600">Phòng ban</Label>
                  <p>{viewingUser.department}</p>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Điện thoại</Label>
                  <p>{viewingUser.phone}</p>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Ngày tham gia</Label>
                  <p>{viewingUser.joinDate}</p>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Trạng thái</Label>
                  <div>{getStatusBadge(viewingUser.status)}</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingUser(null)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="dialog-responsive">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Cập nhật thông tin người dùng' : 'Điền thông tin để tạo người dùng mới'}
            </DialogDescription>
          </DialogHeader>
          <div className="form-responsive">
            <div className="form-grid-responsive">
              <Label htmlFor="name" className="text-right">
                Họ tên
              </Label>
              <Input
                id="name"
                defaultValue={editingUser?.name || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={editingUser?.email || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="role" className="text-right">
                Vai trò
              </Label>
              <Select defaultValue={editingUser?.role || 'Staff'}>
                <SelectTrigger className="col-span-1">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Quản trị</SelectItem>
                  <SelectItem value="Manager">Quản lý</SelectItem>
                  <SelectItem value="Inspector">Giám định viên</SelectItem>
                  <SelectItem value="Staff">Nhân viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="department" className="text-right">
                Phòng ban
              </Label>
              <Input
                id="department"
                defaultValue={editingUser?.department || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="phone" className="text-right">
                Điện thoại
              </Label>
              <Input
                id="phone"
                defaultValue={editingUser?.phone || ''}
                className="col-span-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              {editingUser ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}