'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/data-table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AppLayout } from '@/components/app-layout'
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Filter,
  Calendar,
  Building,
  User,
  Package,
  Camera,
  X,
  MapPin,
  FileText,
  CheckCircle,
  Save
} from 'lucide-react'

interface InspectionPlan {
  id: string
  name: string
  description: string
  status: string
  startDate: string
  endDate: string | null
  companyId: string
  createdById: string
  createdAt: string
  updatedAt: string
  company: {
    id: string
    name: string
    address: string | null
    phone: string | null
    email: string | null
  }
  createdBy: {
    id: string
    name: string | null
    email: string
  }
  _count: {
    assets: number
    tasks: number
    certificates: number
  }
}

interface PlansResponse {
  plans: InspectionPlan[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const statusMap = {
  pending: { label: 'Chờ thực hiện', color: 'bg-yellow-100 text-yellow-800' },
  in_progress: { label: 'Đang thực hiện', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Đã hoàn thành', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800' }
}

export default function PlansPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [plans, setPlans] = useState<InspectionPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<InspectionPlan | null>(null)
  const [viewingPlan, setViewingPlan] = useState<InspectionPlan | null>(null)
  
  // Pagination states
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    companyId: '',
    createdById: ''
  })

  // Fetch plans from API
  const fetchPlans = async (page = 1, status = 'all', search = '') => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      })
      
      if (status && status !== 'all') {
        params.append('status', status)
      }
      
      if (search) {
        params.append('search', search)
      }

      const response = await fetch(`/api/plans?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch plans')
      }
      
      const data: PlansResponse = await response.json()
      setPlans(data.plans)
      setPagination(data.pagination)
      setError(null)
    } catch (err) {
      setError('Không thể tải dữ liệu kế hoạch')
      console.error('Error fetching plans:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans(pagination.page, selectedStatus, searchTerm)
  }, [pagination.page, selectedStatus, searchTerm])

  const handleFilterChange = (status: string) => {
    setSelectedStatus(status)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }))
  }

  const handleViewPlan = (plan: InspectionPlan) => {
    setViewingPlan(plan)
  }

  const handleEditPlan = (plan: InspectionPlan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      description: plan.description || '',
      startDate: new Date(plan.startDate).toISOString().split('T')[0],
      endDate: plan.endDate ? new Date(plan.endDate).toISOString().split('T')[0] : '',
      companyId: plan.companyId,
      createdById: plan.createdById
    })
  }

  const handleDeletePlan = async (planId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kế hoạch này?')) {
      try {
        const response = await fetch(`/api/plans/${planId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          fetchPlans(pagination.page, selectedStatus, searchTerm)
        }
      } catch (error) {
        console.error('Error deleting plan:', error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingPlan ? `/api/plans/${editingPlan.id}` : '/api/plans'
      const method = editingPlan ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsCreateModalOpen(false)
        setEditingPlan(null)
        fetchPlans(pagination.page, selectedStatus, searchTerm)
      }
    } catch (error) {
      console.error('Error saving plan:', error)
    }
  }

  const columns = [
    {
      key: 'name',
      label: 'Tên kế hoạch',
      render: (value: any, plan: InspectionPlan) => (
        <div>
          <div className="font-medium text-gray-900">{plan.name}</div>
          <div className="text-sm text-gray-500 line-clamp-1">{plan.description}</div>
        </div>
      )
    },
    {
      key: 'company',
      label: 'Công ty',
      render: (value: any, plan: InspectionPlan) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{plan.company?.name || 'Chưa gán'}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Trạng thái',
      render: (value: any, plan: InspectionPlan) => {
        const statusInfo = statusMap[plan.status as keyof typeof statusMap] || { label: plan.status, color: 'bg-gray-100 text-gray-800' }
        return (
          <Badge className={statusInfo.color}>
            {statusInfo.label}
          </Badge>
        )
      }
    },
    {
      key: 'dates',
      label: 'Thời gian',
      render: (value: any, plan: InspectionPlan) => (
        <div className="text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span>Bắt đầu: {plan.startDate ? new Date(plan.startDate).toLocaleDateString('vi-VN') : 'Chưa xác định'}</span>
          </div>
          {plan.endDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-gray-400" />
              <span>Kết thúc: {new Date(plan.endDate).toLocaleDateString('vi-VN')}</span>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'counts',
      label: 'Số lượng',
      render: (value: any, plan: InspectionPlan) => (
        <div className="flex gap-2 text-sm">
          <Badge variant="outline" className="flex items-center gap-1">
            <Package className="h-3 w-3" />
            {plan._count.assets}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {plan._count.tasks}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            {plan._count.certificates}
          </Badge>
        </div>
      )
    },
    {
      key: 'createdBy',
      label: 'Người tạo',
      render: (value: any, plan: InspectionPlan) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{plan.createdBy?.name || plan.createdBy?.email || 'Chưa xác định'}</span>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (value: any, plan: InspectionPlan) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewPlan(plan)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditPlan(plan)}
            className="text-green-600 hover:text-green-800"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeletePlan(plan.id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ]

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kế hoạch giám định</h1>
            <p className="text-gray-600">Quản lý các kế hoạch giám định thiết bị</p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Tạo kế hoạch mới
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng kế hoạch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{pagination.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Chờ thực hiện</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {plans.filter(p => p.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đang thực hiện</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {plans.filter(p => p.status === 'in_progress').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đã hoàn thành</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {plans.filter(p => p.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Bộ lọc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm kế hoạch..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('all')}
                >
                  Tất cả
                </Button>
                <Button
                  variant={selectedStatus === 'pending' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('pending')}
                >
                  Chờ thực hiện
                </Button>
                <Button
                  variant={selectedStatus === 'in_progress' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('in_progress')}
                >
                  Đang thực hiện
                </Button>
                <Button
                  variant={selectedStatus === 'completed' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('completed')}
                >
                  Đã hoàn thành
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plans Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Đang tải...</div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-red-500">{error}</div>
              </div>
            ) : (
              <DataTable
                data={plans}
                columns={columns}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </CardContent>
        </Card>

        {/* Create/Edit Modal */}
        <Dialog open={isCreateModalOpen || !!editingPlan} onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false)
            setEditingPlan(null)
            setFormData({
              name: '',
              description: '',
              startDate: new Date().toISOString().split('T')[0],
              endDate: '',
              companyId: '',
              createdById: ''
            })
          }
        }}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingPlan ? 'Chỉnh sửa kế hoạch' : 'Tạo kế hoạch mới'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên kế hoạch
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày bắt đầu
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày kết thúc
                  </label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreateModalOpen(false)
                    setEditingPlan(null)
                  }}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {editingPlan ? 'Cập nhật' : 'Tạo'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Modal */}
        <Dialog open={!!viewingPlan} onOpenChange={(open) => !open && setViewingPlan(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chi tiết kế hoạch</DialogTitle>
            </DialogHeader>
            {viewingPlan && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Thông tin chung</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Tên kế hoạch:</span> {viewingPlan.name}
                    </div>
                    <div>
                      <span className="font-medium">Trạng thái:</span>{' '}
                      <Badge className={statusMap[viewingPlan.status as keyof typeof statusMap]?.color || 'bg-gray-100 text-gray-800'}>
                        {statusMap[viewingPlan.status as keyof typeof statusMap]?.label || viewingPlan.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Công ty:</span> {viewingPlan.company?.name || 'Chưa gán'}
                    </div>
                    <div>
                      <span className="font-medium">Người tạo:</span> {viewingPlan.createdBy?.name || viewingPlan.createdBy?.email || 'Chưa xác định'}
                    </div>
                    <div>
                      <span className="font-medium">Ngày bắt đầu:</span> {viewingPlan.startDate ? new Date(viewingPlan.startDate).toLocaleDateString('vi-VN') : 'Chưa xác định'}
                    </div>
                    <div>
                      <span className="font-medium">Ngày kết thúc:</span> {viewingPlan.endDate ? new Date(viewingPlan.endDate).toLocaleDateString('vi-VN') : 'Chưa xác định'}
                    </div>
                  </div>
                </div>
                
                {viewingPlan.description && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Mô tả</h3>
                    <p className="text-sm text-gray-600">{viewingPlan.description}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Thống kê</h3>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span>Tài sản: {viewingPlan._count.assets}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>Tác vụ: {viewingPlan._count.tasks}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-gray-400" />
                      <span>Chứng chỉ: {viewingPlan._count.certificates}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}