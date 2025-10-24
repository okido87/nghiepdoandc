'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AppLayout } from '@/components/app-layout'
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  User,
  Building,
  BarChart3
} from 'lucide-react'

interface EAIPReport {
  id: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REVIEWED' | 'APPROVED'
  description?: string
  recommendations?: string
  reportDate: string
  createdAt: string
  updatedAt: string
  order?: {
    id: string
    orderNumber: string
    inspectionType: string
    status: string
    scheduledDate: string
    completedDate?: string
    user: { 
      id: string
      name: string; 
      email: string 
      role: string
      department?: string
    }
    project: { 
      id: string
      name: string; 
      company: string;
      description?: string
      status: string
    }
  }
}

export default function EAIPPage() {
  const [eaipData, setEaipData] = useState<EAIPReport[]>([])
  const [filteredData, setFilteredData] = useState<EAIPReport[]>([])
  const [selectedReport, setSelectedReport] = useState<EAIPReport | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [severityFilter, setSeverityFilter] = useState('')
  const [loading, setLoading] = useState(true)
  
  // Form states for create/edit
  const [formData, setFormData] = useState({
    orderNumber: '',
    projectName: '',
    companyName: '',
    inspector: '',
    severity: 'MEDIUM',
    riskLevel: 'MEDIUM',
    status: 'PENDING',
    reportDate: '',
    description: '',
    recommendations: ''
  })

  // API functions
  const fetchEAIPReports = async () => {
    try {
      const response = await fetch('/api/eaip')
      if (response.ok) {
        const data = await response.json()
        setEaipData(data)
      } else {
        console.error('Failed to fetch EAIP reports from API')
      }
    } catch (error) {
      console.error('Error fetching EAIP reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const createEAIPReport = async (reportData: Partial<EAIPReport>) => {
    try {
      const response = await fetch('/api/eaip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      })
      
      if (response.ok) {
        const newReport = await response.json()
        setEaipData(prev => [newReport, ...prev])
        setIsCreateModalOpen(false)
        return true
      }
    } catch (error) {
      console.error('Error creating EAIP report:', error)
    }
    return false
  }

  const updateEAIPReport = async (id: string, reportData: Partial<EAIPReport>) => {
    try {
      const response = await fetch(`/api/eaip/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      })
      
      if (response.ok) {
        const updatedReport = await response.json()
        setEaipData(prev => prev.map(report => 
          report.id === id ? updatedReport : report
        ))
        setIsEditModalOpen(false)
        return true
      }
    } catch (error) {
      console.error('Error updating EAIP report:', error)
    }
    return false
  }

  const deleteEAIPReport = async (id: string) => {
    try {
      const response = await fetch(`/api/eaip/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setEaipData(prev => prev.filter(report => report.id !== id))
        return true
      }
    } catch (error) {
      console.error('Error deleting EAIP report:', error)
    }
    return false
  }

  // Load data on mount
  useEffect(() => {
    fetchEAIPReports()
  }, [])

  // Filters
  const filters = {
    search: searchTerm,
    status: statusFilter,
    severity: severityFilter
  }

  const handleFilterChange = (key: string, value: string) => {
    switch (key) {
      case 'search':
        setSearchTerm(value)
        break
      case 'status':
        setStatusFilter(value)
        break
      case 'severity':
        setSeverityFilter(value)
        break
    }
  }

  // Apply filters
  useEffect(() => {
    let filtered = eaipData

    if (filters.search) {
      filtered = filtered.filter(item =>
        item.order?.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.order?.project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.order?.project.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.order?.user.name.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status)
    }

    if (filters.severity) {
      filtered = filtered.filter(item => item.severity === filters.severity)
    }

    setFilteredData(filtered)
  }, [eaipData, filters])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200'
      case 'COMPLETED': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'REVIEWED': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'IN_PROGRESS': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'PENDING': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleView = (report: EAIPReport) => {
    setSelectedReport(report)
    setIsViewModalOpen(true)
  }

  const handleEdit = (report: EAIPReport) => {
    setSelectedReport(report)
    // Pre-fill form with existing data
    setFormData({
      orderNumber: report.order?.orderNumber || '',
      projectName: report.order?.project.name || '',
      companyName: report.order?.project.company || '',
      inspector: report.order?.user.name || '',
      severity: report.severity,
      riskLevel: report.riskLevel,
      status: report.status,
      reportDate: report.reportDate,
      description: report.description || '',
      recommendations: report.recommendations || ''
    })
    setIsEditModalOpen(true)
  }

  const handleDelete = async (report: EAIPReport) => {
    if (confirm(`Bạn có chắc muốn xóa báo cáo ${report.order?.orderNumber || 'N/A'}?`)) {
      const success = await deleteEAIPReport(report.id)
      if (success) {
        // Show success message or update UI
        console.log('EAIP report deleted successfully')
      } else {
        // Show error message
        alert('Không thể xóa báo cáo. Vui lòng thử lại.')
      }
    }
  }

  const handleExport = () => {
    alert('Xuất báo cáo EAIP')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateSubmit = async () => {
    const success = await createEAIPReport(formData)
    if (success) {
      // Reset form
      setFormData({
        orderNumber: '',
        projectName: '',
        companyName: '',
        inspector: '',
        severity: 'MEDIUM',
        riskLevel: 'MEDIUM',
        status: 'PENDING',
        reportDate: '',
        description: '',
        recommendations: ''
      })
    }
  }

  const handleEditSubmit = async () => {
    if (selectedReport) {
      const success = await updateEAIPReport(selectedReport.id, formData)
      if (success) {
        setIsEditModalOpen(false)
        setSelectedReport(null)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      orderNumber: '',
      projectName: '',
      companyName: '',
      inspector: '',
      severity: 'MEDIUM',
      riskLevel: 'MEDIUM',
      status: 'PENDING',
      reportDate: '',
      description: '',
      recommendations: ''
    })
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#F8FBFF] p-2">
        <div className="space-y-3">
          {/* Header with Integrated Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <h1 className="text-xl font-semibold text-[#1A365D]">Quản lý EAIP</h1>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* Integrated Filters */}
              <div className="flex items-center gap-2 bg-white border border-[#D1E5F0] rounded-lg px-2 py-1">
                <span className="text-xs font-medium text-[#6B7280] whitespace-nowrap">Lọc:</span>
                <select 
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
                >
                  <option value="">Trạng thái</option>
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="REVIEWED">Reviewed</option>
                  <option value="APPROVED">Approved</option>
                </select>
                <select 
                  value={filters.severity}
                  onChange={(e) => handleFilterChange('severity', e.target.value)}
                  className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
                >
                  <option value="">Mức độ</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
                <input 
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] w-24 sm:w-32"
                />
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-5 px-1 text-[#6B7280] hover:text-[#3A7BD5] hover:bg-transparent"
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('')
                    setSeverityFilter('')
                  }}
                >
                  <Filter className="w-3 h-3" />
                </Button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-7 px-3 border-[#D1E5F0] text-[#3A7BD5] hover:bg-[#E8F1FA] text-xs whitespace-nowrap"
                  onClick={handleExport}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
                <Button 
                  size="sm" 
                  className="h-7 px-3 bg-[#3A7BD5] hover:bg-[#2E5FA3] text-white text-xs whitespace-nowrap"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Tạo mới
                </Button>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-[#6B7280] mb-0.5">Tổng báo cáo</p>
                    <p className="text-lg font-semibold text-[#1A365D]">{loading ? '...' : filteredData.length}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-xs text-green-500">+12%</span>
                      <span className="text-xs text-[#6B7280]">vs tháng trước</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-[#E8F1FA] rounded-full flex items-center justify-center ml-1">
                    <FileText className="w-3 h-3 text-[#3A7BD5]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-[#6B7280] mb-0.5">Đang xử lý</p>
                    <p className="text-lg font-semibold text-[#3A7BD5]">
                      {loading ? '...' : filteredData.filter(r => r.status === 'IN_PROGRESS' || r.status === 'PENDING').length}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-xs text-green-500">+8%</span>
                      <span className="text-xs text-[#6B7280]">vs tháng trước</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center ml-1">
                    <Clock className="w-3 h-3 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-[#6B7280] mb-0.5">Hoàn thành</p>
                    <p className="text-lg font-semibold text-green-600">
                      {loading ? '...' : filteredData.filter(r => r.status === 'COMPLETED' || r.status === 'APPROVED').length}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-xs text-green-500">+15%</span>
                      <span className="text-xs text-[#6B7280]">vs tháng trước</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center ml-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-[#6B7280] mb-0.5">Rủi ro cao</p>
                    <p className="text-lg font-semibold text-red-600">
                      {loading ? '...' : filteredData.filter(r => r.severity === 'CRITICAL' || r.severity === 'HIGH').length}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-red-500" />
                      <span className="text-xs text-red-500">+5%</span>
                      <span className="text-xs text-[#6B7280]">vs tháng trước</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center ml-1">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* EAIP Reports Table */}
          <Card className="border-[#D1E5F0] bg-white shadow-sm">
            <CardContent className="p-3">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-sm text-[#6B7280]">Đang tải dữ liệu...</div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#D1E5F0]">
                        <th className="text-left py-2 px-2 text-sm font-medium text-[#1A365D]">Order</th>
                        <th className="text-left py-2 px-2 text-sm font-medium text-[#1A365D]">Dự án</th>
                        <th className="text-left py-2 px-2 text-sm font-medium text-[#1A365D]">Công ty</th>
                        <th className="text-left py-2 px-2 text-sm font-medium text-[#1A365D]">Giám định viên</th>
                        <th className="text-center py-2 px-2 text-sm font-medium text-[#1A365D]">Mức độ</th>
                        <th className="text-center py-2 px-2 text-sm font-medium text-[#1A365D]">Rủi ro</th>
                        <th className="text-center py-2 px-2 text-sm font-medium text-[#1A365D]">Trạng thái</th>
                        <th className="text-center py-2 px-2 text-sm font-medium text-[#1A365D]">Ngày</th>
                        <th className="text-center py-2 px-2 text-sm font-medium text-[#1A365D]">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="py-8 text-center text-xs text-[#6B7280]">
                            Không có dữ liệu báo cáo EAIP
                          </td>
                        </tr>
                      ) : (
                        filteredData.map((report) => (
                          <tr key={report.id} className="border-b border-[#E8F1FA] hover:bg-[#F8FBFF]">
                            <td className="py-2 px-2">
                              <div className="text-xs font-medium text-[#1A365D]">
                                {report.order?.orderNumber || 'N/A'}
                              </div>
                            </td>
                            <td className="py-2 px-2">
                              <div className="text-xs text-[#4A5568]">
                                {report.order?.project.name || 'N/A'}
                              </div>
                            </td>
                            <td className="py-2 px-2">
                              <div className="text-xs text-[#4A5568]">
                                {report.order?.project.company || 'N/A'}
                              </div>
                            </td>
                            <td className="py-2 px-2">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3 text-[#3A7BD5]" />
                                <span className="text-xs text-[#4A5568]">
                                  {report.order?.user.name || 'N/A'}
                                </span>
                              </div>
                            </td>
                            <td className="py-2 px-2 text-center">
                              <Badge className={`text-xs ${getSeverityColor(report.severity)}`}>
                                {report.severity}
                              </Badge>
                            </td>
                            <td className="py-2 px-2 text-center">
                              <Badge className={`text-xs ${getSeverityColor(report.riskLevel)}`}>
                                {report.riskLevel}
                              </Badge>
                            </td>
                            <td className="py-2 px-2 text-center">
                              <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                                {report.status.replace('_', ' ')}
                              </Badge>
                            </td>
                            <td className="py-2 px-2 text-center">
                              <div className="flex items-center gap-1 justify-center">
                                <Calendar className="w-3 h-3 text-[#3A7BD5]" />
                                <span className="text-xs text-[#4A5568]">{report.reportDate}</span>
                              </div>
                            </td>
                            <td className="py-2 px-2">
                              <div className="flex items-center justify-center gap-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 px-2 text-[#3A7BD5] hover:bg-[#E8F1FA]"
                                  onClick={() => handleView(report)}
                                >
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 px-2 text-[#5AB2F2] hover:bg-[#E8F1FA]"
                                  onClick={() => handleEdit(report)}
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 px-2 text-red-500 hover:bg-red-50"
                                  onClick={() => handleDelete(report)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* View Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-[600px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-[#1A365D]">
                Chi tiết báo cáo EAIP - {selectedReport?.order?.orderNumber || 'N/A'}
              </DialogTitle>
            </DialogHeader>
            
            {selectedReport && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-medium text-[#1A365D]">Số Order:</span>
                    <span className="text-[#4A5568] ml-2">{selectedReport.order?.orderNumber || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Trạng thái:</span>
                    <Badge className={`ml-2 text-xs ${getStatusColor(selectedReport.status)}`}>
                      {selectedReport.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Dự án:</span>
                    <span className="text-[#4A5568] ml-2">{selectedReport.order?.project.name || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Công ty:</span>
                    <span className="text-[#4A5568] ml-2">{selectedReport.order?.project.company || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Giám định viên:</span>
                    <span className="text-[#4A5568] ml-2">{selectedReport.order?.user.name || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Ngày báo cáo:</span>
                    <span className="text-[#4A5568] ml-2">{selectedReport.reportDate}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Mức độ nghiêm trọng:</span>
                    <Badge className={`ml-2 text-xs ${getSeverityColor(selectedReport.severity)}`}>
                      {selectedReport.severity}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Mức độ rủi ro:</span>
                    <Badge className={`ml-2 text-xs ${getSeverityColor(selectedReport.riskLevel)}`}>
                      {selectedReport.riskLevel}
                    </Badge>
                  </div>
                </div>
                
                {selectedReport.description && (
                  <div>
                    <h4 className="text-sm font-medium text-[#1A365D] mb-2">Mô tả</h4>
                    <p className="text-xs text-[#4A5568] bg-[#F8FBFF] p-3 rounded border border-[#D1E5F0]">
                      {selectedReport.description}
                    </p>
                  </div>
                )}
                
                {selectedReport.recommendations && (
                  <div>
                    <h4 className="text-sm font-medium text-[#1A365D] mb-2">Khuyến nghị</h4>
                    <p className="text-xs text-[#4A5568] bg-[#F8FBFF] p-3 rounded border border-[#D1E5F0]">
                      {selectedReport.recommendations}
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Create Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-[#1A365D]">
                Tạo báo cáo EAIP mới
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Số Order</label>
                  <Input 
                    className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" 
                    placeholder="ORD-2024-XXX"
                    value={formData.orderNumber}
                    onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Giám định viên</label>
                  <Input 
                    className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" 
                    placeholder="Nhập tên giám định viên"
                    value={formData.inspector}
                    onChange={(e) => handleInputChange('inspector', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Dự án</label>
                  <Input 
                    className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" 
                    placeholder="Nhập tên dự án"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Công ty</label>
                  <Input 
                    className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" 
                    placeholder="Nhập tên công ty"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Mức độ</label>
                  <Select value={formData.severity} onValueChange={(value) => handleInputChange('severity', value)}>
                    <SelectTrigger className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]">
                      <SelectValue placeholder="Chọn mức độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="CRITICAL">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Rủi ro</label>
                  <Select value={formData.riskLevel} onValueChange={(value) => handleInputChange('riskLevel', value)}>
                    <SelectTrigger className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]">
                      <SelectValue placeholder="Chọn rủi ro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="CRITICAL">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Ngày báo cáo</label>
                  <Input 
                    type="date" 
                    className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" 
                    value={formData.reportDate}
                    onChange={(e) => handleInputChange('reportDate', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Mô tả</label>
                <textarea 
                  className="w-full p-3 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5] min-h-[80px] resize-none"
                  placeholder="Nhập mô tả chi tiết..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Khuyến nghị</label>
                <textarea 
                  className="w-full p-3 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5] min-h-[80px] resize-none"
                  placeholder="Nhập khuyến nghị..."
                  value={formData.recommendations}
                  onChange={(e) => handleInputChange('recommendations', e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-[#D1E5F0]">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsCreateModalOpen(false)
                    resetForm()
                  }}
                  className="h-8 px-4 border-[#D1E5F0] text-[#3A7BD5] hover:bg-[#E8F1FA] text-xs"
                >
                  Hủy
                </Button>
                <Button 
                  onClick={handleCreateSubmit}
                  className="h-8 px-4 bg-[#3A7BD5] hover:bg-[#2E5FA3] text-white text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Tạo báo cáo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-[#1A365D]">
                Chỉnh sửa báo cáo EAIP - {selectedReport?.order?.orderNumber || 'N/A'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Số Order</label>
                  <Input 
                    className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" 
                    placeholder="ORD-2024-XXX"
                    value={formData.orderNumber}
                    onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Giám định viên</label>
                  <Input 
                    className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" 
                    placeholder="Nhập tên giám định viên"
                    value={formData.inspector}
                    onChange={(e) => handleInputChange('inspector', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Dự án</label>
                  <Input 
                    className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" 
                    placeholder="Nhập tên dự án"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Công ty</label>
                  <Input 
                    className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" 
                    placeholder="Nhập tên công ty"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Mức độ</label>
                  <Select value={formData.severity} onValueChange={(value) => handleInputChange('severity', value)}>
                    <SelectTrigger className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]">
                      <SelectValue placeholder="Chọn mức độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="CRITICAL">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Rủi ro</label>
                  <Select value={formData.riskLevel} onValueChange={(value) => handleInputChange('riskLevel', value)}>
                    <SelectTrigger className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]">
                      <SelectValue placeholder="Chọn rủi ro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="CRITICAL">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Ngày báo cáo</label>
                  <Input 
                    type="date" 
                    className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" 
                    value={formData.reportDate}
                    onChange={(e) => handleInputChange('reportDate', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Trạng thái</label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="REVIEWED">Reviewed</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Mô tả</label>
                <textarea 
                  className="w-full p-3 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5] min-h-[80px] resize-none"
                  placeholder="Nhập mô tả chi tiết..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Khuyến nghị</label>
                <textarea 
                  className="w-full p-3 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5] min-h-[80px] resize-none"
                  placeholder="Nhập khuyến nghị..."
                  value={formData.recommendations}
                  onChange={(e) => handleInputChange('recommendations', e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-[#D1E5F0]">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditModalOpen(false)
                    resetForm()
                    setSelectedReport(null)
                  }}
                  className="h-8 px-4 border-[#D1E5F0] text-[#3A7BD5] hover:bg-[#E8F1FA] text-xs"
                >
                  Hủy
                </Button>
                <Button 
                  onClick={handleEditSubmit}
                  className="h-8 px-4 bg-[#3A7BD5] hover:bg-[#2E5FA3] text-white text-xs"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Cập nhật
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}