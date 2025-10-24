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
  BarChart3, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  Target,
  Activity,
  PieChart
} from 'lucide-react'

interface AnalyticsReport {
  id: string
  orderId: string
  orderNumber: string
  projectName: string
  companyName: string
  reportType: 'FINANCIAL' | 'PERFORMANCE' | 'RISK' | 'COMPLIANCE' | 'OPERATIONAL'
  title: string
  description: string
  status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'PUBLISHED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  reportDate: string
  period: string
  metrics: {
    revenue: number
    costs: number
    profit: number
    efficiency: number
    riskScore: number
    compliance: number
  }
  comparisons: {
    revenueChange: number
    costsChange: number
    profitChange: number
    efficiencyChange: number
    riskChange: number
    complianceChange: number
  }
  createdAt: string
  updatedAt: string
  order?: {
    user: { name: string; email: string }
    project: { name: string; company: string }
  }
}

const mockAnalyticsData: AnalyticsReport[] = [
  {
    id: '1',
    orderId: '1',
    orderNumber: 'ORD-2024-001',
    projectName: 'Máy phát điện 1500KVA',
    companyName: 'Công ty Điện lực ABC',
    reportType: 'PERFORMANCE',
    title: 'Báo cáo hiệu suất máy phát điện Q1/2024',
    description: 'Phân tích hiệu suất vận hành và tiêu thụ nhiên liệu của máy phát điện',
    status: 'APPROVED',
    priority: 'HIGH',
    reportDate: '2024-01-15',
    period: 'Q1/2024',
    metrics: {
      revenue: 15000000,
      costs: 8500000,
      profit: 6500000,
      efficiency: 87,
      riskScore: 25,
      compliance: 95
    },
    comparisons: {
      revenueChange: 12.5,
      costsChange: -5.2,
      profitChange: 18.7,
      efficiencyChange: 3.2,
      riskChange: -8.1,
      complianceChange: 2.5
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-16T14:30:00Z'
  },
  {
    id: '2',
    orderId: '2',
    orderNumber: 'ORD-2024-002',
    projectName: 'Hệ thống điện nhà xưởng',
    companyName: 'Công ty XYZ Manufacturing',
    reportType: 'FINANCIAL',
    title: 'Báo cáo tài chính dự án điện',
    description: 'Phân tích chi phí và lợi nhuận của dự án nâng cấp hệ thống điện',
    status: 'PUBLISHED',
    priority: 'MEDIUM',
    reportDate: '2024-01-16',
    period: 'Tháng 1/2024',
    metrics: {
      revenue: 8500000,
      costs: 5200000,
      profit: 3300000,
      efficiency: 78,
      riskScore: 35,
      compliance: 88
    },
    comparisons: {
      revenueChange: 8.3,
      costsChange: 2.1,
      profitChange: 15.6,
      efficiencyChange: -1.5,
      riskChange: 5.2,
      complianceChange: 0.8
    },
    createdAt: '2024-01-16T09:00:00Z',
    updatedAt: '2024-01-17T11:20:00Z'
  },
  {
    id: '3',
    orderId: '3',
    orderNumber: 'ORD-2024-003',
    projectName: 'Thiết bị nâng',
    companyName: 'Công ty Cơ khí DEF',
    reportType: 'RISK',
    title: 'Báo cáo đánh giá rủi ro thiết bị nâng',
    description: 'Đánh giá rủi ro và đề xuất biện pháp an toàn cho thiết bị nâng',
    status: 'PENDING_REVIEW',
    priority: 'CRITICAL',
    reportDate: '2024-01-17',
    period: 'Tuần 3/2024',
    metrics: {
      revenue: 12000000,
      costs: 7800000,
      profit: 4200000,
      efficiency: 82,
      riskScore: 65,
      compliance: 92
    },
    comparisons: {
      revenueChange: 5.7,
      costsChange: 8.9,
      profitChange: -2.3,
      efficiencyChange: 1.8,
      riskChange: 12.4,
      complianceChange: -1.2
    },
    createdAt: '2024-01-17T08:00:00Z',
    updatedAt: '2024-01-17T08:00:00Z'
  },
  {
    id: '4',
    orderId: '4',
    orderNumber: 'ORD-2024-004',
    projectName: 'Hệ thống chống sét',
    companyName: 'Tòa nhà Landmark 81',
    reportType: 'COMPLIANCE',
    title: 'Báo cáo tuân thủ tiêu chuẩn chống sét',
    description: 'Kiểm tra tuân thủ các tiêu chuẩn an toàn chống sét quốc tế',
    status: 'APPROVED',
    priority: 'HIGH',
    reportDate: '2024-01-14',
    period: 'Tháng 1/2024',
    metrics: {
      revenue: 25000000,
      costs: 15000000,
      profit: 10000000,
      efficiency: 91,
      riskScore: 15,
      compliance: 98
    },
    comparisons: {
      revenueChange: 15.2,
      costsChange: -3.7,
      profitChange: 28.9,
      efficiencyChange: 5.3,
      riskChange: -12.6,
      complianceChange: 3.1
    },
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-15T16:45:00Z'
  },
  {
    id: '5',
    orderId: '5',
    orderNumber: 'ORD-2024-005',
    projectName: 'Hệ thống PCCC',
    companyName: 'Trung tâm thương mại Vincom',
    reportType: 'OPERATIONAL',
    title: 'Báo cáo vận hành hệ thống PCCC',
    description: 'Phân tích hiệu quả và chi phí vận hành hệ thống PCCC',
    status: 'DRAFT',
    priority: 'MEDIUM',
    reportDate: '2024-01-18',
    period: 'Tháng 1/2024',
    metrics: {
      revenue: 18000000,
      costs: 12000000,
      profit: 6000000,
      efficiency: 75,
      riskScore: 28,
      compliance: 85
    },
    comparisons: {
      revenueChange: 7.8,
      costsChange: 4.5,
      profitChange: 12.3,
      efficiencyChange: -2.1,
      riskChange: -3.7,
      complianceChange: 1.5
    },
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-01-18T09:00:00Z'
  }
]

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsReport[]>(mockAnalyticsData)
  const [filteredData, setFilteredData] = useState<AnalyticsReport[]>(mockAnalyticsData)
  const [selectedReport, setSelectedReport] = useState<AnalyticsReport | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  // Filters
  const filters = {
    search: searchTerm,
    status: statusFilter,
    type: typeFilter,
    priority: priorityFilter
  }

  const handleFilterChange = (key: string, value: string) => {
    switch (key) {
      case 'search':
        setSearchTerm(value)
        break
      case 'status':
        setStatusFilter(value)
        break
      case 'type':
        setTypeFilter(value)
        break
      case 'priority':
        setPriorityFilter(value)
        break
    }
  }

  // Apply filters
  useEffect(() => {
    let filtered = analyticsData

    if (filters.search) {
      filtered = filtered.filter(item =>
        item.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.projectName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.title.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status)
    }

    if (filters.type) {
      filtered = filtered.filter(item => item.reportType === filters.type)
    }

    if (filters.priority) {
      filtered = filtered.filter(item => item.priority === filters.priority)
    }

    setFilteredData(filtered)
  }, [analyticsData, filters])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-green-100 text-green-800 border-green-200'
      case 'APPROVED': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'PENDING_REVIEW': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'DRAFT': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'FINANCIAL': return 'bg-green-100 text-green-800 border-green-200'
      case 'PERFORMANCE': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'RISK': return 'bg-red-100 text-red-800 border-red-200'
      case 'COMPLIANCE': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'OPERATIONAL': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'FINANCIAL': return 'Tài chính'
      case 'PERFORMANCE': return 'Hiệu suất'
      case 'RISK': return 'Rủi ro'
      case 'COMPLIANCE': return 'Tuân thủ'
      case 'OPERATIONAL': return 'Vận hành'
      default: return type
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'Bản nháp'
      case 'PENDING_REVIEW': return 'Chờ duyệt'
      case 'APPROVED': return 'Đã duyệt'
      case 'PUBLISHED': return 'Đã xuất bản'
      default: return status
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const handleView = (report: AnalyticsReport) => {
    setSelectedReport(report)
    setIsViewModalOpen(true)
  }

  const handleEdit = (report: AnalyticsReport) => {
    setSelectedReport(report)
    setIsEditModalOpen(true)
  }

  const handleDelete = (report: AnalyticsReport) => {
    if (confirm(`Bạn có chắc muốn xóa báo cáo ${report.title}?`)) {
      setAnalyticsData(prev => prev.filter(item => item.id !== report.id))
    }
  }

  const handleExport = () => {
    alert('Xuất báo cáo analytics')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  // Calculate summary metrics
  const totalRevenue = filteredData.reduce((sum, report) => sum + report.metrics.revenue, 0)
  const totalProfit = filteredData.reduce((sum, report) => sum + report.metrics.profit, 0)
  const avgEfficiency = filteredData.length > 0 ? 
    filteredData.reduce((sum, report) => sum + report.metrics.efficiency, 0) / filteredData.length : 0
  const avgRiskScore = filteredData.length > 0 ? 
    filteredData.reduce((sum, report) => sum + report.metrics.riskScore, 0) / filteredData.length : 0

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#F8FBFF] p-2">
        <div className="space-y-3">
          {/* Header with Integrated Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <h1 className="text-lg font-semibold text-[#1A365D]">Analytics</h1>
            
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
                  <option value="DRAFT">Bản nháp</option>
                  <option value="PENDING_REVIEW">Chờ duyệt</option>
                  <option value="APPROVED">Đã duyệt</option>
                  <option value="PUBLISHED">Đã xuất bản</option>
                </select>
                <select 
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
                >
                  <option value="">Loại báo cáo</option>
                  <option value="FINANCIAL">Tài chính</option>
                  <option value="PERFORMANCE">Hiệu suất</option>
                  <option value="RISK">Rủi ro</option>
                  <option value="COMPLIANCE">Tuân thủ</option>
                  <option value="OPERATIONAL">Vận hành</option>
                </select>
                <select 
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
                >
                  <option value="">Ưu tiên</option>
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
                    setTypeFilter('')
                    setPriorityFilter('')
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
                    <p className="text-xs text-[#6B7280] mb-0.5">Tổng doanh thu</p>
                    <p className="text-base font-semibold text-[#1A365D]">{formatCurrency(totalRevenue)}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-xs text-green-500">+15.2%</span>
                      <span className="text-xs text-[#6B7280]">vs tháng trước</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-[#E8F1FA] rounded-full flex items-center justify-center ml-1">
                    <DollarSign className="w-3 h-3 text-[#3A7BD5]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-[#6B7280] mb-0.5">Tổng lợi nhuận</p>
                    <p className="text-base font-semibold text-green-600">{formatCurrency(totalProfit)}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-xs text-green-500">+22.8%</span>
                      <span className="text-xs text-[#6B7280]">vs tháng trước</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center ml-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-[#6B7280] mb-0.5">Hiệu suất TB</p>
                    <p className="text-base font-semibold text-[#3A7BD5]">{avgEfficiency.toFixed(1)}%</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-blue-500" />
                      <span className="text-xs text-blue-500">+3.2%</span>
                      <span className="text-xs text-[#6B7280]">cải thiện</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center ml-1">
                    <BarChart3 className="w-3 h-3 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-[#6B7280] mb-0.5">Điểm rủi ro TB</p>
                    <p className="text-base font-semibold text-orange-600">{avgRiskScore.toFixed(1)}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingDown className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-xs text-green-500">-5.3</span>
                      <span className="text-xs text-[#6B7280]">giảm rủi ro</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center ml-1">
                    <AlertTriangle className="w-3 h-3 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Reports Table */}
          <Card className="border-[#D1E5F0] bg-white shadow-sm">
            <CardContent className="p-3">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#D1E5F0]">
                      <th className="text-left py-2 px-2 text-xs font-medium text-[#1A365D]">Báo cáo</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-[#1A365D]">Order</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Loại</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Doanh thu</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Lợi nhuận</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Hiệu suất</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Rủi ro</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Trạng thái</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((report) => (
                      <tr key={report.id} className="border-b border-[#E8F1FA] hover:bg-[#F8FBFF]">
                        <td className="py-2 px-2">
                          <div className="max-w-[200px]">
                            <div className="text-xs font-medium text-[#1A365D] truncate">{report.title}</div>
                            <div className="text-xs text-[#6B7280]">Kỳ: {report.period}</div>
                            <div className="text-xs text-[#6B7280]">{formatDate(report.reportDate)}</div>
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="text-xs font-medium text-[#1A365D]">{report.orderNumber}</div>
                          <div className="text-xs text-[#4A5568]">{report.projectName}</div>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <Badge className={`text-xs ${getTypeColor(report.reportType)}`}>
                            {getTypeLabel(report.reportType)}
                          </Badge>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <div className="text-xs">
                            <div>{formatCurrency(report.metrics.revenue)}</div>
                            <div className={`flex items-center justify-center gap-1 ${
                              report.comparisons.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {report.comparisons.revenueChange >= 0 ? (
                                <TrendingUp className="w-2 h-2" />
                              ) : (
                                <TrendingDown className="w-2 h-2" />
                              )}
                              <span>{Math.abs(report.comparisons.revenueChange)}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <div className="text-xs">
                            <div>{formatCurrency(report.metrics.profit)}</div>
                            <div className={`flex items-center justify-center gap-1 ${
                              report.comparisons.profitChange >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {report.comparisons.profitChange >= 0 ? (
                                <TrendingUp className="w-2 h-2" />
                              ) : (
                                <TrendingDown className="w-2 h-2" />
                              )}
                              <span>{Math.abs(report.comparisons.profitChange)}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <div className="text-xs">
                            <div>{report.metrics.efficiency}%</div>
                            <div className={`flex items-center justify-center gap-1 ${
                              report.comparisons.efficiencyChange >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {report.comparisons.efficiencyChange >= 0 ? (
                                <TrendingUp className="w-2 h-2" />
                              ) : (
                                <TrendingDown className="w-2 h-2" />
                              )}
                              <span>{Math.abs(report.comparisons.efficiencyChange)}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <div className="text-xs">
                            <div className={`font-medium ${
                              report.metrics.riskScore <= 30 ? 'text-green-600' :
                              report.metrics.riskScore <= 60 ? 'text-orange-600' : 'text-red-600'
                            }`}>
                              {report.metrics.riskScore}
                            </div>
                            <div className={`flex items-center justify-center gap-1 ${
                              report.comparisons.riskChange <= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {report.comparisons.riskChange <= 0 ? (
                                <TrendingDown className="w-2 h-2" />
                              ) : (
                                <TrendingUp className="w-2 h-2" />
                              )}
                              <span>{Math.abs(report.comparisons.riskChange)}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                            {getStatusLabel(report.status)}
                          </Badge>
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
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-[#1A365D]">
                Chi tiết báo cáo - {selectedReport?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedReport && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-medium text-[#1A365D]">Số Order:</span>
                    <span className="text-[#4A5568] ml-2">{selectedReport.orderNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Trạng thái:</span>
                    <Badge className={`ml-2 text-xs ${getStatusColor(selectedReport.status)}`}>
                      {getStatusLabel(selectedReport.status)}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Dự án:</span>
                    <span className="text-[#4A5568] ml-2">{selectedReport.projectName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Công ty:</span>
                    <span className="text-[#4A5568] ml-2">{selectedReport.companyName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Loại báo cáo:</span>
                    <Badge className={`ml-2 text-xs ${getTypeColor(selectedReport.reportType)}`}>
                      {getTypeLabel(selectedReport.reportType)}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Kỳ báo cáo:</span>
                    <span className="text-[#4A5568] ml-2">{selectedReport.period}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#1A365D] mb-2">Mô tả</h4>
                  <p className="text-xs text-[#4A5568] bg-[#F8FBFF] p-3 rounded border border-[#D1E5F0]">
                    {selectedReport.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#1A365D] mb-2">Chỉ số hiệu suất</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-[#F8FBFF] p-3 rounded border border-[#D1E5F0]">
                      <div className="text-xs text-[#6B7280] mb-1">Doanh thu</div>
                      <div className="text-sm font-semibold text-[#1A365D]">{formatCurrency(selectedReport.metrics.revenue)}</div>
                      <div className={`text-xs flex items-center gap-1 ${
                        selectedReport.comparisons.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedReport.comparisons.revenueChange >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(selectedReport.comparisons.revenueChange)}%</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#F8FBFF] p-3 rounded border border-[#D1E5F0]">
                      <div className="text-xs text-[#6B7280] mb-1">Lợi nhuận</div>
                      <div className="text-sm font-semibold text-green-600">{formatCurrency(selectedReport.metrics.profit)}</div>
                      <div className={`text-xs flex items-center gap-1 ${
                        selectedReport.comparisons.profitChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedReport.comparisons.profitChange >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(selectedReport.comparisons.profitChange)}%</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#F8FBFF] p-3 rounded border border-[#D1E5F0]">
                      <div className="text-xs text-[#6B7280] mb-1">Hiệu suất</div>
                      <div className="text-sm font-semibold text-[#3A7BD5]">{selectedReport.metrics.efficiency}%</div>
                      <div className={`text-xs flex items-center gap-1 ${
                        selectedReport.comparisons.efficiencyChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedReport.comparisons.efficiencyChange >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(selectedReport.comparisons.efficiencyChange)}%</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#F8FBFF] p-3 rounded border border-[#D1E5F0]">
                      <div className="text-xs text-[#6B7280] mb-1">Điểm rủi ro</div>
                      <div className={`text-sm font-semibold ${
                        selectedReport.metrics.riskScore <= 30 ? 'text-green-600' :
                        selectedReport.metrics.riskScore <= 60 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {selectedReport.metrics.riskScore}
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${
                        selectedReport.comparisons.riskChange <= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedReport.comparisons.riskChange <= 0 ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : (
                          <TrendingUp className="w-3 h-3" />
                        )}
                        <span>{Math.abs(selectedReport.comparisons.riskChange)}%</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#F8FBFF] p-3 rounded border border-[#D1E5F0]">
                      <div className="text-xs text-[#6B7280] mb-1">Tuân thủ</div>
                      <div className="text-sm font-semibold text-purple-600">{selectedReport.metrics.compliance}%</div>
                      <div className={`text-xs flex items-center gap-1 ${
                        selectedReport.comparisons.complianceChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedReport.comparisons.complianceChange >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(selectedReport.comparisons.complianceChange)}%</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#F8FBFF] p-3 rounded border border-[#D1E5F0]">
                      <div className="text-xs text-[#6B7280] mb-1">Chi phí</div>
                      <div className="text-sm font-semibold text-red-600">{formatCurrency(selectedReport.metrics.costs)}</div>
                      <div className={`text-xs flex items-center gap-1 ${
                        selectedReport.comparisons.costsChange <= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedReport.comparisons.costsChange <= 0 ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : (
                          <TrendingUp className="w-3 h-3" />
                        )}
                        <span>{Math.abs(selectedReport.comparisons.costsChange)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Create Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-[#1A365D]">
                Tạo báo cáo analytics mới
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Số Order</label>
                  <Input className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" placeholder="ORD-2024-XXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Loại báo cáo</label>
                  <Select>
                    <SelectTrigger className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]">
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FINANCIAL">Tài chính</SelectItem>
                      <SelectItem value="PERFORMANCE">Hiệu suất</SelectItem>
                      <SelectItem value="RISK">Rủi ro</SelectItem>
                      <SelectItem value="COMPLIANCE">Tuân thủ</SelectItem>
                      <SelectItem value="OPERATIONAL">Vận hành</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Dự án</label>
                  <Input className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" placeholder="Nhập tên dự án" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Công ty</label>
                  <Input className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" placeholder="Nhập tên công ty" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Kỳ báo cáo</label>
                  <Input className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" placeholder="Q1/2024" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Ngày báo cáo</label>
                  <Input type="date" className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Tiêu đề báo cáo</label>
                <Input className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" placeholder="Nhập tiêu đề báo cáo" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Mô tả</label>
                <textarea 
                  className="w-full p-3 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5] min-h-[80px] resize-none"
                  placeholder="Nhập mô tả chi tiết..."
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-[#D1E5F0]">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="h-8 px-4 border-[#D1E5F0] text-[#3A7BD5] hover:bg-[#E8F1FA] text-xs"
                >
                  Hủy
                </Button>
                <Button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="h-8 px-4 bg-[#3A7BD5] hover:bg-[#2E5FA3] text-white text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Tạo báo cáo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}