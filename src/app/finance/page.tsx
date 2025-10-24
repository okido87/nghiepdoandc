'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { DataTable } from '@/components/data-table'
import { AppLayout } from '@/components/app-layout'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Search, 
  Download, 
  Filter,
  Eye, 
  Edit, 
  Trash2,
  DollarSign,
  Calendar,
  FileText,
  Building,
  User
} from 'lucide-react'

interface Transaction {
  id: number
  date: string
  type: 'Thu' | 'Chi'
  category: string
  amount: number
  description: string
  relatedOrder?: string
  relatedProject?: string
  relatedCustomer?: string
  createdBy: string
  status: 'Completed' | 'Pending' | 'Cancelled'
  paymentMethod: string
  notes: string
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    date: '2024-01-20',
    type: 'Thu',
    category: 'Phí giám định',
    amount: 15000000,
    description: 'Thanh toán hợp đồng giám định nhà máy',
    relatedOrder: 'ORD-2024-001',
    relatedProject: 'PRJ-001',
    relatedCustomer: 'Công ty TNHH ABC',
    createdBy: 'Nguyễn Văn An',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Đã thanh toán đầy đủ'
  },
  {
    id: 2,
    date: '2024-01-19',
    type: 'Chi',
    category: 'Lương nhân viên',
    amount: 8500000,
    description: 'Lương tháng 1/2024',
    relatedOrder: '',
    relatedProject: '',
    relatedCustomer: '',
    createdBy: 'Trần Thị Bình',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Lương đội giám định 1'
  },
  {
    id: 3,
    date: '2024-01-18',
    type: 'Thu',
    category: 'Phí tư vấn',
    amount: 8000000,
    description: 'Tư vấn kỹ thuật dự án xây dựng',
    relatedOrder: 'ORD-2024-002',
    relatedProject: 'PRJ-002',
    relatedCustomer: 'Tập đoàn XYZ',
    createdBy: 'Lê Văn Cường',
    status: 'Completed',
    paymentMethod: 'Tiền mặt',
    notes: 'Thanh toán 50% trước'
  },
  {
    id: 4,
    date: '2024-01-17',
    type: 'Chi',
    category: 'Văn phòng phẩm',
    amount: 2500000,
    description: 'Mua văn phòng phẩm tháng 1',
    relatedOrder: '',
    relatedProject: '',
    relatedCustomer: '',
    createdBy: 'Phạm Thị Dung',
    status: 'Completed',
    paymentMethod: 'Tiền mặt',
    notes: 'Giấy, bút, hồ sơ'
  },
  {
    id: 5,
    date: '2024-01-16',
    type: 'Thu',
    category: 'Phí giám định',
    amount: 12000000,
    description: 'Giám định an toàn lao động',
    relatedOrder: 'ORD-2024-003',
    relatedProject: 'PRJ-003',
    relatedCustomer: 'Công ty Cổ phần DEF',
    createdBy: 'Hoàng Văn Em',
    status: 'Pending',
    paymentMethod: 'Chuyển khoản',
    notes: 'Chờ thanh toán'
  },
  {
    id: 6,
    date: '2024-01-15',
    type: 'Chi',
    category: 'Nhiên liệu',
    amount: 3500000,
    description: 'Xăng xe tháng 1',
    relatedOrder: '',
    relatedProject: '',
    relatedCustomer: '',
    createdBy: 'Đỗ Thị Giang',
    status: 'Completed',
    paymentMethod: 'Tiền mặt',
    notes: 'Đi công tác'
  },
  {
    id: 7,
    date: '2024-01-14',
    type: 'Thu',
    category: 'Phí bảo trì',
    amount: 5000000,
    description: 'Bảo trì thiết bị giám định',
    relatedOrder: 'ORD-2024-004',
    relatedProject: 'PRJ-004',
    relatedCustomer: 'Doanh nghiệp GHI',
    createdBy: 'Bùi Văn Hùng',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Hợp đồng bảo trì quý 1'
  },
  {
    id: 8,
    date: '2024-01-13',
    type: 'Chi',
    category: 'Điện nước',
    amount: 4200000,
    description: 'Tiền điện nước văn phòng',
    relatedOrder: '',
    relatedProject: '',
    relatedCustomer: '',
    createdBy: 'Vũ Thị Lan',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Tiền điện nước tháng 12'
  },
  {
    id: 9,
    date: '2024-01-12',
    type: 'Thu',
    category: 'Phí đào tạo',
    amount: 6000000,
    description: 'Đào tạo an toàn lao động',
    relatedOrder: 'ORD-2024-005',
    relatedProject: 'PRJ-005',
    relatedCustomer: 'Nhà cung cấp Thiết bị A',
    createdBy: 'Đinh Văn Mạnh',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Khóa đào tạo 2 ngày'
  },
  {
    id: 10,
    date: '2024-01-11',
    type: 'Chi',
    category: 'Thiết bị',
    amount: 25000000,
    description: 'Mua máy đo mới',
    relatedOrder: '',
    relatedProject: '',
    relatedCustomer: '',
    createdBy: 'Ngô Thị Nga',
    status: 'Pending',
    paymentMethod: 'Chuyển khoản',
    notes: 'Máy đo độ ẩm'
  },
  {
    id: 11,
    date: '2024-01-10',
    type: 'Thu',
    category: 'Phí giám định',
    amount: 18000000,
    description: 'Giám định chất lượng công trình',
    relatedOrder: 'ORD-2024-006',
    relatedProject: 'PRJ-006',
    relatedCustomer: 'Công ty Vật tư B',
    createdBy: 'Phan Văn Phong',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Đã nghiệm thu'
  },
  {
    id: 12,
    date: '2024-01-09',
    type: 'Chi',
    category: 'Lương nhân viên',
    amount: 9200000,
    description: 'Lương tháng 12/2023',
    relatedOrder: '',
    relatedProject: '',
    relatedCustomer: '',
    createdBy: 'Lý Thị Quỳnh',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Lương đội giám định 2'
  },
  {
    id: 13,
    date: '2024-01-08',
    type: 'Thu',
    category: 'Phí tư vấn',
    amount: 10000000,
    description: 'Tư vấn hệ thống quản lý',
    relatedOrder: 'ORD-2024-007',
    relatedProject: 'PRJ-007',
    relatedCustomer: 'Nhà phân phối C',
    createdBy: 'Võ Văn Rồng',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Hỗ trợ cài đặt'
  },
  {
    id: 14,
    date: '2024-01-07',
    type: 'Chi',
    category: 'Marketing',
    amount: 5000000,
    description: 'Quảng cáo online',
    relatedOrder: '',
    relatedProject: '',
    relatedCustomer: '',
    createdBy: 'Tô Thị Sương',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Google Ads'
  },
  {
    id: 15,
    date: '2024-01-06',
    type: 'Thu',
    category: 'Phí giám định',
    amount: 14000000,
    description: 'Giám định môi trường',
    relatedOrder: 'ORD-2024-008',
    relatedProject: 'PRJ-008',
    relatedCustomer: 'Chuyên gia Giám định A',
    createdBy: 'Yên Văn Tài',
    status: 'Pending',
    paymentMethod: 'Chuyển khoản',
    notes: 'Chờ kết quả'
  },
  {
    id: 16,
    date: '2024-01-05',
    type: 'Chi',
    category: 'Bảo hiểm',
    amount: 3000000,
    description: 'Bảo hiểm thiết bị',
    relatedOrder: '',
    relatedProject: '',
    relatedCustomer: '',
    createdBy: 'Khúc Thị Uyên',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Bảo hiểm năm 2024'
  },
  {
    id: 17,
    date: '2024-01-04',
    type: 'Thu',
    category: 'Phí dịch vụ',
    amount: 7000000,
    description: 'Dịch vụ kiểm định',
    relatedOrder: 'ORD-2024-009',
    relatedProject: 'PRJ-009',
    relatedCustomer: 'Đội ngũ Kỹ thuật B',
    createdBy: 'Ông Văn Vinh',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Kiểm định định kỳ'
  },
  {
    id: 18,
    date: '2024-01-03',
    type: 'Chi',
    category: 'Thuê văn phòng',
    amount: 15000000,
    description: 'Tiền thuê văn phòng tháng 1',
    relatedOrder: '',
    relatedProject: '',
    relatedCustomer: '',
    createdBy: 'Phùng Thị Xuân',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Văn phòng chính'
  },
  {
    id: 19,
    date: '2024-01-02',
    type: 'Thu',
    category: 'Phí giám định',
    amount: 11000000,
    description: 'Giám định an toàn PCCC',
    relatedOrder: 'ORD-2024-010',
    relatedProject: 'PRJ-010',
    relatedCustomer: 'Cộng tác viên C',
    createdBy: 'Quách Văn Yên',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Đã cấp chứng chỉ'
  },
  {
    id: 20,
    date: '2024-01-01',
    type: 'Chi',
    category: 'Lương thưởng',
    amount: 5000000,
    description: 'Thưởng cuối năm',
    relatedOrder: '',
    relatedProject: '',
    relatedCustomer: '',
    createdBy: 'Tăng Thị Zuni',
    status: 'Completed',
    paymentMethod: 'Chuyển khoản',
    notes: 'Thưởng Tết 2024'
  }
]

export default function FinancePage() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<any>(null)
  const [viewingTransaction, setViewingTransaction] = useState<any>(null)

  const categories = Array.from(new Set(mockTransactions.map(t => t.category)))

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.relatedOrder?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.relatedCustomer?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesType = selectedType === 'all' || transaction.type === selectedType
      const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus
      
      return matchesSearch && matchesType && matchesCategory && matchesStatus
    })
  }, [transactions, searchTerm, selectedType, selectedCategory, selectedStatus])

  const totalRevenue = filteredTransactions
    .filter(t => t.type === 'Thu' && t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'Chi' && t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const netIncome = totalRevenue - totalExpenses

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'Completed': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Cancelled': 'bg-red-100 text-red-800'
    }
    return (
      <Badge className={variants[status] || 'bg-gray-100 text-gray-800'}>
        {status === 'Completed' ? 'Hoàn thành' : status === 'Pending' ? 'Chờ xử lý' : 'Đã hủy'}
      </Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      'Thu': 'bg-green-100 text-green-800',
      'Chi': 'bg-red-100 text-red-800'
    }
    return (
      <Badge className={variants[type] || 'bg-gray-100 text-gray-800'}>
        {type}
      </Badge>
    )
  }

  const columns = [
    {
      key: 'date',
      label: 'Ngày',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3 text-slate-500" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Loại',
      sortable: true,
      render: (value: string) => getTypeBadge(value)
    },
    {
      key: 'category',
      label: 'Danh mục',
      sortable: true
    },
    {
      key: 'description',
      label: 'Mô tả',
      sortable: true,
      render: (value: string) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Số tiền',
      sortable: true,
      render: (value: number, row: any) => (
        <span className={`font-medium ${row.type === 'Thu' ? 'text-green-600' : 'text-red-600'}`}>
          {row.type === 'Thu' ? '+' : '-'}{value.toLocaleString('vi-VN')} VNĐ
        </span>
      )
    },
    {
      key: 'relatedCustomer',
      label: 'Khách hàng',
      sortable: true,
      render: (value: string) => value || '-'
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: (value: string) => getStatusBadge(value)
    }
  ]

  const handleAdd = () => {
    setEditingTransaction(null)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (transaction: any) => {
    if (confirm(`Bạn có chắc chắn muốn xóa giao dịch "${transaction.description}"?`)) {
      setTransactions(transactions.filter(t => t.id !== transaction.id))
    }
  }

  const handleView = (transaction: any) => {
    setViewingTransaction(transaction)
  }

  const handleExport = () => {
    const csv = [
      columns.map(c => c.label).join(','),
      ...filteredTransactions.map(transaction => 
        columns.map(c => transaction[c.key]).join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'finance.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <AppLayout>
      <div className="space-y-4">
        {/* Header with Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-900">Quản lý Thu Chi</h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả loại</option>
              <option value="Thu">Thu</option>
              <option value="Chi">Chi</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Completed">Hoàn thành</option>
              <option value="Pending">Chờ xử lý</option>
              <option value="Cancelled">Đã hủy</option>
            </select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Thêm giao dịch
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Tổng Thu</p>
                  <p className="text-2xl font-bold text-green-600">
                    {totalRevenue.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Tổng Chi</p>
                  <p className="text-2xl font-bold text-red-600">
                    {totalExpenses.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Thu nhập ròng</p>
                  <p className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {netIncome.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Số giao dịch</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {filteredTransactions.length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Danh sách giao dịch</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Danh sách Giao dịch"
              data={filteredTransactions}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              onExport={handleExport}
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}