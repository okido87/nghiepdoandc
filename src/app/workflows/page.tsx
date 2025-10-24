'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { DataTable } from '@/components/ui/data-table'
import { AppLayout } from '@/components/app-layout'
import { 
  Activity, 
  Plus, 
  Search, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Filter,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  GitBranch,
  Settings,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from 'lucide-react'

interface Workflow {
  id: number
  name: string
  description: string
  category: string
  status: 'Active' | 'Inactive' | 'Draft' | 'Testing'
  priority: 'High' | 'Medium' | 'Low'
  createdDate: string
  modifiedDate: string
  createdBy: string
  version: string
  steps: number
  currentStep: number
  completionRate: number
  avgDuration: string
  totalRuns: number
  successRate: number
  assignedTo: string[]
  dependencies: string[]
  triggers: string[]
  nextRun: string
}

const mockWorkflows: Workflow[] = [
  { 
    id: 1, 
    name: 'Quy trình Giám định Chứng thư', 
    description: 'Quy trình hoàn chỉnh từ tiếp nhận đến cấp chứng thư giám định', 
    category: 'Giám định', 
    status: 'Active', 
    priority: 'High', 
    createdDate: '2024-01-01', 
    modifiedDate: '2024-01-20', 
    createdBy: 'Admin', 
    version: '2.1', 
    steps: 8, 
    currentStep: 5, 
    completionRate: 62.5, 
    avgDuration: '5 ngày', 
    totalRuns: 156, 
    successRate: 94.2, 
    assignedTo: ['Nguyễn Văn An', 'Trần Thị Bình'], 
    dependencies: ['Quy trình Kế toán'], 
    triggers: ['Nhận yêu cầu', 'Định kỳ hàng tháng'], 
    nextRun: '2024-02-01'
  },
  { 
    id: 2, 
    name: 'Quy trình Kiểm tra An toàn', 
    description: 'Kiểm tra an toàn thiết bị và môi trường làm việc', 
    category: 'An toàn', 
    status: 'Active', 
    priority: 'High', 
    createdDate: '2024-01-02', 
    modifiedDate: '2024-01-18', 
    createdBy: 'Lê Văn Cường', 
    version: '1.5', 
    steps: 6, 
    currentStep: 3, 
    completionRate: 50, 
    avgDuration: '2 ngày', 
    totalRuns: 89, 
    successRate: 91.0, 
    assignedTo: ['Phạm Thị Dung', 'Hoàng Văn Em'], 
    dependencies: [], 
    triggers: ['Yêu cầu khách hàng', 'Kiểm tra định kỳ'], 
    nextRun: '2024-01-25'
  },
  { 
    id: 3, 
    name: 'Quy trình Báo cáo Hiện trường', 
    description: 'Tạo và xử lý báo cáo giám định hiện trường', 
    category: 'Báo cáo', 
    status: 'Active', 
    priority: 'Medium', 
    createdDate: '2024-01-03', 
    modifiedDate: '2024-01-22', 
    createdBy: 'Đỗ Thị Giang', 
    version: '1.3', 
    steps: 5, 
    currentStep: 4, 
    completionRate: 80, 
    avgDuration: '3 ngày', 
    totalRuns: 234, 
    successRate: 88.5, 
    assignedTo: ['Vũ Văn Hùng', 'Bùi Thị Lan'], 
    dependencies: ['Quy trình Giám định Chứng thư'], 
    triggers: ['Hoàn thành giám định'], 
    nextRun: '2024-01-26'
  },
  { 
    id: 4, 
    name: 'Quy trình Duyệt Báo cáo', 
    description: 'Quy trình xét duyệt báo cáo giám định', 
    category: 'Duyệt', 
    status: 'Active', 
    priority: 'High', 
    createdDate: '2024-01-04', 
    modifiedDate: '2024-01-19', 
    createdBy: 'Cao Văn Minh', 
    version: '1.2', 
    steps: 4, 
    currentStep: 2, 
    completionRate: 50, 
    avgDuration: '1 ngày', 
    totalRuns: 178, 
    successRate: 96.6, 
    assignedTo: ['Dương Thị Nga', 'Đinh Văn Phát'], 
    dependencies: ['Quy trình Báo cáo Hiện trường'], 
    triggers: ['Báo cáo chờ duyệt'], 
    nextRun: '2024-01-24'
  },
  { 
    id: 5, 
    name: 'Quy trình Thanh toán', 
    description: 'Xử lý thanh toán và xuất hóa đơn', 
    category: 'Tài chính', 
    status: 'Active', 
    priority: 'Medium', 
    createdDate: '2024-01-05', 
    modifiedDate: '2024-01-21', 
    createdBy: 'Gia Thị Quỳnh', 
    version: '1.4', 
    steps: 7, 
    currentStep: 6, 
    completionRate: 85.7, 
    avgDuration: '3 ngày', 
    totalRuns: 145, 
    successRate: 92.4, 
    assignedTo: ['Hà Văn Sơn', 'Kiều Thị Trúc'], 
    dependencies: ['Quy trình Duyệt Báo cáo'], 
    triggers: ['Báo cáo đã duyệt'], 
    nextRun: '2024-01-27'
  },
  { 
    id: 6, 
    name: 'Quy trình Bảo dưỡng Thiết bị', 
    description: 'Bảo dưỡng định kỳ thiết bị giám định', 
    category: 'Bảo dưỡng', 
    status: 'Testing', 
    priority: 'Medium', 
    createdDate: '2024-01-06', 
    modifiedDate: '2024-01-23', 
    createdBy: 'Lâm Văn Tài', 
    version: '1.0', 
    steps: 5, 
    currentStep: 2, 
    completionRate: 40, 
    avgDuration: '2 ngày', 
    totalRuns: 12, 
    successRate: 75.0, 
    assignedTo: ['Mai Thị Uyên', 'Ngô Văn Vương'], 
    dependencies: [], 
    triggers: ['Định kỳ hàng quý'], 
    nextRun: '2024-02-01'
  },
  { 
    id: 7, 
    name: 'Quy trình Đào tạo Nhân viên', 
    description: 'Đào tạo và cấp chứng chỉ nhân viên mới', 
    category: 'Nhân sự', 
    status: 'Active', 
    priority: 'Low', 
    createdDate: '2024-01-07', 
    modifiedDate: '2024-01-17', 
    createdBy: 'Phan Thị Xuân', 
    version: '1.1', 
    steps: 6, 
    currentStep: 4, 
    completionRate: 66.7, 
    avgDuration: '7 ngày', 
    totalRuns: 45, 
    successRate: 86.7, 
    assignedTo: ['Quách Văn Yến', 'Tô Thị Ánh'], 
    dependencies: [], 
    triggers: ['Nhân viên mới', 'Đào tạo định kỳ'], 
    nextRun: '2024-02-05'
  },
  { 
    id: 8, 
    name: 'Quy trình Xử lý Khiếu nại', 
    description: 'Nhận và xử lý khiếu nại của khách hàng', 
    category: 'CSKH', 
    status: 'Active', 
    priority: 'High', 
    createdDate: '2024-01-08', 
    modifiedDate: '2024-01-24', 
    createdBy: 'Admin', 
    version: '1.3', 
    steps: 5, 
    currentStep: 3, 
    completionRate: 60, 
    avgDuration: '2 ngày', 
    totalRuns: 28, 
    successRate: 89.3, 
    assignedTo: ['Nguyễn Văn An', 'Trần Thị Bình'], 
    dependencies: [], 
    triggers: ['Khiếu nại khách hàng'], 
    nextRun: '2024-01-28'
  },
  { 
    id: 9, 
    name: 'Quy trình Quản lý Rủi ro', 
    description: 'Nhận diện và quản lý rủi ro trong dự án', 
    category: 'Rủi ro', 
    status: 'Draft', 
    priority: 'Medium', 
    createdDate: '2024-01-09', 
    modifiedDate: '2024-01-25', 
    createdBy: 'Lê Văn Cường', 
    version: '0.9', 
    steps: 4, 
    currentStep: 1, 
    completionRate: 25, 
    avgDuration: '1 ngày', 
    totalRuns: 0, 
    successRate: 0, 
    assignedTo: ['Phạm Thị Dung', 'Hoàng Văn Em'], 
    dependencies: ['Quy trình Giám định Chứng thư'], 
    triggers: ['Phát hiện rủi ro'], 
    nextRun: '2024-02-10'
  },
  { 
    id: 10, 
    name: 'Quy trình Kiểm tra Chất lượng', 
    description: 'Kiểm tra chất lượng dịch vụ và sản phẩm', 
    category: 'Chất lượng', 
    status: 'Active', 
    priority: 'High', 
    createdDate: '2024-01-10', 
    modifiedDate: '2024-01-26', 
    createdBy: 'Đỗ Thị Giang', 
    version: '1.2', 
    steps: 6, 
    currentStep: 5, 
    completionRate: 83.3, 
    avgDuration: '2 ngày', 
    totalRuns: 67, 
    successRate: 94.0, 
    assignedTo: ['Vũ Văn Hùng', 'Bùi Thị Lan'], 
    dependencies: ['Quy trình Giám định Chứng thư'], 
    triggers: ['Hoàn thành dự án', 'Kiểm tra định kỳ'], 
    nextRun: '2024-01-29'
  },
  { 
    id: 11, 
    name: 'Quy trình Quản lý Tài liệu', 
    description: 'Quản lý và lưu trữ tài liệu dự án', 
    category: 'Văn thư', 
    status: 'Active', 
    priority: 'Low', 
    createdDate: '2024-01-11', 
    modifiedDate: '2024-01-20', 
    createdBy: 'Cao Văn Minh', 
    version: '1.1', 
    steps: 4, 
    currentStep: 3, 
    completionRate: 75, 
    avgDuration: '1 ngày', 
    totalRuns: 234, 
    successRate: 97.4, 
    assignedTo: ['Dương Thị Nga', 'Đinh Văn Phát'], 
    dependencies: [], 
    triggers: ['Tạo tài liệu mới', 'Kết thúc dự án'], 
    nextRun: '2024-01-30'
  },
  { 
    id: 12, 
    name: 'Quy trình Mua sắm', 
    description: 'Mua sắm vật tư và thiết bị', 
    category: 'Mua hàng', 
    status: 'Active', 
    priority: 'Medium', 
    createdDate: '2024-01-12', 
    modifiedDate: '2024-01-22', 
    createdBy: 'Gia Thị Quỳnh', 
    version: '1.3', 
    steps: 7, 
    currentStep: 4, 
    completionRate: 57.1, 
    avgDuration: '5 ngày', 
    totalRuns: 56, 
    successRate: 85.7, 
    assignedTo: ['Hà Văn Sơn', 'Kiều Thị Trúc'], 
    dependencies: ['Quy trình Duyệt Báo cáo'], 
    triggers: ['Yêu cầu mua sắm'], 
    nextRun: '2024-02-02'
  },
  { 
    id: 13, 
    name: 'Quy trình Kho', 
    description: 'Quản lý nhập xuất kho vật tư', 
    category: 'Kho', 
    status: 'Active', 
    priority: 'Medium', 
    createdDate: '2024-01-13', 
    modifiedDate: '2024-01-23', 
    createdBy: 'Lâm Văn Tài', 
    version: '1.2', 
    steps: 5, 
    currentStep: 3, 
    completionRate: 60, 
    avgDuration: '1 ngày', 
    totalRuns: 189, 
    successRate: 93.7, 
    assignedTo: ['Mai Thị Uyên', 'Ngô Văn Vương'], 
    dependencies: ['Quy trình Mua sắm'], 
    triggers: ['Nhập kho', 'Xuất kho'], 
    nextRun: '2024-01-31'
  },
  { 
    id: 14, 
    name: 'Quy trình Bảo mật Thông tin', 
    description: 'Đảm bảo bảo mật thông tin khách hàng', 
    category: 'An ninh', 
    status: 'Testing', 
    priority: 'High', 
    createdDate: '2024-01-14', 
    modifiedDate: '2024-01-24', 
    createdBy: 'Phan Thị Xuân', 
    version: '1.0', 
    steps: 4, 
    currentStep: 2, 
    completionRate: 50, 
    avgDuration: '1 ngày', 
    totalRuns: 8, 
    successRate: 87.5, 
    assignedTo: ['Quách Văn Yến', 'Tô Thị Ánh'], 
    dependencies: [], 
    triggers: ['Tạo thông tin mới', 'Yêu cầu truy cập'], 
    nextRun: '2024-02-03'
  },
  { 
    id: 15, 
    name: 'Quy trình Sao lưu Dữ liệu', 
    description: 'Sao lưu và khôi phục dữ liệu hệ thống', 
    category: 'IT', 
    status: 'Active', 
    priority: 'High', 
    createdDate: '2024-01-15', 
    modifiedDate: '2024-01-25', 
    createdBy: 'Admin', 
    version: '1.1', 
    steps: 3, 
    currentStep: 2, 
    completionRate: 66.7, 
    avgDuration: '2 giờ', 
    totalRuns: 365, 
    successRate: 98.6, 
    assignedTo: ['Nguyễn Văn An', 'Trần Thị Bình'], 
    dependencies: [], 
    triggers: ['Định kỳ hàng ngày'], 
    nextRun: '2024-01-31'
  },
  { 
    id: 16, 
    name: 'Quy trình Đánh giá Nhà cung cấp', 
    description: 'Đánh giá và lựa chọn nhà cung cấp', 
    category: 'Mua hàng', 
    status: 'Active', 
    priority: 'Medium', 
    createdDate: '2024-01-16', 
    modifiedDate: '2024-01-26', 
    createdBy: 'Lê Văn Cường', 
    version: '1.0', 
    steps: 6, 
    currentStep: 4, 
    completionRate: 66.7, 
    avgDuration: '3 ngày', 
    totalRuns: 23, 
    successRate: 91.3, 
    assignedTo: ['Phạm Thị Dung', 'Hoàng Văn Em'], 
    dependencies: ['Quy trình Mua sắm'], 
    triggers: ['Nhà cung cấp mới', 'Đánh giá định kỳ'], 
    nextRun: '2024-02-05'
  },
  { 
    id: 17, 
    name: 'Quy trình Xử lý Sự cố', 
    description: 'Xử lý sự cố kỹ thuật và khẩn cấp', 
    category: 'Sự cố', 
    status: 'Active', 
    priority: 'High', 
    createdDate: '2024-01-17', 
    modifiedDate: '2024-01-27', 
    createdBy: 'Đỗ Thị Giang', 
    version: '1.2', 
    steps: 5, 
    currentStep: 3, 
    completionRate: 60, 
    avgDuration: '4 giờ', 
    totalRuns: 45, 
    successRate: 88.9, 
    assignedTo: ['Vũ Văn Hùng', 'Bùi Thị Lan'], 
    dependencies: [], 
    triggers: ['Báo cáo sự cố'], 
    nextRun: '2024-02-01'
  },
  { 
    id: 18, 
    name: 'Quy trình Tuân thủ Pháp lý', 
    description: 'Đảm bảo tuân thủ các quy định pháp luật', 
    category: 'Pháp lý', 
    status: 'Draft', 
    priority: 'High', 
    createdDate: '2024-01-18', 
    modifiedDate: '2024-01-28', 
    createdBy: 'Cao Văn Minh', 
    version: '0.8', 
    steps: 4, 
    currentStep: 1, 
    completionRate: 25, 
    avgDuration: '2 ngày', 
    totalRuns: 0, 
    successRate: 0, 
    assignedTo: ['Dương Thị Nga', 'Đinh Văn Phát'], 
    dependencies: [], 
    triggers: ['Thay đổi quy định', 'Kiểm tra định kỳ'], 
    nextRun: '2024-02-10'
  },
  { 
    id: 19, 
    name: 'Quy trình Cải tiến Liên tục', 
    description: 'Cải tiến quy trình và dịch vụ', 
    category: 'Cải tiến', 
    status: 'Active', 
    priority: 'Low', 
    createdDate: '2024-01-19', 
    modifiedDate: '2024-01-29', 
    createdBy: 'Gia Thị Quỳnh', 
    version: '1.0', 
    steps: 6, 
    currentStep: 3, 
    completionRate: 50, 
    avgDuration: '7 ngày', 
    totalRuns: 12, 
    successRate: 83.3, 
    assignedTo: ['Hà Văn Sơn', 'Kiều Thị Trúc'], 
    dependencies: [], 
    triggers: ['Đề xuất cải tiến', 'Đánh giá định kỳ'], 
    nextRun: '2024-02-15'
  },
  { 
    id: 20, 
    name: 'Quy trình Đóng Dự án', 
    description: 'Kết thúc và bàn giao dự án', 
    category: 'Dự án', 
    status: 'Active', 
    priority: 'Medium', 
    createdDate: '2024-01-20', 
    modifiedDate: '2024-01-30', 
    createdBy: 'Lâm Văn Tài', 
    version: '1.1', 
    steps: 5, 
    currentStep: 4, 
    completionRate: 80, 
    avgDuration: '3 ngày', 
    totalRuns: 34, 
    successRate: 94.1, 
    assignedTo: ['Mai Thị Uyên', 'Ngô Văn Vương'], 
    dependencies: ['Quy trình Thanh toán'], 
    triggers: ['Hoàn thành dự án'], 
    nextRun: '2024-02-08'
  }
]

export default function WorkflowsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')

  const filteredWorkflows = useMemo(() => {
    return mockWorkflows.filter(workflow => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           workflow.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           workflow.assignedTo.some(person => person.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || workflow.status === selectedStatus
      const matchesPriority = selectedPriority === 'all' || workflow.priority === selectedPriority
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPriority
    })
  }, [searchTerm, selectedCategory, selectedStatus, selectedPriority])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-red-100 text-red-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      case 'Testing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-orange-100 text-orange-800'
      case 'Low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Play className="w-4 h-4 text-green-600" />
      case 'Inactive': return <Pause className="w-4 h-4 text-red-600" />
      case 'Draft': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'Testing': return <Activity className="w-4 h-4 text-blue-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const columns = [
    {
      id: 'name',
      header: 'Tên quy trình',
      accessorKey: 'name',
      sortable: true,
    },
    {
      id: 'category',
      header: 'Danh mục',
      accessorKey: 'category',
      sortable: true,
    },
    {
      id: 'status',
      header: 'Trạng thái',
      accessorKey: 'status',
      sortable: true,
    },
    {
      id: 'priority',
      header: 'Mức độ',
      accessorKey: 'priority',
      sortable: true,
    },
    {
      id: 'steps',
      header: 'Bước',
      accessorKey: 'steps',
      sortable: true,
    },
    {
      id: 'completionRate',
      header: 'Hoàn thành',
      accessorKey: 'completionRate',
      sortable: true,
    },
    {
      id: 'totalRuns',
      header: 'Lượt chạy',
      accessorKey: 'totalRuns',
      sortable: true,
    },
    {
      id: 'successRate',
      header: 'Thành công',
      accessorKey: 'successRate',
      sortable: true,
    },
    {
      id: 'avgDuration',
      header: 'Thời gian',
      accessorKey: 'avgDuration',
      sortable: true,
    },
    {
      id: 'nextRun',
      header: 'Lần chạy tiếp',
      accessorKey: 'nextRun',
      sortable: true,
    },
    {
      id: 'actions',
      header: 'Thao tác',
      sortable: false,
    }
  ]

  const renderCell = (workflow: Workflow, column: string) => {
    switch (column) {
      case 'status':
        return (
          <div className="flex items-center space-x-2">
            {getStatusIcon(workflow.status)}
            <Badge className={`text-xs ${getStatusColor(workflow.status)}`}>{workflow.status}</Badge>
          </div>
        )
      case 'priority':
        return <Badge className={`text-xs ${getPriorityColor(workflow.priority)}`}>{workflow.priority}</Badge>
      case 'steps':
        return (
          <div className="flex items-center space-x-1">
            <span className="text-sm">{workflow.currentStep}/{workflow.steps}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-1.5 w-8">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ width: `${(workflow.currentStep / workflow.steps) * 100}%` }}
              ></div>
            </div>
          </div>
        )
      case 'completionRate':
        return (
          <div className="flex items-center space-x-2">
            <Progress value={workflow.completionRate} className="w-16 h-2" />
            <span className="text-xs">{workflow.completionRate}%</span>
          </div>
        )
      case 'successRate':
        return (
          <div className="flex items-center space-x-1">
            <span className={`text-sm ${workflow.successRate >= 90 ? 'text-green-600' : workflow.successRate >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
              {workflow.successRate}%
            </span>
            {workflow.successRate >= 90 ? 
              <CheckCircle className="w-4 h-4 text-green-600" /> : 
              workflow.successRate < 80 ? 
              <AlertTriangle className="w-4 h-4 text-red-600" /> : 
              null
            }
          </div>
        )
      case 'actions':
        return (
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )
      default:
        return workflow[column as keyof Workflow]
    }
  }

  const categories = Array.from(new Set(mockWorkflows.map(w => w.category)))

  return (
    <AppLayout>
      <div className="space-y-4">
      {/* Header with Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Quy trình</h1>
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
            <option value="Active">Đang hoạt động</option>
            <option value="Inactive">Không hoạt động</option>
            <option value="Draft">Bản nháp</option>
            <option value="Testing">Đang thử nghiệm</option>
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả mức độ</option>
            <option value="High">Cao</option>
            <option value="Medium">Trung bình</option>
            <option value="Low">Thấp</option>
          </select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Tạo quy trình mới
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Tổng quy trình</p>
                <p className="text-2xl font-bold text-slate-900">{mockWorkflows.length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Đang hoạt động</p>
                <p className="text-2xl font-bold text-green-600">{mockWorkflows.filter(w => w.status === 'Active').length}</p>
              </div>
              <Play className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Tổng lượt chạy</p>
                <p className="text-2xl font-bold text-purple-600">{mockWorkflows.reduce((sum, w) => sum + w.totalRuns, 0)}</p>
              </div>
              <GitBranch className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Tỷ lệ thành công</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {(mockWorkflows.reduce((sum, w) => sum + w.successRate, 0) / mockWorkflows.length).toFixed(1)}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danh sách quy trình</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredWorkflows}
            columns={columns}
            renderCell={renderCell}
            searchable={false}
            pagination={true}
            itemsPerPage={10}
          />
        </CardContent>
      </Card>
      </div>
    </AppLayout>
  )
}