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
  Clock, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  User,
  Building,
  TrendingUp,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Play,
  Pause,
  BarChart3,
  Activity
} from 'lucide-react'

interface TimelineEvent {
  id: string
  orderId: string
  orderNumber: string
  projectName: string
  companyName: string
  userId: string
  userName: string
  eventType: 'INSPECTION_STARTED' | 'INSPECTION_COMPLETED' | 'REPORT_GENERATED' | 'APPROVAL_REQUESTED' | 'APPROVED' | 'REJECTED' | 'DELAYED' | 'CANCELLED'
  title: string
  description: string
  timestamp: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  progress: number
  metadata?: Record<string, any>
  order?: {
    user: { name: string; email: string }
    project: { name: string; company: string }
  }
}

const mockTimelineData: TimelineEvent[] = [
  {
    id: '1',
    orderId: '1',
    orderNumber: 'ORD-2024-001',
    projectName: 'Máy phát điện 1500KVA',
    companyName: 'Công ty Điện lực ABC',
    userId: '1',
    userName: 'Nguyễn Văn An',
    eventType: 'INSPECTION_STARTED',
    title: 'Bắt đầu giám định',
    description: 'Bắt đầu kiểm tra máy phát điện chính tại nhà máy',
    timestamp: '2024-01-15T08:00:00Z',
    priority: 'HIGH',
    status: 'COMPLETED',
    progress: 100
  },
  {
    id: '2',
    orderId: '1',
    orderNumber: 'ORD-2024-001',
    projectName: 'Máy phát điện 1500KVA',
    companyName: 'Công ty Điện lực ABC',
    userId: '2',
    userName: 'Trần Thị Bình',
    eventType: 'INSPECTION_COMPLETED',
    title: 'Hoàn thành giám định',
    description: 'Kiểm tra hoàn tất các thông số kỹ thuật của máy phát điện',
    timestamp: '2024-01-15T16:30:00Z',
    priority: 'HIGH',
    status: 'COMPLETED',
    progress: 100
  },
  {
    id: '3',
    orderId: '2',
    orderNumber: 'ORD-2024-002',
    projectName: 'Hệ thống điện nhà xưởng',
    companyName: 'Công ty XYZ Manufacturing',
    userId: '3',
    userName: 'Lê Văn Cường',
    eventType: 'REPORT_GENERATED',
    title: 'Tạo báo cáo',
    description: 'Tạo báo cáo đánh giá an toàn hệ thống điện',
    timestamp: '2024-01-16T14:20:00Z',
    priority: 'MEDIUM',
    status: 'COMPLETED',
    progress: 100
  },
  {
    id: '4',
    orderId: '3',
    orderNumber: 'ORD-2024-003',
    projectName: 'Thiết bị nâng',
    companyName: 'Công ty Cơ khí DEF',
    userId: '4',
    userName: 'Phạm Thị Dung',
    eventType: 'APPROVAL_REQUESTED',
    title: 'Yêu cầu phê duyệt',
    description: 'Gửi yêu cầu phê duyệt báo cáo giám định thiết bị nâng',
    timestamp: '2024-01-17T10:15:00Z',
    priority: 'HIGH',
    status: 'PENDING',
    progress: 75
  },
  {
    id: '5',
    orderId: '4',
    orderNumber: 'ORD-2024-004',
    projectName: 'Hệ thống chống sét',
    companyName: 'Tòa nhà Landmark 81',
    userId: '5',
    userName: 'Hoàng Văn Em',
    eventType: 'DELAYED',
    title: 'Hoãn lịch',
    description: 'Hoãn lịch giám định do thời tiết xấu',
    timestamp: '2024-01-14T09:30:00Z',
    priority: 'MEDIUM',
    status: 'CANCELLED',
    progress: 25
  }
]

export default function TimelinePage() {
  const [timelineData, setTimelineData] = useState<TimelineEvent[]>(mockTimelineData)
  const [filteredData, setFilteredData] = useState<TimelineEvent[]>(mockTimelineData)
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  // Filters
  const filters = {
    search: searchTerm,
    status: statusFilter,
    priority: priorityFilter,
    type: typeFilter
  }

  const handleFilterChange = (key: string, value: string) => {
    switch (key) {
      case 'search':
        setSearchTerm(value)
        break
      case 'status':
        setStatusFilter(value)
        break
      case 'priority':
        setPriorityFilter(value)
        break
      case 'type':
        setTypeFilter(value)
        break
    }
  }

  // Apply filters
  useEffect(() => {
    let filtered = timelineData

    if (filters.search) {
      filtered = filtered.filter(item =>
        item.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.projectName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.userName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.title.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status)
    }

    if (filters.priority) {
      filtered = filtered.filter(item => item.priority === filters.priority)
    }

    if (filters.type) {
      filtered = filtered.filter(item => item.eventType === filters.type)
    }

    setFilteredData(filtered)
  }, [timelineData, filters])

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
      case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'PENDING': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'INSPECTION_STARTED': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'INSPECTION_COMPLETED': return 'bg-green-100 text-green-800 border-green-200'
      case 'REPORT_GENERATED': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'APPROVAL_REQUESTED': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200'
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200'
      case 'DELAYED': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'INSPECTION_STARTED': return 'Bắt đầu giám định'
      case 'INSPECTION_COMPLETED': return 'Hoàn thành giám định'
      case 'REPORT_GENERATED': return 'Tạo báo cáo'
      case 'APPROVAL_REQUESTED': return 'Yêu cầu phê duyệt'
      case 'APPROVED': return 'Đã phê duyệt'
      case 'REJECTED': return 'Bị từ chối'
      case 'DELAYED': return 'Hoãn lịch'
      case 'CANCELLED': return 'Hủy bỏ'
      default: return type
    }
  }

  const handleView = (event: TimelineEvent) => {
    setSelectedEvent(event)
    setIsViewModalOpen(true)
  }

  const handleEdit = (event: TimelineEvent) => {
    setSelectedEvent(event)
    setIsEditModalOpen(true)
  }

  const handleDelete = (event: TimelineEvent) => {
    if (confirm(`Bạn có chắc muốn xóa sự kiện ${event.title}?`)) {
      setTimelineData(prev => prev.filter(item => item.id !== event.id))
    }
  }

  const handleExport = () => {
    alert('Xuất timeline')
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('vi-VN')
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#F8FBFF] p-2">
        <div className="space-y-3">
          {/* Header with Integrated Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <h1 className="text-lg font-semibold text-[#1A365D]">Timeline</h1>
            
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
                  <option value="CANCELLED">Cancelled</option>
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
                <select 
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
                >
                  <option value="">Loại sự kiện</option>
                  <option value="INSPECTION_STARTED">Bắt đầu giám định</option>
                  <option value="INSPECTION_COMPLETED">Hoàn thành giám định</option>
                  <option value="REPORT_GENERATED">Tạo báo cáo</option>
                  <option value="APPROVAL_REQUESTED">Yêu cầu phê duyệt</option>
                  <option value="APPROVED">Đã phê duyệt</option>
                  <option value="REJECTED">Bị từ chối</option>
                  <option value="DELAYED">Hoãn lịch</option>
                  <option value="CANCELLED">Hủy bỏ</option>
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
                    setPriorityFilter('')
                    setTypeFilter('')
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
                    <p className="text-xs text-[#6B7280] mb-0.5">Tổng sự kiện</p>
                    <p className="text-base font-semibold text-[#1A365D]">{filteredData.length}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-xs text-green-500">+18%</span>
                      <span className="text-xs text-[#6B7280]">hôm nay</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-[#E8F1FA] rounded-full flex items-center justify-center ml-1">
                    <Activity className="w-3 h-3 text-[#3A7BD5]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-[#6B7280] mb-0.5">Đang xử lý</p>
                    <p className="text-base font-semibold text-[#3A7BD5]">
                      {filteredData.filter(e => e.status === 'IN_PROGRESS' || e.status === 'PENDING').length}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-blue-500" />
                      <span className="text-xs text-blue-500">+6</span>
                      <span className="text-xs text-[#6B7280]">đang chờ</span>
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
                    <p className="text-xs text-[#6B7280] mb-0.5">Hoàn thành</p>
                    <p className="text-base font-semibold text-green-600">
                      {filteredData.filter(e => e.status === 'COMPLETED').length}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-xs text-green-500">+92%</span>
                      <span className="text-xs text-[#6B7280]">tỷ lệ</span>
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
                    <p className="text-xs text-[#6B7280] mb-0.5">Ưu tiên cao</p>
                    <p className="text-base font-semibold text-red-600">
                      {filteredData.filter(e => e.priority === 'CRITICAL' || e.priority === 'HIGH').length}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <AlertTriangle className="w-2.5 h-2.5 text-red-500" />
                      <span className="text-xs text-red-500">Cần xử lý</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center ml-1">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline Events Table */}
          <Card className="border-[#D1E5F0] bg-white shadow-sm">
            <CardContent className="p-3">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#D1E5F0]">
                      <th className="text-left py-2 px-2 text-xs font-medium text-[#1A365D]">Thời gian</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-[#1A365D]">Order</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-[#1A365D]">Sự kiện</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-[#1A365D]">Người thực hiện</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Loại</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Ưu tiên</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Trạng thái</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Tiến độ</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((event) => (
                      <tr key={event.id} className="border-b border-[#E8F1FA] hover:bg-[#F8FBFF]">
                        <td className="py-2 px-2">
                          <div className="text-xs text-[#4A5568]">
                            <div>{formatDate(event.timestamp)}</div>
                            <div className="text-[#6B7280]">{formatTime(event.timestamp)}</div>
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="text-xs font-medium text-[#1A365D]">{event.orderNumber}</div>
                          <div className="text-xs text-[#4A5568]">{event.projectName}</div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="text-xs font-medium text-[#1A365D]">{event.title}</div>
                          <div className="text-xs text-[#6B7280] line-clamp-2">{event.description}</div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 text-[#3A7BD5]" />
                            <span className="text-xs text-[#4A5568]">{event.userName}</span>
                          </div>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <Badge className={`text-xs ${getEventTypeColor(event.eventType)}`}>
                            {getEventTypeLabel(event.eventType)}
                          </Badge>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <Badge className={`text-xs ${getPriorityColor(event.priority)}`}>
                            {event.priority}
                          </Badge>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                            {event.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-[#E8F1FA] rounded-full h-1.5 min-w-[30px]">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  event.status === 'COMPLETED' ? 'bg-green-500' :
                                  event.status === 'IN_PROGRESS' ? 'bg-blue-500' :
                                  event.status === 'PENDING' ? 'bg-orange-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${event.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-[#4A5568] min-w-[30px] text-right">
                              {event.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 px-2 text-[#3A7BD5] hover:bg-[#E8F1FA]"
                              onClick={() => handleView(event)}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 px-2 text-[#5AB2F2] hover:bg-[#E8F1FA]"
                              onClick={() => handleEdit(event)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 px-2 text-red-500 hover:bg-red-50"
                              onClick={() => handleDelete(event)}
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
          <DialogContent className="sm:max-w-[600px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-[#1A365D]">
                Chi tiết sự kiện - {selectedEvent?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedEvent && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-medium text-[#1A365D]">Số Order:</span>
                    <span className="text-[#4A5568] ml-2">{selectedEvent.orderNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Trạng thái:</span>
                    <Badge className={`ml-2 text-xs ${getStatusColor(selectedEvent.status)}`}>
                      {selectedEvent.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Dự án:</span>
                    <span className="text-[#4A5568] ml-2">{selectedEvent.projectName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Công ty:</span>
                    <span className="text-[#4A5568] ml-2">{selectedEvent.companyName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Người thực hiện:</span>
                    <span className="text-[#4A5568] ml-2">{selectedEvent.userName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Thời gian:</span>
                    <span className="text-[#4A5568] ml-2">
                      {formatDate(selectedEvent.timestamp)} {formatTime(selectedEvent.timestamp)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Loại sự kiện:</span>
                    <Badge className={`ml-2 text-xs ${getEventTypeColor(selectedEvent.eventType)}`}>
                      {getEventTypeLabel(selectedEvent.eventType)}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Ưu tiên:</span>
                    <Badge className={`ml-2 text-xs ${getPriorityColor(selectedEvent.priority)}`}>
                      {selectedEvent.priority}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#1A365D] mb-2">Mô tả</h4>
                  <p className="text-xs text-[#4A5568] bg-[#F8FBFF] p-3 rounded border border-[#D1E5F0]">
                    {selectedEvent.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#1A365D] mb-2">Tiến độ</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#E8F1FA] rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          selectedEvent.status === 'COMPLETED' ? 'bg-green-500' :
                          selectedEvent.status === 'IN_PROGRESS' ? 'bg-blue-500' :
                          selectedEvent.status === 'PENDING' ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedEvent.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#3A7BD5]">{selectedEvent.progress}%</span>
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
                Tạo sự kiện mới
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Số Order</label>
                  <Input className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" placeholder="ORD-2024-XXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Người thực hiện</label>
                  <Input className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" placeholder="Nhập tên người thực hiện" />
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
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Loại sự kiện</label>
                  <Select>
                    <SelectTrigger className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]">
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INSPECTION_STARTED">Bắt đầu giám định</SelectItem>
                      <SelectItem value="INSPECTION_COMPLETED">Hoàn thành giám định</SelectItem>
                      <SelectItem value="REPORT_GENERATED">Tạo báo cáo</SelectItem>
                      <SelectItem value="APPROVAL_REQUESTED">Yêu cầu phê duyệt</SelectItem>
                      <SelectItem value="APPROVED">Đã phê duyệt</SelectItem>
                      <SelectItem value="REJECTED">Bị từ chối</SelectItem>
                      <SelectItem value="DELAYED">Hoãn lịch</SelectItem>
                      <SelectItem value="CANCELLED">Hủy bỏ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Ưu tiên</label>
                  <Select>
                    <SelectTrigger className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]">
                      <SelectValue placeholder="Chọn ưu tiên" />
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
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Thời gian</label>
                  <Input type="datetime-local" className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Tiêu đề sự kiện</label>
                <Input className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" placeholder="Nhập tiêu đề sự kiện" />
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
                  Tạo sự kiện
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}