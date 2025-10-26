'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  Filter,
  Download,
  Upload,
  Users,
  TrendingUp
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { AppLayout } from '@/components/app-layout'
import { ViewHeader } from '@/components/view-header'

interface Customer {
  id: string
  code: string
  name: string
  type: 'individual' | 'corporate'
  email: string
  phone: string
  address: string
  taxCode?: string
  contactPerson?: string
  status: 'active' | 'inactive' | 'pending'
  totalOrders: number
  totalValue: number
  lastOrderDate?: string
  createdAt: string
  updatedAt: string
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    code: 'KH001',
    name: 'Công ty TNHH ABC',
    type: 'corporate',
    email: 'contact@abc.com',
    phone: '0901234567',
    address: '123 Nguyễn Huệ, Q.1, TP.HCM',
    taxCode: '0301234567',
    contactPerson: 'Nguyễn Văn A',
    status: 'active',
    totalOrders: 15,
    totalValue: 250000000,
    lastOrderDate: '2024-01-15',
    createdAt: '2023-06-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    code: 'KH002',
    name: 'Trần Thị B',
    type: 'individual',
    email: 'tranb@email.com',
    phone: '0912345678',
    address: '456 Lê Lợi, Q.3, TP.HCM',
    status: 'active',
    totalOrders: 3,
    totalValue: 45000000,
    lastOrderDate: '2024-01-10',
    createdAt: '2023-08-15',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    code: 'KH003',
    name: 'Tập đoàn XYZ',
    type: 'corporate',
    email: 'info@xyz.com',
    phone: '0923456789',
    address: '789 Đồng Khởi, Q.Bình Thạnh, TP.HCM',
    taxCode: '0109876543',
    contactPerson: 'Lê Văn C',
    status: 'pending',
    totalOrders: 0,
    totalValue: 0,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '4',
    code: 'KH004',
    name: 'Phạm Văn D',
    type: 'individual',
    email: 'phamd@email.com',
    phone: '0934567890',
    address: '321 Võ Văn Tần, Q.3, TP.HCM',
    status: 'inactive',
    totalOrders: 8,
    totalValue: 120000000,
    lastOrderDate: '2023-12-20',
    createdAt: '2023-05-10',
    updatedAt: '2023-12-20'
  },
  {
    id: '5',
    code: 'KH005',
    name: 'Công ty Cổ phần DEF',
    type: 'corporate',
    email: 'def@company.com',
    phone: '0945678901',
    address: '654 Hai Bà Trưng, Q.1, TP.HCM',
    taxCode: '0456789012',
    contactPerson: 'Hoàng Thị E',
    status: 'active',
    totalOrders: 22,
    totalValue: 380000000,
    lastOrderDate: '2024-01-18',
    createdAt: '2023-03-15',
    updatedAt: '2024-01-18'
  }
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm)
    
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus
    const matchesType = filterType === 'all' || customer.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const handleCreateCustomer = () => {
    setIsCreateModalOpen(true)
  }

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsEditModalOpen(true)
  }

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsViewModalOpen(true)
  }

  const handleDeleteCustomer = (customerId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      setCustomers(customers.filter(c => c.id !== customerId))
      toast({
        title: "Xóa thành công",
        description: "Khách hàng đã được xóa khỏi hệ thống.",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    }
    const labels = {
      active: 'Hoạt động',
      inactive: 'Không hoạt động',
      pending: 'Chờ duyệt'
    }
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      corporate: 'bg-blue-100 text-blue-800',
      individual: 'bg-purple-100 text-purple-800'
    }
    const labels = {
      corporate: 'Tổ chức',
      individual: 'Cá nhân'
    }
    return (
      <Badge className={variants[type as keyof typeof variants]}>
        {labels[type as keyof typeof labels]}
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  // Statistics
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    corporate: customers.filter(c => c.type === 'corporate').length,
    individual: customers.filter(c => c.type === 'individual').length,
    totalValue: customers.reduce((sum, c) => sum + c.totalValue, 0)
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <ViewHeader
        title="Khách hàng"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      >
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-[#D1E5F0] rounded-md text-sm"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Ngưng hoạt động</option>
        </select>
      </ViewHeader>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-white border-[#D1E5F0]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Tổng khách hàng</p>
                <p className="text-2xl font-bold text-[#1A365D]">{stats.total}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Building className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#D1E5F0]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Đang hoạt động</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#D1E5F0]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Khách hàng tổ chức</p>
                <p className="text-2xl font-bold text-blue-600">{stats.corporate}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Building className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#D1E5F0]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Khách hàng cá nhân</p>
                <p className="text-2xl font-bold text-purple-600">{stats.individual}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#D1E5F0]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Tổng giá trị</p>
                <p className="text-base font-bold text-[#1A365D]">
                  {(stats.totalValue / 1000000).toFixed(0)}M
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="bg-white border-[#D1E5F0]">
        <CardHeader>
          <CardTitle className="text-xl text-[#1A365D]">Danh sách khách hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#D1E5F0]">
                  <TableHead className="text-[#1A365D]">Mã KH</TableHead>
                  <TableHead className="text-[#1A365D]">Tên khách hàng</TableHead>
                  <TableHead className="text-[#1A365D]">Loại</TableHead>
                  <TableHead className="text-[#1A365D]">Thông tin liên hệ</TableHead>
                  <TableHead className="text-[#1A365D]">Địa chỉ</TableHead>
                  <TableHead className="text-[#1A365D]">Trạng thái</TableHead>
                  <TableHead className="text-[#1A365D]">Đơn hàng</TableHead>
                  <TableHead className="text-[#1A365D]">Giá trị</TableHead>
                  <TableHead className="text-[#1A365D] text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow 
                    key={customer.id}
                    className="border-[#D1E5F0] hover:bg-[#F8FBFF] cursor-pointer"
                    onClick={() => handleViewCustomer(customer)}
                  >
                    <TableCell className="font-medium">{customer.code}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        {customer.contactPerson && (
                          <div className="text-xs text-[#64748B]">Người liên hệ: {customer.contactPerson}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(customer.type)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-[#64748B]" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-[#64748B]" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3 w-3 mr-1 text-[#64748B]" />
                        {customer.address}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{customer.totalOrders} đơn</div>
                        {customer.lastOrderDate && (
                          <div className="text-xs text-[#64748B]">
                            {new Date(customer.lastOrderDate).toLocaleDateString('vi-VN')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(customer.totalValue)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewCustomer(customer)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditCustomer(customer)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteCustomer(customer.id)
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder modals - these would be implemented with actual forms */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Thêm khách hàng mới</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-[#64748B]">
                Form thêm khách hàng sẽ được triển khai ở đây
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsCreateModalOpen(false)}>
                  Thêm khách hàng
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isEditModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Chỉnh sửa khách hàng: {selectedCustomer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-[#64748B]">
                Form chỉnh sửa khách hàng sẽ được triển khai ở đây
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsEditModalOpen(false)}>
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isViewModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Chi tiết khách hàng: {selectedCustomer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Mã khách hàng</label>
                  <p className="font-medium">{selectedCustomer.code}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Loại khách hàng</label>
                  <p>{getTypeBadge(selectedCustomer.type)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Email</label>
                  <p className="font-medium">{selectedCustomer.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Điện thoại</label>
                  <p className="font-medium">{selectedCustomer.phone}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-[#64748B]">Địa chỉ</label>
                  <p className="font-medium">{selectedCustomer.address}</p>
                </div>
                {selectedCustomer.taxCode && (
                  <div>
                    <label className="text-sm font-medium text-[#64748B]">Mã số thuế</label>
                    <p className="font-medium">{selectedCustomer.taxCode}</p>
                  </div>
                )}
                {selectedCustomer.contactPerson && (
                  <div>
                    <label className="text-sm font-medium text-[#64748B]">Người liên hệ</label>
                    <p className="font-medium">{selectedCustomer.contactPerson}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Trạng thái</label>
                  <p>{getStatusBadge(selectedCustomer.status)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Tổng giá trị</label>
                  <p className="font-medium">{formatCurrency(selectedCustomer.totalValue)}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Đóng
                </Button>
                <Button 
                  onClick={() => {
                    setIsViewModalOpen(false)
                    handleEditCustomer(selectedCustomer)
                  }}
                >
                  Chỉnh sửa
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
    </AppLayout>
  )
}