'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AppLayout } from '@/components/app-layout'
import { ViewHeader } from '@/components/view-header'
import { 
  CheckSquare, 
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar,
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
  Users,
  Target
} from 'lucide-react'

interface Task {
  id: string
  orderId: string
  orderNumber: string
  projectName: string
  companyName: string
  assigneeId: string
  assigneeName: string
  title: string
  description: string
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'CANCELLED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate: string
  createdAt: string
  updatedAt: string
  progress: number
  estimatedHours: number
  actualHours: number
  subtasks: {
    id: string
    title: string
    completed: boolean
  }[]
  tags: string[]
  order?: {
    user: { name: string; email: string }
    project: { name: string; company: string }
  }
}

const mockTasksData: Task[] = [
  {
    id: '1',
    orderId: '1',
    orderNumber: 'ORD-2024-001',
    projectName: 'Máy phát điện 1500KVA',
    companyName: 'Công ty Điện lực ABC',
    assigneeId: '1',
    assigneeName: 'Nguyễn Văn An',
    title: 'Kiểm tra thông số kỹ thuật máy phát điện',
    description: 'Đo và kiểm tra các thông số điện áp, dòng điện, công suất của máy phát điện',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: '2024-01-20',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-18T14:30:00Z',
    progress: 75,
    estimatedHours: 8,
    actualHours: 6,
    subtasks: [
      { id: '1', title: 'Kiểm tra thông số điện áp', completed: true },
      { id: '2', title: 'Đo dòng tải', completed: true },
      { id: '3', title: 'Kiểm tra công suất', completed: false },
      { id: '4', title: 'Lập biên bản', completed: false }
    ],
    tags: ['kỹ thuật', 'điện']
  },
  {
    id: '2',
    orderId: '2',
    orderNumber: 'ORD-2024-002',
    projectName: 'Hệ thống điện nhà xưởng',
    companyName: 'Công ty XYZ Manufacturing',
    assigneeId: '2',
    assigneeName: 'Trần Thị Bình',
    title: 'Kiểm tra hệ thống grounding',
    description: 'Đo điện trở tiếp đất và kiểm tra các tiếp điểm',
    status: 'COMPLETED',
    priority: 'MEDIUM',
    dueDate: '2024-01-18',
    createdAt: '2024-01-16T09:00:00Z',
    updatedAt: '2024-01-17T16:45:00Z',
    progress: 100,
    estimatedHours: 6,
    actualHours: 5,
    subtasks: [
      { id: '1', title: 'Đo điện resist tiếp đất', completed: true },
      { id: '2', title: 'Kiểm tra tiếp điểm', completed: true },
      { id: '3', title: 'Lập báo cáo', completed: true }
    ],
    tags: ['an toàn', 'grounding']
  },
  {
    id: '3',
    orderId: '3',
    orderNumber: 'ORD-2024-003',
    projectName: 'Thiết bị nâng',
    companyName: 'Công ty Cơ khí DEF',
    assigneeId: '3',
    assigneeName: 'Lê Văn Cường',
    title: 'Kiểm tra cần cẩu và thiết bị nâng',
    description: 'Kiểm tra an toàn cần cẩu 50 tấn, kiểm tra dây cáp, bộ phanh',
    status: 'TODO',
    priority: 'URGENT',
    dueDate: '2024-01-25',
    createdAt: '2024-01-17T08:00:00Z',
    updatedAt: '2024-01-17T08:00:00Z',
    progress: 0,
    estimatedHours: 12,
    actualHours: 0,
    subtasks: [
      { id: '1', title: 'Kiểm tra dây cáp', completed: false },
      { id: '2', title: 'Kiểm tra bộ phanh', completed: false },
      { id: '3', title: 'Kiểm tra cấu trúc', completed: false },
      { id: '4', title: 'Nâng hạ thử nghiệm', completed: false }
    ],
    tags: ['an toàn', 'cần cẩu']
  },
  {
    id: '4',
    orderId: '4',
    orderNumber: 'ORD-2024-004',
    projectName: 'Hệ thống chống sét',
    companyName: 'Tòa nhà Landmark 81',
    assigneeId: '4',
    assigneeName: 'Phạm Thị Dung',
    title: 'Kiểm tra hệ thống chống sét',
    description: 'Kiểm tra kim thu sét, đường dẫn và hệ thống tiếp đất',
    status: 'REVIEW',
    priority: 'HIGH',
    dueDate: '2024-01-22',
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-19T11:20:00Z',
    progress: 90,
    estimatedHours: 10,
    actualHours: 9,
    subtasks: [
      { id: '1', title: 'Kiểm tra kim thu sét', completed: true },
      { id: '2', title: 'Kiểm tra đường dẫn', completed: true },
      { id: '3', title: 'Đo điện resist', completed: true },
      { id: '4', title: 'Lập báo cáo', completed: false }
    ],
    tags: ['chống sét', 'an toàn']
  },
  {
    id: '5',
    orderId: '5',
    orderNumber: 'ORD-2024-005',
    projectName: 'Hệ thống PCCC',
    companyName: 'Trung tâm thương mại Vincom',
    assigneeId: '5',
    assigneeName: 'Hoàng Văn Em',
    title: 'Bảo dưỡng hệ thống PCCC',
    description: 'Kiểm tra và bảo dưỡng bình chữa cháy, hệ thống báo cháy',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    dueDate: '2024-01-28',
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-01-19T15:30:00Z',
    progress: 40,
    estimatedHours: 8,
    actualHours: 3,
    subtasks: [
      { id: '1', title: 'Kiểm tra bình chữa cháy', completed: true },
      { id: '2', title: 'Kiểm tra hệ thống báo cháy', completed: false },
      { id: '3', title: 'Kiểm tra vòi rồng', completed: false },
      { id: '4', title: 'Lập biên bản bảo dưỡng', completed: false }
    ],
    tags: ['PCCC', 'bảo dưỡng']
  }
]

export default function TasksPage() {
  const [tasksData, setTasksData] = useState<Task[]>(mockTasksData)
  const [filteredData, setFilteredData] = useState<Task[]>(mockTasksData)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [assigneeFilter, setAssigneeFilter] = useState('')

  // Filters
  const filters = {
    search: searchTerm,
    status: statusFilter,
    priority: priorityFilter,
    assignee: assigneeFilter
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
      case 'assignee':
        setAssigneeFilter(value)
        break
    }
  }

  // Apply filters
  useEffect(() => {
    let filtered = tasksData

    if (filters.search) {
      filtered = filtered.filter(item =>
        item.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.projectName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.assigneeName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.title.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status)
    }

    if (filters.priority) {
      filtered = filtered.filter(item => item.priority === filters.priority)
    }

    if (filters.assignee) {
      filtered = filtered.filter(item => item.assigneeName === filters.assignee)
    }

    setFilteredData(filtered)
  }, [tasksData, filters])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-800 border-red-200'
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
      case 'REVIEW': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'TODO': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'TODO': return 'Cần làm'
      case 'IN_PROGRESS': return 'Đang làm'
      case 'REVIEW': return 'Đánh giá'
      case 'COMPLETED': return 'Hoàn thành'
      case 'CANCELLED': return 'Hủy bỏ'
      default: return status
    }
  }

  const handleView = (task: Task) => {
    setSelectedTask(task)
    setIsViewModalOpen(true)
  }

  const handleEdit = (task: Task) => {
    setSelectedTask(task)
    setIsEditModalOpen(true)
  }

  const handleDelete = (task: Task) => {
    if (confirm(`Bạn có chắc muốn xóa công việc ${task.title}?`)) {
      setTasksData(prev => prev.filter(item => item.id !== task.id))
    }
  }

  const handleExport = () => {
    alert('Xuất danh sách công việc')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  const getUniqueAssignees = () => {
    return Array.from(new Set(tasksData.map(task => task.assigneeName)))
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#F8FBFF] p-2">
        <div className="space-y-3">
          <ViewHeader
            title="Quản lý Tasks"
            searchValue={filters.search}
            onSearchChange={(v) => handleFilterChange('search', v)}
            actions={
              <>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-5 px-1 text-[#6B7280] hover:text-[#3A7BD5] hover:bg-transparent"
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('')
                    setPriorityFilter('')
                    setAssigneeFilter('')
                  }}
                >
                  <Filter className="w-3 h-3" />
                </Button>
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
              </>
            }
          >
            <div className="flex items-center gap-2 bg-white border border-[#D1E5F0] rounded-lg px-2 py-1">
              <span className="text-xs font-medium text-[#6B7280] whitespace-nowrap">Lọc:</span>
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
              >
                <option value="">Trạng thái</option>
                <option value="TODO">Cần làm</option>
                <option value="IN_PROGRESS">Đang làm</option>
                <option value="REVIEW">Đánh giá</option>
                <option value="COMPLETED">Hoàn thành</option>
                <option value="CANCELLED">Hủy bỏ</option>
              </select>
              <select 
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
              >
                <option value="">Ưu tiên</option>
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
              <select 
                value={filters.assignee}
                onChange={(e) => handleFilterChange('assignee', e.target.value)}
                className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
              >
                <option value="">Người thực hiện</option>
                {getUniqueAssignees().map(assignee => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))}
              </select>
            </div>
          </ViewHeader>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-[#6B7280] mb-0.5">Tổng tasks</p>
                    <p className="text-base font-semibold text-[#1A365D]">{filteredData.length}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-xs text-green-500">+8</span>
                      <span className="text-xs text-[#6B7280]">tuần này</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-[#E8F1FA] rounded-full flex items-center justify-center ml-1">
                    <CheckSquare className="w-3 h-3 text-[#3A7BD5]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-[#6B7280] mb-0.5">Đang thực hiện</p>
                    <p className="text-base font-semibold text-[#3A7BD5]">
                      {filteredData.filter(t => t.status === 'IN_PROGRESS').length}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Play className="w-2.5 h-2.5 text-blue-500" />
                      <span className="text-xs text-blue-500">+3</span>
                      <span className="text-xs text-[#6B7280]">hôm nay</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center ml-1">
                    <Play className="w-3 h-3 text-blue-600" />
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
                      {filteredData.filter(t => t.status === 'COMPLETED').length}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <CheckCircle className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-xs text-green-500">85%</span>
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
                    <p className="text-xs text-[#6B7280] mb-0.5">Khẩn cấp</p>
                    <p className="text-base font-semibold text-red-600">
                      {filteredData.filter(t => t.priority === 'URGENT' || t.priority === 'HIGH').length}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <AlertTriangle className="w-2.5 h-2.5 text-red-500" />
                      <span className="text-xs text-red-500">Cần ưu tiên</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center ml-1">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks Table */}
          <Card className="border-[#D1E5F0] bg-white shadow-sm">
            <CardContent className="p-3">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#D1E5F0]">
                      <th className="text-left py-2 px-2 text-xs font-medium text-[#1A365D]">Task</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-[#1A365D]">Order</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-[#1A365D]">Người thực hiện</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Ưu tiên</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Trạng thái</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Tiến độ</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Thời gian</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-[#1A365D]">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((task) => (
                      <tr key={task.id} className="border-b border-[#E8F1FA] hover:bg-[#F8FBFF]">
                        <td className="py-2 px-2">
                          <div className="max-w-[200px]">
                            <div className="text-xs font-medium text-[#1A365D] truncate">{task.title}</div>
                            <div className="text-xs text-[#6B7280] truncate">{task.description}</div>
                            {task.tags.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {task.tags.slice(0, 2).map((tag, index) => (
                                  <span key={index} className="text-xs bg-[#E8F1FA] text-[#3A7BD5] px-1 py-0.5 rounded">
                                    {tag}
                                  </span>
                                ))}
                                {task.tags.length > 2 && (
                                  <span className="text-xs text-[#6B7280]">+{task.tags.length - 2}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="text-xs font-medium text-[#1A365D]">{task.orderNumber}</div>
                          <div className="text-xs text-[#4A5568]">{task.projectName}</div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 text-[#3A7BD5]" />
                            <span className="text-xs text-[#4A5568]">{task.assigneeName}</span>
                          </div>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                            {getStatusLabel(task.status)}
                          </Badge>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-[#E8F1FA] rounded-full h-1.5 min-w-[30px]">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  task.status === 'COMPLETED' ? 'bg-green-500' :
                                  task.status === 'IN_PROGRESS' ? 'bg-blue-500' :
                                  task.status === 'REVIEW' ? 'bg-purple-500' : 'bg-gray-500'
                                }`}
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-[#4A5568] min-w-[30px] text-right">
                              {task.progress}%
                            </span>
                          </div>
                          <div className="text-xs text-[#6B7280] mt-1">
                            {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtasks
                          </div>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <div className="text-xs text-[#4A5568]">
                            <div className="flex items-center gap-1 justify-center">
                              <Calendar className="w-3 h-3 text-[#3A7BD5]" />
                              <span>{formatDate(task.dueDate)}</span>
                            </div>
                            <div className="text-[#6B7280]">
                              {task.actualHours}/{task.estimatedHours}h
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 px-2 text-[#3A7BD5] hover:bg-[#E8F1FA]"
                              onClick={() => handleView(task)}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 px-2 text-[#5AB2F2] hover:bg-[#E8F1FA]"
                              onClick={() => handleEdit(task)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 px-2 text-red-500 hover:bg-red-50"
                              onClick={() => handleDelete(task)}
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
                Chi tiết công việc - {selectedTask?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedTask && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-medium text-[#1A365D]">Số Order:</span>
                    <span className="text-[#4A5568] ml-2">{selectedTask.orderNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Trạng thái:</span>
                    <Badge className={`ml-2 text-xs ${getStatusColor(selectedTask.status)}`}>
                      {getStatusLabel(selectedTask.status)}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Dự án:</span>
                    <span className="text-[#4A5568] ml-2">{selectedTask.projectName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Công ty:</span>
                    <span className="text-[#4A5568] ml-2">{selectedTask.companyName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Người thực hiện:</span>
                    <span className="text-[#4A5568] ml-2">{selectedTask.assigneeName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Ưu tiên:</span>
                    <Badge className={`ml-2 text-xs ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Hạn chót:</span>
                    <span className="text-[#4A5568] ml-2">{formatDate(selectedTask.dueDate)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Thời gian:</span>
                    <span className="text-[#4A5568] ml-2">{selectedTask.actualHours}/{selectedTask.estimatedHours}h</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#1A365D] mb-2">Mô tả</h4>
                  <p className="text-xs text-[#4A5568] bg-[#F8FBFF] p-3 rounded border border-[#D1E5F0]">
                    {selectedTask.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#1A365D] mb-2">Tiến độ</h4>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 bg-[#E8F1FA] rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          selectedTask.status === 'COMPLETED' ? 'bg-green-500' :
                          selectedTask.status === 'IN_PROGRESS' ? 'bg-blue-500' :
                          selectedTask.status === 'REVIEW' ? 'bg-purple-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${selectedTask.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#3A7BD5]">{selectedTask.progress}%</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#1A365D] mb-2">Subtasks ({selectedTask.subtasks.filter(st => st.completed).length}/{selectedTask.subtasks.length})</h4>
                  <div className="space-y-1">
                    {selectedTask.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          readOnly
                          className="w-3 h-3 text-[#3A7BD5] border-[#D1E5F0] rounded"
                        />
                        <span className={subtask.completed ? 'text-[#4A5568] line-through' : 'text-[#4A5568]'}>
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedTask.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[#1A365D] mb-2">Tags</h4>
                    <div className="flex gap-2">
                      {selectedTask.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-[#E8F1FA] text-[#3A7BD5] px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
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
                Tạo task mới
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
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Ưu tiên</label>
                  <Select>
                    <SelectTrigger className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]">
                      <SelectValue placeholder="Chọn ưu tiên" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Hạn chót</label>
                  <Input type="date" className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Thời gian dự kiến (h)</label>
                  <Input type="number" className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" placeholder="8" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Tiêu đề task</label>
                <Input className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" placeholder="Nhập tiêu đề công việc" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Mô tả</label>
                <textarea 
                  className="w-full p-3 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5] min-h-[80px] resize-none"
                  placeholder="Nhập mô tả chi tiết..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Tags (cách nhau bằng dấu phẩy)</label>
                <Input className="text-xs p-2 border-[#D1E5F0] focus:ring-[#3A7BD5]" placeholder="kỹ thuật, an toàn, báo cáo" />
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
                  Tạo task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}