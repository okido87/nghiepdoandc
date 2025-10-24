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
  Camera, 
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
  Image as ImageIcon,
  FileText,
  CheckCircle,
  AlertTriangle,
  X,
  MapPin,
  Save
} from 'lucide-react'

interface Report {
  id: string
  title: string
  content: string | null
  location: string | null
  reportDate: string
  status: string
  assetId: string | null
  createdById: string
  images: string | null
  teamDoContent: string | null
  teamCheckContent: string | null
  teamDoImages: string | null
  teamCheckImages: string | null
  comments: string | null
  createdAt: string
  updatedAt: string
  asset: {
    id: string
    name: string
    code: string | null
  } | null
  createdBy: {
    id: string
    name: string | null
    email: string
  }
}

interface ReportsResponse {
  reports: Report[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const statusMap = {
  draft: { label: 'Nháp', color: 'bg-gray-100 text-gray-800' },
  submitted: { label: 'Chờ checking', color: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Đã duyệt', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Cần sửa đổi', color: 'bg-red-100 text-red-800' }
}

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<Report | null>(null)
  const [viewingReport, setViewingReport] = useState<Report | null>(null)
  
  // Pagination states
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: '',
    reportDate: new Date().toISOString().split('T')[0],
    status: 'draft',
    assetId: '',
    createdById: ''
  })

  // Fetch reports from API
  const fetchReports = async (page = 1, status = 'all', search = '') => {
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

      const response = await fetch(`/api/reports?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch reports')
      }
      
      const data: ReportsResponse = await response.json()
      setReports(data.reports)
      setPagination(data.pagination)
      setError(null)
    } catch (err) {
      setError('Không thể tải dữ liệu báo cáo')
      console.error('Error fetching reports:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports(pagination.page, selectedStatus, searchTerm)
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

  const handleViewReport = (report: Report) => {
    setViewingReport(report)
  }

  const handleEditReport = (report: Report) => {
    setEditingReport(report)
    setFormData({
      title: report.title,
      content: report.content || '',
      location: report.location || '',
      reportDate: new Date(report.reportDate).toISOString().split('T')[0],
      status: report.status,
      assetId: report.assetId || '',
      createdById: report.createdById
    })
  }

  const handleDeleteReport = async (reportId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa báo cáo này?')) {
      try {
        const response = await fetch(`/api/reports/${reportId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          fetchReports(pagination.page, selectedStatus, searchTerm)
        }
      } catch (error) {
        console.error('Error deleting report:', error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingReport ? `/api/reports/${editingReport.id}` : '/api/reports'
      const method = editingReport ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsCreateModalOpen(false)
        setEditingReport(null)
        fetchReports(pagination.page, selectedStatus, searchTerm)
      }
    } catch (error) {
      console.error('Error saving report:', error)
    }
  }

  const columns = [
    {
      key: 'title',
      label: 'Tiêu đề báo cáo',
      render: (value: any, report: Report) => (
        <div>
          <div className="font-medium text-gray-900">{report.title}</div>
          {report.content && (
            <div className="text-sm text-gray-500 line-clamp-2">{report.content}</div>
          )}
        </div>
      )
    },
    {
      key: 'asset',
      label: 'Tài sản',
      render: (value: any, report: Report) => (
        <div className="flex items-center gap-2">
          {report.asset ? (
            <>
              <Package className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-sm font-medium">{report.asset.name}</div>
                {report.asset.code && (
                  <div className="text-xs text-gray-500">{report.asset.code}</div>
                )}
              </div>
            </>
          ) : (
            <span className="text-sm text-gray-400">Chưa gán</span>
          )}
        </div>
      )
    },
    {
      key: 'location',
      label: 'Địa điểm',
      render: (value: any, report: Report) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{report.location || 'Chưa xác định'}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Trạng thái',
      render: (value: any, report: Report) => {
        const statusInfo = statusMap[report.status as keyof typeof statusMap] || { label: report.status, color: 'bg-gray-100 text-gray-800' }
        return (
          <Badge className={statusInfo.color}>
            {statusInfo.label}
          </Badge>
        )
      }
    },
    {
      key: 'reportDate',
      label: 'Ngày báo cáo',
      render: (value: any, report: Report) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{report.reportDate ? new Date(report.reportDate).toLocaleDateString('vi-VN') : 'Chưa xác định'}</span>
        </div>
      )
    },
    {
      key: 'createdBy',
      label: 'Người tạo',
      render: (value: any, report: Report) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{report.createdBy?.name || report.createdBy?.email || 'Chưa xác định'}</span>
        </div>
      )
    },
    {
      key: 'media',
      label: 'Media',
      render: (value: any, report: Report) => {
        try {
          const imageCount = report.images ? JSON.parse(report.images).length : 0
          const teamDoImageCount = report.teamDoImages ? JSON.parse(report.teamDoImages).length : 0
          const teamCheckImageCount = report.teamCheckImages ? JSON.parse(report.teamCheckImages).length : 0
          const totalImages = imageCount + teamDoImageCount + teamCheckImageCount
          
          return (
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{totalImages} ảnh</span>
            </div>
          )
        } catch (error) {
          return (
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm">0 ảnh</span>
            </div>
          )
        }
      }
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (value: any, report: Report) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewReport(report)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditReport(report)}
            className="text-green-600 hover:text-green-800"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteReport(report.id)}
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
            <h1 className="text-2xl font-bold text-gray-900">Báo cáo giám định</h1>
            <p className="text-gray-600">Quản lý các báo cáo giám định hiện trường</p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Tạo báo cáo mới
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng báo cáo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{pagination.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Nháp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {reports.filter(r => r.status === 'draft').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Chờ checking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {reports.filter(r => r.status === 'submitted').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đã duyệt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {reports.filter(r => r.status === 'approved').length}
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
                    placeholder="Tìm kiếm báo cáo..."
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
                  variant={selectedStatus === 'draft' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('draft')}
                >
                  Nháp
                </Button>
                <Button
                  variant={selectedStatus === 'submitted' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('submitted')}
                >
                  Chờ checking
                </Button>
                <Button
                  variant={selectedStatus === 'approved' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('approved')}
                >
                  Đã duyệt
                </Button>
                <Button
                  variant={selectedStatus === 'rejected' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('rejected')}
                >
                  Cần sửa đổi
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Table */}
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
                data={reports}
                columns={columns}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </CardContent>
        </Card>

        {/* Create/Edit Modal */}
        <Dialog open={isCreateModalOpen || !!editingReport} onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false)
            setEditingReport(null)
            setFormData({
              title: '',
              content: '',
              location: '',
              reportDate: new Date().toISOString().split('T')[0],
              status: 'draft',
              assetId: '',
              createdById: ''
            })
          }
        }}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingReport ? 'Chỉnh sửa báo cáo' : 'Tạo báo cáo mới'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề báo cáo
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa điểm
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày báo cáo
                  </label>
                  <Input
                    type="date"
                    value={formData.reportDate}
                    onChange={(e) => setFormData({ ...formData, reportDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="draft">Nháp</option>
                    <option value="submitted">Chờ checking</option>
                    <option value="approved">Đã duyệt</option>
                    <option value="rejected">Cần sửa đổi</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreateModalOpen(false)
                    setEditingReport(null)
                  }}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {editingReport ? 'Cập nhật' : 'Tạo'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Modal */}
        <Dialog open={!!viewingReport} onOpenChange={(open) => !open && setViewingReport(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chi tiết báo cáo</DialogTitle>
            </DialogHeader>
            {viewingReport && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Thông tin chung</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Tiêu đề:</span> {viewingReport.title}
                    </div>
                    <div>
                      <span className="font-medium">Trạng thái:</span>{' '}
                      <Badge className={statusMap[viewingReport.status as keyof typeof statusMap]?.color || 'bg-gray-100 text-gray-800'}>
                        {statusMap[viewingReport.status as keyof typeof statusMap]?.label || viewingReport.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Địa điểm:</span> {viewingReport.location || 'Chưa xác định'}
                    </div>
                    <div>
                      <span className="font-medium">Người tạo:</span> {viewingReport.createdBy?.name || viewingReport.createdBy?.email || 'Chưa xác định'}
                    </div>
                    <div>
                      <span className="font-medium">Ngày báo cáo:</span> {viewingReport.reportDate ? new Date(viewingReport.reportDate).toLocaleDateString('vi-VN') : 'Chưa xác định'}
                    </div>
                    <div>
                      <span className="font-medium">Tài sản:</span> {viewingReport.asset?.name || 'Chưa gán'}
                    </div>
                  </div>
                </div>
                
                {viewingReport.content && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Nội dung báo cáo</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{viewingReport.content}</p>
                    </div>
                  </div>
                )}

                {viewingReport.teamDoContent && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Nội dung từ Đội Do</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{viewingReport.teamDoContent}</p>
                    </div>
                  </div>
                )}

                {viewingReport.teamCheckContent && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Nội dung từ Đội Check</h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{viewingReport.teamCheckContent}</p>
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Hình ảnh</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {(() => {
                      try {
                        const allImages = []
                        if (viewingReport.images) {
                          allImages.push(...JSON.parse(viewingReport.images))
                        }
                        if (viewingReport.teamDoImages) {
                          allImages.push(...JSON.parse(viewingReport.teamDoImages))
                        }
                        if (viewingReport.teamCheckImages) {
                          allImages.push(...JSON.parse(viewingReport.teamCheckImages))
                        }
                        
                        return allImages.map((image: string, index: number) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Report image ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                              <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                          </div>
                        ))
                      } catch (error) {
                        return <div className="col-span-3 text-center text-gray-500">Không có hình ảnh</div>
                      }
                    })()}
                  </div>
                </div>

                {viewingReport.comments && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Nhận xét</h3>
                    <div className="space-y-2">
                      {(() => {
                        try {
                          return JSON.parse(viewingReport.comments).map((comment: any, index: number) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(comment.timestamp).toLocaleDateString('vi-VN')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{comment.text}</p>
                            </div>
                          ))
                        } catch (error) {
                          return <div className="text-center text-gray-500">Không có nhận xét</div>
                        }
                      })()}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}