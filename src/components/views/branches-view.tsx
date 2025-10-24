'use client'

import { useState } from 'react'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
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
import { Building, Edit, Trash2, Eye, MapPin, Phone, Mail, Users } from 'lucide-react'

// Demo data for Branches
const branchesData = [
  { 
    id: 1, 
    name: 'Nghiệp Đoàn DC', 
    code: 'DC001', 
    address: '123 Nguyễn Huệ, Q.1, TP.HCM', 
    phone: '0281234567', 
    email: 'info@nghiepdoandc.com', 
    manager: 'Nguyễn Văn An', 
    status: 'Active', 
    establishedDate: '2020-01-15',
    totalStaff: 45,
    totalOrders: 156,
    totalRevenue: '15.6 tỷ',
    type: 'Headquarters'
  },
  { 
    id: 2, 
    name: 'Thăng Long Control', 
    code: 'TLC001', 
    address: '456 Trần Hưng Đạo, Q.Hoàn Kiếm, Hà Nội', 
    phone: '0242345678', 
    email: 'info@thanglongcontrol.com', 
    manager: 'Trần Thị Bình', 
    status: 'Active', 
    establishedDate: '2021-03-20',
    totalStaff: 32,
    totalOrders: 98,
    totalRevenue: '9.8 tỷ',
    type: 'Branch'
  },
  { 
    id: 3, 
    name: 'Chi nhánh Đà Nẵng', 
    code: 'DN001', 
    address: '789 Lê Duẩn, Q.Hải Châu, Đà Nẵng', 
    phone: '02363456789', 
    email: 'danang@giamdinh.com', 
    manager: 'Lê Văn Cường', 
    status: 'Active', 
    establishedDate: '2021-07-15',
    totalStaff: 25,
    totalOrders: 67,
    totalRevenue: '6.7 tỷ',
    type: 'Branch'
  },
  { 
    id: 4, 
    name: 'Chi nhánh Cần Thơ', 
    code: 'CT001', 
    address: '321 Võ Văn Kiệt, Q.Ninh Kiều, Cần Thơ', 
    phone: '0292345678', 
    email: 'cantho@giamdinh.com', 
    manager: 'Phạm Thị Dung', 
    status: 'Active', 
    establishedDate: '2022-01-10',
    totalStaff: 18,
    totalOrders: 45,
    totalRevenue: '4.5 tỷ',
    type: 'Branch'
  },
  { 
    id: 5, 
    name: 'Văn phòng Hải Phòng', 
    code: 'HP001', 
    address: '654 Điện Biên Phủ, Q.Hồng Bàng, Hải Phòng', 
    phone: '0225345678', 
    email: 'haiphong@giamdinh.com', 
    manager: 'Hoàng Văn Em', 
    status: 'Inactive', 
    establishedDate: '2022-09-01',
    totalStaff: 12,
    totalOrders: 23,
    totalRevenue: '2.3 tỷ',
    type: 'Office'
  },
  { 
    id: 6, 
    name: 'Chi nhánh Bình Dương', 
    code: 'BD001', 
    address: '987 Đại lộ Bình Dương, TP.Thủ Dầu Một, Bình Dương', 
    phone: '0274345678', 
    email: 'binhduong@giamdinh.com', 
    manager: 'Đỗ Thị Giang', 
    status: 'Active', 
    establishedDate: '2023-02-15',
    totalStaff: 20,
    totalOrders: 56,
    totalRevenue: '5.6 tỷ',
    type: 'Branch'
  },
  { 
    id: 7, 
    name: 'Văn phòng Đồng Nai', 
    code: 'DN002', 
    address: '147 Võ Thị Sáu, TP.Biên Hòa, Đồng Nai', 
    phone: '0251345678', 
    email: 'dongnai@giamdinh.com', 
    manager: 'Bùi Văn Hùng', 
    status: 'Active', 
    establishedDate: '2023-05-20',
    totalStaff: 15,
    totalOrders: 34,
    totalRevenue: '3.4 tỷ',
    type: 'Office'
  }
]

export function BranchesView() {
  const [branches, setBranches] = useState(branchesData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingBranch, setEditingBranch] = useState<any>(null)
  const [viewingBranch, setViewingBranch] = useState<any>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Filter branches based on selected status
  const filteredBranches = branches.filter(branch => {
    const matchesStatus = statusFilter === 'all' || branch.status === statusFilter
    return matchesStatus
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

  const getTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      'Headquarters': 'bg-purple-100 text-purple-800',
      'Branch': 'bg-blue-100 text-blue-800',
      'Office': 'bg-gray-100 text-gray-800'
    }
    return (
      <Badge className={variants[type] || 'bg-gray-100 text-gray-800'}>
        {type === 'Headquarters' ? 'Trụ sở' : type === 'Branch' ? 'Chi nhánh' : 'Văn phòng'}
      </Badge>
    )
  }

  const columns = [
    {
      key: 'name',
      label: 'Tên chi nhánh',
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <Building className="w-3 h-3 text-blue-600" />
          </div>
          <div>
            <span className="font-medium">{value}</span>
            <div className="text-xs text-slate-500">{row.code}</div>
          </div>
        </div>
      )
    },
    {
      key: 'address',
      label: 'Địa chỉ',
      sortable: true,
      render: (value: string) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      )
    },
    {
      key: 'manager',
      label: 'Quản lý',
      sortable: true
    },
    {
      key: 'totalStaff',
      label: 'Nhân sự',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-1">
          <Users className="w-3 h-3 text-slate-500" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'totalOrders',
      label: 'Đơn hàng',
      sortable: true,
      render: (value: number) => <span className="font-medium">{value}</span>
    },
    {
      key: 'totalRevenue',
      label: 'Doanh thu',
      sortable: true,
      render: (value: string) => <span className="font-medium text-green-600">{value}</span>
    },
    {
      key: 'type',
      label: 'Loại hình',
      sortable: true,
      render: (value: string) => getTypeBadge(value)
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: (value: string) => getStatusBadge(value)
    }
  ]

  const handleAdd = () => {
    setEditingBranch(null)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (branch: any) => {
    setEditingBranch(branch)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (branch: any) => {
    if (confirm(`Bạn có chắc chắn muốn xóa chi nhánh "${branch.name}"?`)) {
      setBranches(branches.filter(b => b.id !== branch.id))
    }
  }

  const handleView = (branch: any) => {
    setViewingBranch(branch)
  }

  const handleExport = () => {
    // CSV export logic
    const csv = [
      columns.map(c => c.label).join(','),
      ...branches.map(branch => 
        columns.map(c => branch[c.key]).join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'branches.csv'
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
          </div>
        </CardContent>
      </Card>

      <DataTable
        title="Quản lý Chi nhánh"
        data={filteredBranches}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onExport={handleExport}
      />

      {/* View Branch Dialog */}
      <Dialog open={!!viewingBranch} onOpenChange={() => setViewingBranch(null)}>
        <DialogContent className="dialog-responsive">
          <DialogHeader>
            <DialogTitle>Chi tiết chi nhánh</DialogTitle>
          </DialogHeader>
          {viewingBranch && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{viewingBranch.name}</h3>
                  <p className="text-sm text-slate-600">{viewingBranch.code}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getTypeBadge(viewingBranch.type)}
                    {getStatusBadge(viewingBranch.status)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-slate-600">Quản lý chi nhánh</Label>
                  <p>{viewingBranch.manager}</p>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Ngày thành lập</Label>
                  <p>{viewingBranch.establishedDate}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-xs text-slate-600">Địa chỉ</Label>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3 h-3 text-slate-500 mt-0.5" />
                    <p>{viewingBranch.address}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Điện thoại</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3 h-3 text-slate-500" />
                    <p>{viewingBranch.phone}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Email</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3 h-3 text-slate-500" />
                    <p>{viewingBranch.email}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Số nhân sự</Label>
                  <div className="flex items-center space-x-2">
                    <Users className="w-3 h-3 text-slate-500" />
                    <p className="font-medium">{viewingBranch.totalStaff}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Tổng đơn hàng</Label>
                  <p className="font-medium">{viewingBranch.totalOrders}</p>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Doanh thu</Label>
                  <p className="font-medium text-green-600">{viewingBranch.totalRevenue}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingBranch(null)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Branch Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="dialog-responsive">
          <DialogHeader>
            <DialogTitle>{editingBranch ? 'Chỉnh sửa chi nhánh' : 'Thêm chi nhánh mới'}</DialogTitle>
            <DialogDescription>
              {editingBranch ? 'Cập nhật thông tin chi nhánh' : 'Điền thông tin để tạo chi nhánh mới'}
            </DialogDescription>
          </DialogHeader>
          <div className="form-responsive">
            <div className="form-grid-responsive">
              <Label htmlFor="name" className="text-right">
                Tên chi nhánh
              </Label>
              <Input
                id="name"
                defaultValue={editingBranch?.name || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="code" className="text-right">
                Mã chi nhánh
              </Label>
              <Input
                id="code"
                defaultValue={editingBranch?.code || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="type" className="text-right">
                Loại hình
              </Label>
              <Select defaultValue={editingBranch?.type || 'Branch'}>
                <SelectTrigger className="col-span-1">
                  <SelectValue placeholder="Chọn loại hình" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Headquarters">Trụ sở</SelectItem>
                  <SelectItem value="Branch">Chi nhánh</SelectItem>
                  <SelectItem value="Office">Văn phòng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="manager" className="text-right">
                Quản lý chi nhánh
              </Label>
              <Input
                id="manager"
                defaultValue={editingBranch?.manager || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="address" className="text-right">
                Địa chỉ
              </Label>
              <Input
                id="address"
                defaultValue={editingBranch?.address || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="phone" className="text-right">
                Điện thoại
              </Label>
              <Input
                id="phone"
                defaultValue={editingBranch?.phone || ''}
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
                defaultValue={editingBranch?.email || ''}
                className="col-span-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              {editingBranch ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}