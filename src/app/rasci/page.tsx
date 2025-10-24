'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AppLayout } from '@/components/app-layout'
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2,
  UserCheck,
  UserPlus,
  UserX,
  Settings,
  CheckCircle,
  Circle,
  AlertTriangle,
  PlayCircle,
  RotateCcw,
  Save,
  X
} from 'lucide-react'

interface RASCIEntry {
  id: number
  task: string
  responsible: string[]
  accountable: string
  consulted: string[]
  informed: string[]
  phase: 'Plan' | 'Do' | 'Check' | 'Act'
}

interface Employee {
  id: number
  name: string
  position: string
  department: string
  email: string
  phone: string
  status: 'Active' | 'On Leave' | 'Inactive'
  skills: string[]
  certifications: string[]
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    position: 'Giám định viên trưởng',
    department: 'Kỹ thuật',
    email: 'nguyenan@company.com',
    phone: '0912345678',
    status: 'Active',
    skills: ['Thiết bị điện', 'Hệ thống grounding', 'PCCC'],
    certifications: ['Chứng chỉ giám định điện', 'Chứng chỉ an toàn lao động']
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    position: 'Giám định viên',
    department: 'Kỹ thuật',
    email: 'tranbinh@company.com',
    phone: '0923456789',
    status: 'Active',
    skills: ['Thiết bị nâng', 'Cơ khí'],
    certifications: ['Chứng chỉ giám định cơ khí']
  },
  {
    id: 3,
    name: 'Lê Văn Cường',
    position: 'Chuyên viên kiểm tra',
    department: 'QA/QC',
    email: 'lecuong@company.com',
    phone: '0934567890',
    status: 'Active',
    skills: ['QA/QC', 'Kiểm tra chất lượng', 'Báo cáo kỹ thuật'],
    certifications: ['Chứng chỉ QA/QC']
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    position: 'Trưởng phòng Checking',
    department: 'QA/QC',
    email: 'phamdung@company.com',
    phone: '0945678901',
    status: 'Active',
    skills: ['Checking', 'Review báo cáo', 'Phê duyệt'],
    certifications: ['Chứng chỉ quản lý chất lượng']
  },
  {
    id: 5,
    name: 'Hoàng Văn Em',
    position: 'Giám định viên PCCC',
    department: 'PCCC',
    email: 'hoangem@company.com',
    phone: '0956789012',
    status: 'On Leave',
    skills: ['PCCC', 'Hệ thống chữa cháy', 'An toàn PCCC'],
    certifications: ['Chứng chỉ PCCC']
  }
]

const mockRASCI: RASCIEntry[] = [
  // Plan Phase
  {
    id: 1,
    task: 'Lập kế hoạch giám định',
    responsible: ['Nguyễn Văn An', 'Trần Thị Bình'],
    accountable: 'Phạm Thị Dung',
    consulted: ['Lê Văn Cường', 'Hoàng Văn Em'],
    informed: ['Ban lãnh đạo'],
    phase: 'Plan'
  },
  {
    id: 2,
    task: 'Phân công nhân sự',
    responsible: ['Phạm Thị Dung'],
    accountable: 'Phạm Thị Dung',
    consulted: ['Nguyễn Văn An', 'Trần Thị Bình'],
    informed: ['Ban lãnh đạo', 'Khách hàng'],
    phase: 'Plan'
  },
  {
    id: 3,
    task: 'Chuẩn bị thiết bị',
    responsible: ['Nguyễn Văn An'],
    accountable: 'Nguyễn Văn An',
    consulted: ['Trần Thị Bình'],
    informed: ['Phạm Thị Dung'],
    phase: 'Plan'
  },
  // Do Phase
  {
    id: 4,
    task: 'Thực hiện giám định hiện trường',
    responsible: ['Nguyễn Văn An', 'Trần Thị Bình', 'Hoàng Văn Em'],
    accountable: 'Nguyễn Văn An',
    consulted: ['Lê Văn Cường'],
    informed: ['Phạm Thị Dung', 'Khách hàng'],
    phase: 'Do'
  },
  {
    id: 5,
    task: 'Chụp ảnh và ghi nhận',
    responsible: ['Trần Thị Bình', 'Hoàng Văn Em'],
    accountable: 'Nguyễn Văn An',
    consulted: [],
    informed: ['Lê Văn Cường'],
    phase: 'Do'
  },
  {
    id: 6,
    task: 'Lập báo cáo hiện trường',
    responsible: ['Nguyễn Văn An', 'Trần Thị Bình'],
    accountable: 'Nguyễn Văn An',
    consulted: ['Hoàng Văn Em'],
    informed: ['Phạm Thị Dung'],
    phase: 'Do'
  },
  {
    id: 7,
    task: 'Ghi nhận EAIP (nếu có)',
    responsible: ['Nguyễn Văn An', 'Trần Thị Bình'],
    accountable: 'Nguyễn Văn An',
    consulted: ['Lê Văn Cường'],
    informed: ['Phạm Thị Dung', 'Ban lãnh đạo'],
    phase: 'Do'
  },
  // Check Phase
  {
    id: 8,
    task: 'Checking báo cáo hiện trường',
    responsible: ['Lê Văn Cường'],
    accountable: 'Phạm Thị Dung',
    consulted: ['Nguyễn Văn An'],
    informed: ['Ban lãnh đạo'],
    phase: 'Check'
  },
  {
    id: 9,
    task: 'Checking EAIP reports',
    responsible: ['Lê Văn Cường'],
    accountable: 'Phạm Thị Dung',
    consulted: ['Nguyễn Văn An'],
    informed: ['Ban lãnh đạo', 'Bộ phận an toàn'],
    phase: 'Check'
  },
  {
    id: 10,
    task: 'Phê duyệt báo cáo cuối cùng',
    responsible: ['Phạm Thị Dung'],
    accountable: 'Phạm Thị Dung',
    consulted: ['Lê Văn Cường'],
    informed: ['Ban lãnh đạo', 'Khách hàng'],
    phase: 'Check'
  },
  // Act Phase
  {
    id: 11,
    task: 'Phát hành chứng thư',
    responsible: ['Phạm Thị Dung'],
    accountable: 'Phạm Thị Dung',
    consulted: ['Lê Văn Cường'],
    informed: ['Ban lãnh đạo', 'Khách hàng', 'Ngân hàng'],
    phase: 'Act'
  },
  {
    id: 12,
    task: 'Lưu trữ hồ sơ',
    responsible: ['Lê Văn Cường'],
    accountable: 'Phạm Thị Dung',
    consulted: [],
    informed: ['Phòng hành chính'],
    phase: 'Act'
  },
  {
    id: 13,
    task: 'Cải tiến quy trình (nếu cần)',
    responsible: ['Phạm Thị Dung', 'Nguyễn Văn An'],
    accountable: 'Phạm Thị Dung',
    consulted: ['Lê Văn Cường', 'Trần Thị Bình'],
    informed: ['Ban lãnh đạo'],
    phase: 'Act'
  }
]

export default function RASCIPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [employees, setEmployees] = useState(mockEmployees)
  const [rasciMatrix, setRASCI] = useState(mockRASCI)
  
  // Filter states
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    search: ''
  })
  
  const [filteredEmployees, setFilteredEmployees] = useState(employees)
  const [filteredTasks, setFilteredTasks] = useState(rasciMatrix)
  
  // CRUD States
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [editingTask, setEditingTask] = useState<RASCIEntry | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{type: 'employee' | 'task', id: number} | null>(null)
  
  // Form States
  const [employeeForm, setEmployeeForm] = useState<Partial<Employee>>({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    status: 'Active',
    skills: [],
    certifications: []
  })
  
  const [taskForm, setTaskForm] = useState<Partial<RASCIEntry>>({
    task: '',
    responsible: [],
    accountable: '',
    consulted: [],
    informed: [],
    phase: 'Plan'
  })
  
  const [skillInput, setSkillInput] = useState('')
  const [certInput, setCertInput] = useState('')

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Plan': return 'bg-blue-100 text-blue-800'
      case 'Do': return 'bg-green-100 text-green-800'
      case 'Check': return 'bg-yellow-100 text-yellow-800'
      case 'Act': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'Plan': return <Settings className="w-4 h-4" />
      case 'Do': return <PlayCircle className="w-4 h-4" />
      case 'Check': return <CheckCircle className="w-4 h-4" />
      case 'Act': return <RotateCcw className="w-4 h-4" />
      default: return <Circle className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'On Leave': return 'bg-yellow-100 text-yellow-800'
      case 'Inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRASCIColor = (role: string) => {
    switch (role) {
      case 'R': return 'bg-blue-100 text-blue-800' // Responsible
      case 'A': return 'bg-red-100 text-red-800'   // Accountable
      case 'S': return 'bg-green-100 text-green-800' // Support
      case 'C': return 'bg-yellow-100 text-yellow-800' // Consulted
      case 'I': return 'bg-purple-100 text-purple-800' // Informed
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderRASCIBadge = (employees: string | string[], role: string) => {
    const employeeList = Array.isArray(employees) ? employees : [employees]
    const roleLetter = role.charAt(0).toUpperCase()
    
    return (
      <div className="flex flex-wrap gap-1">
        {employeeList.map((emp, index) => (
          <Badge key={index} className={`text-xs ${getRASCIColor(roleLetter)}`}>
            {roleLetter}: {emp}
          </Badge>
        ))}
      </div>
    )
  }

  const getPhaseTasks = (phase: string) => {
    return rasciMatrix.filter(item => item.phase === phase)
  }

  // CRUD Functions
  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setEmployeeForm({
      name: '',
      position: '',
      department: '',
      email: '',
      phone: '',
      status: 'Active',
      skills: [],
      certifications: []
    })
    setSkillInput('')
    setCertInput('')
    setIsEmployeeModalOpen(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setEmployeeForm(employee)
    setSkillInput('')
    setCertInput('')
    setIsEmployeeModalOpen(true)
  }

  const handleSaveEmployee = () => {
    if (editingEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id 
          ? { ...employeeForm, id: editingEmployee.id } as Employee
          : emp
      ))
    } else {
      // Add new employee
      const newEmployee: Employee = {
        ...employeeForm,
        id: Math.max(...employees.map(e => e.id)) + 1
      } as Employee
      setEmployees([...employees, newEmployee])
    }
    setIsEmployeeModalOpen(false)
  }

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id))
    setDeleteConfirm(null)
  }

  const handleAddTask = () => {
    setEditingTask(null)
    setTaskForm({
      task: '',
      responsible: [],
      accountable: '',
      consulted: [],
      informed: [],
      phase: 'Plan'
    })
    setIsTaskModalOpen(true)
  }

  const handleEditTask = (task: RASCIEntry) => {
    setEditingTask(task)
    setTaskForm(task)
    setIsTaskModalOpen(true)
  }

  const handleSaveTask = () => {
    if (editingTask) {
      // Update existing task
      setRASCI(rasciMatrix.map(task => 
        task.id === editingTask.id 
          ? { ...taskForm, id: editingTask.id } as RASCIEntry
          : task
      ))
    } else {
      // Add new task
      const newTask: RASCIEntry = {
        ...taskForm,
        id: Math.max(...rasciMatrix.map(t => t.id)) + 1
      } as RASCIEntry
      setRASCI([...rasciMatrix, newTask])
    }
    setIsTaskModalOpen(false)
  }

  const handleDeleteTask = (id: number) => {
    setRASCI(rasciMatrix.filter(task => task.id !== id))
    setDeleteConfirm(null)
  }

  const addSkill = () => {
    if (skillInput.trim() && !employeeForm.skills?.includes(skillInput.trim())) {
      setEmployeeForm({
        ...employeeForm,
        skills: [...(employeeForm.skills || []), skillInput.trim()]
      })
      setSkillInput('')
    }
  }

  const removeSkill = (skill: string) => {
    setEmployeeForm({
      ...employeeForm,
      skills: employeeForm.skills?.filter(s => s !== skill) || []
    })
  }

  const addCertification = () => {
    if (certInput.trim() && !employeeForm.certifications?.includes(certInput.trim())) {
      setEmployeeForm({
        ...employeeForm,
        certifications: [...(employeeForm.certifications || []), certInput.trim()]
      })
      setCertInput('')
    }
  }

  const removeCertification = (cert: string) => {
    setEmployeeForm({
      ...employeeForm,
      certifications: employeeForm.certifications?.filter(c => c !== cert) || []
    })
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    // Filter employees
    let filteredEmp = [...employees]
    if (newFilters.status) {
      filteredEmp = filteredEmp.filter(emp => emp.status === newFilters.status)
    }
    if (newFilters.department) {
      filteredEmp = filteredEmp.filter(emp => emp.department === newFilters.department)
    }
    if (newFilters.search) {
      const searchTerm = newFilters.search.toLowerCase()
      filteredEmp = filteredEmp.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm) ||
        emp.position.toLowerCase().includes(searchTerm) ||
        emp.email.toLowerCase().includes(searchTerm)
      )
    }
    setFilteredEmployees(filteredEmp)
    
    // Filter tasks
    let filteredTask = [...rasciMatrix]
    if (newFilters.search) {
      const searchTerm = newFilters.search.toLowerCase()
      filteredTask = filteredTask.filter(task => 
        task.task.toLowerCase().includes(searchTerm) ||
        task.responsible.some(r => r.toLowerCase().includes(searchTerm)) ||
        task.accountable.toLowerCase().includes(searchTerm)
      )
    }
    setFilteredTasks(filteredTask)
  }

  return (
    <AppLayout>
      <div className="space-y-3">
      {/* Header with Integrated Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-[#1A365D]">Quản lý Nhân sự & RASCI</h1>
        
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
              <option value="Active">Đang làm việc</option>
              <option value="On Leave">Nghỉ phép</option>
              <option value="Inactive">Không hoạt động</option>
            </select>
            <select 
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
            >
              <option value="">Phòng ban</option>
              <option value="Kỹ thuật">Kỹ thuật</option>
              <option value="QA/QC">QA/QC</option>
              <option value="PCCC">PCCC</option>
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
                setFilters({ status: '', department: '', search: '' })
                setFilteredEmployees(employees)
                setFilteredTasks(rasciMatrix)
              }}
            >
              ×
            </Button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 px-3 border-[#D1E5F0] text-[#3A7BD5] hover:bg-[#E8F1FA] text-xs whitespace-nowrap"
              onClick={handleAddTask}
            >
              <Edit className="w-3 h-3 mr-1" />
              Thêm công việc
            </Button>
            <Button 
              size="sm" 
              className="h-7 px-3 bg-[#3A7BD5] hover:bg-[#2E5FA3] text-white text-xs whitespace-nowrap"
              onClick={handleAddEmployee}
            >
              <UserPlus className="w-3 h-3 mr-1" />
              Thêm nhân sự
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
                <p className="text-xs text-[#6B7280] mb-0.5">Tổng nhân sự</p>
                <p className="text-base font-semibold text-[#1A365D]">{filteredEmployees.length}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Users className="w-2.5 h-2.5 text-blue-500" />
                  <span className="text-xs text-blue-500">+2</span>
                  <span className="text-xs text-[#6B7280]">tháng này</span>
                </div>
              </div>
              <div className="w-6 h-6 bg-[#E8F1FA] rounded-full flex items-center justify-center ml-1">
                <Users className="w-3 h-3 text-[#3A7BD5]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#D1E5F0] bg-white shadow-sm">
          <CardContent className="p-2 py-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-[#6B7280] mb-0.5">Đang làm việc</p>
                <p className="text-base font-semibold text-green-600">
                  {filteredEmployees.filter(e => e.status === 'Active').length}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <UserCheck className="w-2.5 h-2.5 text-green-500" />
                  <span className="text-xs text-green-500">85%</span>
                  <span className="text-xs text-[#6B7280]">tỷ lệ</span>
                </div>
              </div>
              <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center ml-1">
                <UserCheck className="w-3 h-3 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#D1E5F0] bg-white shadow-sm">
          <CardContent className="p-2 py-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-[#6B7280] mb-0.5">Nghỉ phép</p>
                <p className="text-base font-semibold text-yellow-600">
                  {filteredEmployees.filter(e => e.status === 'On Leave').length}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <AlertTriangle className="w-2.5 h-2.5 text-yellow-500" />
                  <span className="text-xs text-yellow-500">1</span>
                  <span className="text-xs text-[#6B7280]">người</span>
                </div>
              </div>
              <div className="w-6 h-6 bg-yellow-50 rounded-full flex items-center justify-center ml-1">
                <AlertTriangle className="w-3 h-3 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#D1E5F0] bg-white shadow-sm">
          <CardContent className="p-2 py-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-[#6B7280] mb-0.5">Công việc RASCI</p>
                <p className="text-base font-semibold text-purple-600">{filteredTasks.length}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Settings className="w-2.5 h-2.5 text-purple-500" />
                  <span className="text-xs text-purple-500">4</span>
                  <span className="text-xs text-[#6B7280]">giai đoạn</span>
                </div>
              </div>
              <div className="w-6 h-6 bg-purple-50 rounded-full flex items-center justify-center ml-1">
                <Settings className="w-3 h-3 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="employees">Nhân sự</TabsTrigger>
          <TabsTrigger value="plan">Plan</TabsTrigger>
          <TabsTrigger value="do">Do</TabsTrigger>
          <TabsTrigger value="check">Check</TabsTrigger>
          <TabsTrigger value="act">Act</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Phân bổ nhân sự theo giai đoạn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Plan', 'Do', 'Check', 'Act'].map(phase => {
                    const phaseTasks = getPhaseTasks(phase)
                    const uniqueEmployees = new Set()
                    phaseTasks.forEach(task => {
                      if (Array.isArray(task.responsible)) {
                        task.responsible.forEach(emp => uniqueEmployees.add(emp))
                      }
                      if (task.accountable) uniqueEmployees.add(task.accountable)
                      if (Array.isArray(task.consulted)) {
                        task.consulted.forEach(emp => uniqueEmployees.add(emp))
                      }
                      if (Array.isArray(task.informed)) {
                        task.informed.forEach(emp => uniqueEmployees.add(emp))
                      }
                    })
                    
                    return (
                      <div key={phase} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getPhaseIcon(phase)}
                          <span className="font-medium">{phase}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{uniqueEmployees.size} người</p>
                          <p className="text-xs text-slate-600">{phaseTasks.length} công việc</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Phân bổ vai trò RASCI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['R - Responsible', 'A - Accountable', 'C - Consulted', 'I - Informed'].map(role => {
                    const roleLetter = role.charAt(0)
                    let count = 0
                    
                    rasciMatrix.forEach(task => {
                      if (roleLetter === 'R') count += task.responsible.length
                      else if (roleLetter === 'A') count += 1
                      else if (roleLetter === 'C') count += task.consulted.length
                      else if (roleLetter === 'I') count += task.informed.length
                    })
                    
                    return (
                      <div key={role} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <Badge className={`text-sm ${getRASCIColor(roleLetter)}`}>
                          {role}
                        </Badge>
                        <p className="text-sm font-medium">{count} lượt phân công</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Danh sách nhân sự</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEmployees.map(employee => (
                  <div key={employee.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-slate-900">{employee.name}</h3>
                          <Badge className={`text-xs ${getStatusColor(employee.status)}`}>
                            {employee.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">{employee.position} - {employee.department}</p>
                        <p className="text-xs text-slate-500 mb-2">{employee.email} | {employee.phone}</p>
                        
                        <div className="mb-2">
                          <p className="text-xs font-medium text-slate-700 mb-1">Kỹ năng:</p>
                          <div className="flex flex-wrap gap-1">
                            {employee.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium text-slate-700 mb-1">Chứng chỉ:</p>
                          <div className="flex flex-wrap gap-1">
                            {employee.certifications.map((cert, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plan Phase Tab */}
        <TabsContent value="plan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Badge className={`mr-2 ${getPhaseColor('Plan')}`}>Plan</Badge>
                Giai đoạn Lập kế hoạch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getPhaseTasks('Plan').map(task => (
                  <div key={task.id} className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-3">{task.task}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Responsible (R):</p>
                        {renderRASCIBadge(task.responsible, 'Responsible')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Accountable (A):</p>
                        {renderRASCIBadge(task.accountable, 'Accountable')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Consulted (C):</p>
                        {renderRASCIBadge(task.consulted, 'Consulted')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Informed (I):</p>
                        {renderRASCIBadge(task.informed, 'Informed')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Do Phase Tab */}
        <TabsContent value="do" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Badge className={`mr-2 ${getPhaseColor('Do')}`}>Do</Badge>
                Giai đoạn Thực hiện
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getPhaseTasks('Do').map(task => (
                  <div key={task.id} className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-3">{task.task}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Responsible (R):</p>
                        {renderRASCIBadge(task.responsible, 'Responsible')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Accountable (A):</p>
                        {renderRASCIBadge(task.accountable, 'Accountable')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Consulted (C):</p>
                        {renderRASCIBadge(task.consulted, 'Consulted')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Informed (I):</p>
                        {renderRASCIBadge(task.informed, 'Informed')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Check Phase Tab */}
        <TabsContent value="check" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Badge className={`mr-2 ${getPhaseColor('Check')}`}>Check</Badge>
                Giai đoạn Kiểm tra
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getPhaseTasks('Check').map(task => (
                  <div key={task.id} className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-3">{task.task}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Responsible (R):</p>
                        {renderRASCIBadge(task.responsible, 'Responsible')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Accountable (A):</p>
                        {renderRASCIBadge(task.accountable, 'Accountable')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Consulted (C):</p>
                        {renderRASCIBadge(task.consulted, 'Consulted')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Informed (I):</p>
                        {renderRASCIBadge(task.informed, 'Informed')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Act Phase Tab */}
        <TabsContent value="act" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Badge className={`mr-2 ${getPhaseColor('Act')}`}>Act</Badge>
                Giai đoạn Hành động
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getPhaseTasks('Act').map(task => (
                  <div key={task.id} className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-3">{task.task}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Responsible (R):</p>
                        {renderRASCIBadge(task.responsible, 'Responsible')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Accountable (A):</p>
                        {renderRASCIBadge(task.accountable, 'Accountable')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Consulted (C):</p>
                        {renderRASCIBadge(task.consulted, 'Consulted')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Informed (I):</p>
                        {renderRASCIBadge(task.informed, 'Informed')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Employee Modal */}
      <Dialog open={isEmployeeModalOpen} onOpenChange={setIsEmployeeModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingEmployee ? 'Chỉnh sửa nhân sự' : 'Thêm nhân sự mới'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Họ tên</Label>
                <Input
                  id="name"
                  value={employeeForm.name || ''}
                  onChange={(e) => setEmployeeForm({...employeeForm, name: e.target.value})}
                  placeholder="Nhập họ tên"
                />
              </div>
              <div>
                <Label htmlFor="position">Chức vụ</Label>
                <Input
                  id="position"
                  value={employeeForm.position || ''}
                  onChange={(e) => setEmployeeForm({...employeeForm, position: e.target.value})}
                  placeholder="Nhập chức vụ"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Phòng ban</Label>
                <Input
                  id="department"
                  value={employeeForm.department || ''}
                  onChange={(e) => setEmployeeForm({...employeeForm, department: e.target.value})}
                  placeholder="Nhập phòng ban"
                />
              </div>
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select value={employeeForm.status} onValueChange={(value) => setEmployeeForm({...employeeForm, status: value as any})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={employeeForm.email || ''}
                  onChange={(e) => setEmployeeForm({...employeeForm, email: e.target.value})}
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Điện thoại</Label>
                <Input
                  id="phone"
                  value={employeeForm.phone || ''}
                  onChange={(e) => setEmployeeForm({...employeeForm, phone: e.target.value})}
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>

            <div>
              <Label>Kỹ năng</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Nhập kỹ năng"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button type="button" onClick={addSkill}>Thêm</Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {employeeForm.skills?.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                    {skill} ×
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Chứng chỉ</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="Nhập chứng chỉ"
                  onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                />
                <Button type="button" onClick={addCertification}>Thêm</Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {employeeForm.certifications?.map((cert, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeCertification(cert)}>
                    {cert} ×
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEmployeeModalOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSaveEmployee}>
                <Save className="w-4 h-4 mr-2" />
                Lưu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task Modal */}
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTask ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="task">Tên công việc</Label>
              <Input
                id="task"
                value={taskForm.task || ''}
                onChange={(e) => setTaskForm({...taskForm, task: e.target.value})}
                placeholder="Nhập tên công việc"
              />
            </div>

            <div>
              <Label htmlFor="phase">Giai đoạn</Label>
              <Select value={taskForm.phase} onValueChange={(value) => setTaskForm({...taskForm, phase: value as any})}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giai đoạn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Plan">Plan</SelectItem>
                  <SelectItem value="Do">Do</SelectItem>
                  <SelectItem value="Check">Check</SelectItem>
                  <SelectItem value="Act">Act</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="responsible">Responsible (R)</Label>
              <Input
                id="responsible"
                value={taskForm.responsible?.join(', ') || ''}
                onChange={(e) => setTaskForm({...taskForm, responsible: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                placeholder="Nhập tên người chịu trách nhiệm, cách nhau bằng dấu phẩy"
              />
            </div>

            <div>
              <Label htmlFor="accountable">Accountable (A)</Label>
              <Input
                id="accountable"
                value={taskForm.accountable || ''}
                onChange={(e) => setTaskForm({...taskForm, accountable: e.target.value})}
                placeholder="Nhập tên người phê duyệt"
              />
            </div>

            <div>
              <Label htmlFor="consulted">Consulted (C)</Label>
              <Input
                id="consulted"
                value={taskForm.consulted?.join(', ') || ''}
                onChange={(e) => setTaskForm({...taskForm, consulted: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                placeholder="Nhập tên người được tư vấn, cách nhau bằng dấu phẩy"
              />
            </div>

            <div>
              <Label htmlFor="informed">Informed (I)</Label>
              <Input
                id="informed"
                value={taskForm.informed?.join(', ') || ''}
                onChange={(e) => setTaskForm({...taskForm, informed: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                placeholder="Nhập tên người được thông báo, cách nhau bằng dấu phẩy"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsTaskModalOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSaveTask}>
                <Save className="w-4 h-4 mr-2" />
                Lưu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
          </DialogHeader>
          <p>
            Bạn có chắc chắn muốn xóa {deleteConfirm?.type === 'employee' ? 'nhân sự' : 'công việc'} này không?
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Hủy
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (deleteConfirm) {
                  if (deleteConfirm.type === 'employee') {
                    handleDeleteEmployee(deleteConfirm.id)
                  } else {
                    handleDeleteTask(deleteConfirm.id)
                  }
                }
              }}
            >
              Xóa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </AppLayout>
  )
}