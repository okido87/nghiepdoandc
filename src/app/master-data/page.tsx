'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AppLayout } from '@/components/app-layout'
import { 
  BarChart3, 
  Plus, 
  Search, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Filter,
  Database,
  Settings,
  Building,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Save,
  X
} from 'lucide-react'

interface MasterData {
  id: number
  type: string
  code: string
  name: string
  category: string
  status: 'Active' | 'Inactive' | 'Draft'
  description: string
  createdDate: string
  modifiedDate: string
  createdBy: string
  modifiedBy: string
  version: string
  parent?: string
  children?: number
  attributes: Record<string, any>
}

const mockMasterData: MasterData[] = [
  { 
    id: 1, 
    type: 'Customer', 
    code: 'CUST-001', 
    name: 'Công ty Điện lực ABC', 
    category: 'Doanh nghiệp', 
    status: 'Active', 
    description: 'Công ty điện lực lớn khu vực phía Nam', 
    createdDate: '2024-01-01', 
    modifiedDate: '2024-01-15', 
    createdBy: 'Admin', 
    modifiedBy: 'Nguyễn Văn An', 
    version: '1.2', 
    attributes: { 
      address: '123 Nguyễn Huệ, Q.1, TP.HCM', 
      phone: '028-3821-2345', 
      email: 'info@dienlucabc.vn', 
      taxCode: '0123456789',
      website: 'www.dienlucabc.vn'
    }
  },
  { 
    id: 2, 
    type: 'Equipment', 
    code: 'EQ-001', 
    name: 'Máy phát điện 1500KVA', 
    category: 'Thiết bị điện', 
    status: 'Active', 
    description: 'Máy phát điện công suất lớn dùng cho nhà máy', 
    createdDate: '2024-01-02', 
    modifiedDate: '2024-01-18', 
    createdBy: 'Admin', 
    modifiedBy: 'Trần Thị Bình', 
    version: '1.0', 
    attributes: { 
      manufacturer: 'Cummins', 
      model: 'C1500D5', 
      power: '1500KVA', 
      voltage: '400V',
      frequency: '50Hz',
      fuel: 'Diesel'
    }
  },
  { 
    id: 3, 
    type: 'Standard', 
    code: 'STD-001', 
    name: 'TCVN 9213:2015 - An toàn điện', 
    category: 'Tiêu chuẩn Việt Nam', 
    status: 'Active', 
    description: 'Tiêu chuẩn an toàn điện trong công nghiệp', 
    createdDate: '2024-01-03', 
    modifiedDate: '2024-01-20', 
    createdBy: 'Admin', 
    modifiedBy: 'Lê Văn Cường', 
    version: '2015', 
    attributes: { 
      publishDate: '2015-12-15', 
      effectiveDate: '2016-06-01', 
      scope: 'An toàn điện công nghiệp',
      pages: 45,
      language: 'Vietnamese'
    }
  },
  { 
    id: 4, 
    type: 'Location', 
    code: 'LOC-001', 
    name: 'Nhà máy Thép Hòa Phát', 
    category: 'Nhà máy', 
    status: 'Active', 
    description: 'Nhà máy sản xuất thép lớn nhất Việt Nam', 
    createdDate: '2024-01-04', 
    modifiedDate: '2024-01-22', 
    createdBy: 'Admin', 
    modifiedBy: 'Phạm Thị Dung', 
    version: '1.1', 
    attributes: { 
      address: 'Khu công nghiệp Sông Thần, Bình Dương', 
      area: '500 ha', 
      coordinates: '10.8451°N, 106.7167°E',
      established: '2007',
      employees: 5000
    }
  },
  { 
    id: 5, 
    type: 'Service', 
    code: 'SVC-001', 
    name: 'Giám định hệ thống điện', 
    category: 'Dịch vụ kỹ thuật', 
    status: 'Active', 
    description: 'Dịch vụ giám định toàn diện hệ thống điện', 
    createdDate: '2024-01-05', 
    modifiedDate: '2024-01-25', 
    createdBy: 'Admin', 
    modifiedBy: 'Hoàng Văn Em', 
    version: '2.0', 
    attributes: { 
      duration: '3-5 ngày', 
      price: '15,000,000 VNĐ', 
      warranty: '12 tháng',
      requirements: ['Cắt điện', 'An toàn lao động', 'Thiết bị đo']
    }
  },
  { 
    id: 6, 
    type: 'Supplier', 
    code: 'SUP-001', 
    name: 'Công ty Thiết bị ABC', 
    category: 'Nhà cung cấp', 
    status: 'Active', 
    description: 'Nhà cung cấp thiết bị điện công nghiệp', 
    createdDate: '2024-01-06', 
    modifiedDate: '2024-01-16', 
    createdBy: 'Admin', 
    modifiedBy: 'Đỗ Thị Giang', 
    version: '1.0', 
    attributes: { 
      address: '456 Lê Lợi, Q.1, TP.HCM', 
      phone: '028-3822-3456', 
      email: 'sales@thietbiabc.vn',
      taxCode: '9876543210',
      products: ['Thiết bị điện', 'Công tơ', 'Máy biến áp']
    }
  },
  { 
    id: 7, 
    type: 'Certificate', 
    code: 'CERT-001', 
    name: 'Chứng chỉ Giám định viên', 
    category: 'Chứng chỉ', 
    status: 'Active', 
    description: 'Chứng chỉ giám định viên điện công nghiệp', 
    createdDate: '2024-01-07', 
    modifiedDate: '2024-01-21', 
    createdBy: 'Admin', 
    modifiedBy: 'Vũ Văn Hùng', 
    version: '2024', 
    attributes: { 
      issuedBy: 'Bộ Công Thương', 
      validFrom: '2024-01-01', 
      validTo: '2026-12-31',
      level: 'Cấp độ 1',
      requirements: ['2 năm kinh nghiệm', 'Bằng kỹ sư điện']
    }
  },
  { 
    id: 8, 
    type: 'Document', 
    code: 'DOC-001', 
    name: 'Quy trình Giám định', 
    category: 'Quy trình', 
    status: 'Active', 
    description: 'Quy trình chuẩn giám định thiết bị điện', 
    createdDate: '2024-01-08', 
    modifiedDate: '2024-01-24', 
    createdBy: 'Admin', 
    modifiedBy: 'Bùi Thị Lan', 
    version: '3.2', 
    attributes: { 
      pages: 25, 
      format: 'PDF', 
      size: '2.5 MB',
      language: 'Vietnamese',
      approval: 'Đã duyệt'
    }
  },
  { 
    id: 9, 
    type: 'Material', 
    code: 'MAT-001', 
    name: 'Dây đồng điện lực', 
    category: 'Vật tư', 
    status: 'Active', 
    description: 'Dây đồng tiêu chuẩn cho hệ thống điện', 
    createdDate: '2024-01-09', 
    modifiedDate: '2024-01-19', 
    createdBy: 'Admin', 
    modifiedBy: 'Cao Văn Minh', 
    version: '1.0', 
    attributes: { 
      specification: 'Cuồng 35mm²', 
      standard: 'TCVN 6610', 
      manufacturer: 'LS VINA Cable',
      unit: 'm',
      price: '150,000 VNĐ/m'
    }
  },
  { 
    id: 10, 
    type: 'Tool', 
    code: 'TOOL-001', 
    name: 'Megaohm meter', 
    category: 'Thiết bị đo', 
    status: 'Active', 
    description: 'Thiết bị đo điện trở cách điện', 
    createdDate: '2024-01-10', 
    modifiedDate: '2024-01-23', 
    createdBy: 'Admin', 
    modifiedBy: 'Dương Thị Nga', 
    version: '1.0', 
    attributes: { 
      brand: 'Fluke', 
      model: '1503', 
      range: '0-2000MΩ',
      accuracy: '±2%',
      calibration: '2024-01-15'
    }
  },
  { 
    id: 11, 
    type: 'Project', 
    code: 'PROJ-001', 
    name: 'Dự án Giám định Nhà máy', 
    category: 'Dự án', 
    status: 'Active', 
    description: 'Dự án giám định toàn diện nhà máy thép', 
    createdDate: '2024-01-11', 
    modifiedDate: '2024-01-26', 
    createdBy: 'Admin', 
    modifiedBy: 'Đinh Văn Phát', 
    version: '1.0', 
    attributes: { 
      startDate: '2024-01-15', 
      endDate: '2024-03-15',
      budget: '500,000,000 VNĐ',
      manager: 'Nguyễn Văn An',
      status: 'Đang thực hiện'
    }
  },
  { 
    id: 12, 
    type: 'Department', 
    code: 'DEPT-001', 
    name: 'Phòng Kỹ thuật', 
    category: 'Phòng ban', 
    status: 'Active', 
    description: 'Phòng kỹ thuật chuyên môn', 
    createdDate: '2024-01-12', 
    modifiedDate: '2024-01-27', 
    createdBy: 'Admin', 
    modifiedBy: 'Gia Thị Quỳnh', 
    version: '1.0', 
    attributes: { 
      manager: 'Trần Thị Bình', 
      employees: 15, 
      floor: 'Tầng 3',
      extension: '301',
      email: 'kythuat@company.vn'
    }
  },
  { 
    id: 13, 
    type: 'Training', 
    code: 'TRN-001', 
    name: 'Khóa đào tạo An toàn điện', 
    category: 'Đào tạo', 
    status: 'Active', 
    description: 'Khóa đào tạo an toàn điện cấp độ 1', 
    createdDate: '2024-01-13', 
    modifiedDate: '2024-01-28', 
    createdBy: 'Admin', 
    modifiedBy: 'Hà Văn Sơn', 
    version: '2024', 
    attributes: { 
      duration: '40 giờ', 
      instructor: 'Lê Văn Cường', 
      maxStudents: 20,
      fee: '5,000,000 VNĐ',
      certificate: 'Có'
    }
  },
  { 
    id: 14, 
    type: 'Risk', 
    code: 'RSK-001', 
    name: 'Rủi ro Điện giật', 
    category: 'Rủi ro', 
    status: 'Active', 
    description: 'Rủi ro điện giật trong môi trường công nghiệp', 
    createdDate: '2024-01-14', 
    modifiedDate: '2024-01-29', 
    createdBy: 'Admin', 
    modifiedBy: 'Kiều Thị Trúc', 
    version: '1.0', 
    attributes: { 
      level: 'Cao', 
      probability: 'Trung bình', 
      impact: 'Nghiêm trọng',
      mitigation: ['Đội bảo hộ', 'Cắt điện', 'Kiểm tra thiết bị']
    }
  },
  { 
    id: 15, 
    type: 'Regulation', 
    code: 'REG-001', 
    name: 'Nghị định 44/2016/NĐ-CP', 
    category: 'Văn bản pháp quy', 
    status: 'Active', 
    description: 'Quy định về an toàn lao động', 
    createdDate: '2024-01-15', 
    modifiedDate: '2024-01-30', 
    createdBy: 'Admin', 
    modifiedBy: 'Lâm Văn Tài', 
    version: '2016', 
    attributes: { 
      issuedDate: '2016-05-15', 
      effectiveDate: '2016-07-01', 
      issuer: 'Chính phủ',
      articles: 25,
      scope: 'An toàn lao động'
    }
  },
  { 
    id: 16, 
    type: 'Contract', 
    code: 'CON-001', 
    name: 'Hợp đồng Giám định ABC', 
    category: 'Hợp đồng', 
    status: 'Active', 
    description: 'Hợp đồng giám định hệ thống điện công ty ABC', 
    createdDate: '2024-01-16', 
    modifiedDate: '2024-01-31', 
    createdBy: 'Admin', 
    modifiedBy: 'Mai Thị Uyên', 
    version: '1.0', 
    attributes: { 
      value: '200,000,000 VNĐ', 
      startDate: '2024-02-01', 
      endDate: '2024-12-31',
      customer: 'Công ty ABC',
      paymentTerms: 'Net 30'
    }
  },
  { 
    id: 17, 
    type: 'Inspection', 
    code: 'INSP-001', 
    name: 'Kiểm tra định kỳ thiết bị', 
    category: 'Kiểm tra', 
    status: 'Active', 
    description: 'Quy trình kiểm tra định kỳ thiết bị điện', 
    createdDate: '2024-01-17', 
    modifiedDate: '2024-02-01', 
    createdBy: 'Admin', 
    modifiedBy: 'Ngô Văn Vương', 
    version: '1.0', 
    attributes: { 
      frequency: '6 tháng', 
      duration: '2 ngày', 
      checklist: '25 items',
      requiredTools: ['Megaohm meter', 'Clamp meter', 'Thermometer']
    }
  },
  { 
    id: 18, 
    type: 'Maintenance', 
    code: 'MAINT-001', 
    name: 'Bảo dưỡng máy phát điện', 
    category: 'Bảo dưỡng', 
    status: 'Active', 
    description: 'Quy trình bảo dưỡng máy phát điện định kỳ', 
    createdDate: '2024-01-18', 
    modifiedDate: '2024-02-02', 
    createdBy: 'Admin', 
    modifiedBy: 'Phan Thị Xuân', 
    version: '1.0', 
    attributes: { 
      interval: '500 giờ hoạt động', 
      duration: '8 giờ', 
      cost: '10,000,000 VNĐ',
      parts: ['Lọc dầu', 'Lọc nhiên liệu', 'Bụt']
    }
  },
  { 
    id: 19, 
    type: 'Quality', 
    code: 'QUAL-001', 
    name: 'Tiêu chuẩn chất lượng ISO 9001', 
    category: 'Chất lượng', 
    status: 'Active', 
    description: 'Hệ thống quản lý chất lượng ISO 9001', 
    createdDate: '2024-01-19', 
    modifiedDate: '2024-02-03', 
    createdBy: 'Admin', 
    modifiedBy: 'Quách Văn Yến', 
    version: '2015', 
    attributes: { 
      certification: 'ISO 9001:2015', 
      scope: 'Dịch vụ giám định', 
      auditor: 'TÜV Rheinland',
      validUntil: '2025-12-31'
    }
  },
  { 
    id: 20, 
    type: 'Emergency', 
    code: 'EMER-001', 
    name: 'Quy trình xử lý sự cố điện', 
    category: 'Sự cố', 
    status: 'Active', 
    description: 'Quy trình xử lý sự cố điện khẩn cấp', 
    createdDate: '2024-01-20', 
    modifiedDate: '2024-02-04', 
    createdBy: 'Admin', 
    modifiedBy: 'Tô Thị Ánh', 
    version: '1.0', 
    attributes: { 
      responseTime: '30 phút', 
      hotline: '1900-1234', 
      team: 'Đội xử lý sự cố',
      equipment: ['Bộ cứu hộ', 'Máy phát điện dự phòng']
    }
  }
]

export default function MasterDataPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  
  // CRUD States
  const [masterData, setMasterData] = useState(mockMasterData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MasterData | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [viewingItem, setViewingItem] = useState<MasterData | null>(null)
  
  // Filter states - unified like Orders page
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    status: '',
    search: ''
  })
  
  const [filteredData, setFilteredData] = useState(masterData)
  
  // Form State
  const [formData, setFormData] = useState<Partial<MasterData>>({
    type: '',
    code: '',
    name: '',
    category: '',
    status: 'Active',
    description: '',
    version: '1.0',
    attributes: {}
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    let filtered = [...masterData]
    
    if (newFilters.type) {
      filtered = filtered.filter(data => data.type === newFilters.type)
    }
    
    if (newFilters.category) {
      filtered = filtered.filter(data => data.category === newFilters.category)
    }
    
    if (newFilters.status) {
      filtered = filtered.filter(data => data.status === newFilters.status)
    }
    
    if (newFilters.search) {
      const searchTerm = newFilters.search.toLowerCase()
      filtered = filtered.filter(data => 
        data.code.toLowerCase().includes(searchTerm) ||
        data.name.toLowerCase().includes(searchTerm) ||
        data.description.toLowerCase().includes(searchTerm) ||
        data.type.toLowerCase().includes(searchTerm)
      )
    }
    
    setFilteredData(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-red-100 text-red-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Customer': 'bg-blue-100 text-blue-800',
      'Equipment': 'bg-purple-100 text-purple-800',
      'Standard': 'bg-orange-100 text-orange-800',
      'Location': 'bg-green-100 text-green-800',
      'Service': 'bg-pink-100 text-pink-800',
      'Supplier': 'bg-indigo-100 text-indigo-800',
      'Certificate': 'bg-red-100 text-red-800',
      'Document': 'bg-gray-100 text-gray-800',
      'Material': 'bg-yellow-100 text-yellow-800',
      'Tool': 'bg-teal-100 text-teal-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      'Customer': <Building className="w-4 h-4 text-blue-600" />,
      'Equipment': <Settings className="w-4 h-4 text-purple-600" />,
      'Standard': <Database className="w-4 h-4 text-orange-600" />,
      'Location': <MapPin className="w-4 h-4 text-green-600" />,
      'Service': <BarChart3 className="w-4 h-4 text-pink-600" />,
      'Supplier': <Building className="w-4 h-4 text-indigo-600" />,
      'Certificate': <Database className="w-4 h-4 text-red-600" />,
      'Document': <Database className="w-4 h-4 text-gray-600" />,
      'Material': <Database className="w-4 h-4 text-yellow-600" />,
      'Tool': <Settings className="w-4 h-4 text-teal-600" />
    }
    return icons[type] || <Database className="w-4 h-4 text-gray-600" />
  }

  // CRUD Functions
  const handleAdd = () => {
    setEditingItem(null)
    setFormData({
      type: '',
      code: '',
      name: '',
      category: '',
      status: 'Active',
      description: '',
      version: '1.0',
      attributes: {}
    })
    setIsModalOpen(true)
  }

  const handleEdit = (item: MasterData) => {
    setEditingItem(item)
    setFormData(item)
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (editingItem) {
      // Update existing item
      setMasterData(masterData.map(item => 
        item.id === editingItem.id 
          ? { 
              ...formData, 
              id: editingItem.id,
              modifiedDate: new Date().toISOString().split('T')[0],
              modifiedBy: 'Current User'
            } as MasterData
          : item
      ))
    } else {
      // Add new item
      const newItem: MasterData = {
        ...formData,
        id: Math.max(...masterData.map(item => item.id)) + 1,
        createdDate: new Date().toISOString().split('T')[0],
        modifiedDate: new Date().toISOString().split('T')[0],
        createdBy: 'Current User',
        modifiedBy: 'Current User'
      } as MasterData
      setMasterData([...masterData, newItem])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    setMasterData(masterData.filter(item => item.id !== id))
    setDeleteConfirm(null)
  }

  const handleView = (item: MasterData) => {
    setViewingItem(item)
  }

  const columns = [
    {
      id: 'code',
      header: 'Mã',
      accessorKey: 'code',
      sortable: true,
    },
    {
      id: 'name',
      header: 'Tên',
      accessorKey: 'name',
      sortable: true,
    },
    {
      id: 'type',
      header: 'Loại',
      accessorKey: 'type',
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
      id: 'version',
      header: 'Phiên bản',
      accessorKey: 'version',
      sortable: true,
    },
    {
      id: 'createdDate',
      header: 'Ngày tạo',
      accessorKey: 'createdDate',
      sortable: true,
    },
    {
      id: 'modifiedDate',
      header: 'Ngày sửa',
      accessorKey: 'modifiedDate',
      sortable: true,
    },
    {
      id: 'createdBy',
      header: 'Người tạo',
      accessorKey: 'createdBy',
      sortable: true,
    },
    {
      id: 'actions',
      header: 'Thao tác',
      sortable: false,
    }
  ]

  const renderCell = (data: MasterData, column: string) => {
    switch (column) {
      case 'type':
        return (
          <div className="flex items-center space-x-2">
            {getTypeIcon(data.type)}
            <Badge className={`text-xs ${getTypeColor(data.type)}`}>{data.type}</Badge>
          </div>
        )
      case 'status':
        return <Badge className={`text-xs ${getStatusColor(data.status)}`}>{data.status}</Badge>
      case 'actions':
        return (
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(data)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600" onClick={() => setDeleteConfirm(data.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )
      default:
        return data[column as keyof MasterData]
    }
  }

  const types = Array.from(new Set(masterData.map(d => d.type)))
  const categories = Array.from(new Set(masterData.map(d => d.category)))

  return (
    <AppLayout>
      <div className="space-y-3">
      {/* Header with Integrated Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-[#1A365D]">Quản lý Master Data</h1>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Integrated Filters */}
          <div className="flex items-center gap-2 bg-white border border-[#D1E5F0] rounded-lg px-2 py-1">
            <span className="text-xs font-medium text-[#6B7280] whitespace-nowrap">Lọc:</span>
            <select 
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
            >
              <option value="">Loại dữ liệu</option>
              <option value="Customer">Khách hàng</option>
              <option value="Equipment">Thiết bị</option>
              <option value="Standard">Tiêu chuẩn</option>
              <option value="Location">Vị trí</option>
              <option value="Service">Dịch vụ</option>
            </select>
            <select 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
            >
              <option value="">Trạng thái</option>
              <option value="Active">Hoạt động</option>
              <option value="Inactive">Không hoạt động</option>
              <option value="Draft">Bản nháp</option>
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
                setFilters({ type: '', category: '', status: '', search: '' })
                setFilteredData(masterData)
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
              onClick={() => {
                const csvContent = [
                  ['Mã', 'Tên', 'Loại', 'Danh mục', 'Trạng thái', 'Phiên bản', 'Ngày tạo'],
                  ...filteredData.map(data => [
                    data.code,
                    data.name,
                    data.type,
                    data.category,
                    data.status,
                    data.version,
                    data.createdDate
                  ])
                ].map(row => row.join(',')).join('\n')
                
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
                const link = document.createElement('a')
                const url = URL.createObjectURL(blob)
                link.setAttribute('href', url)
                link.setAttribute('download', `master_data_${new Date().toISOString().split('T')[0]}.csv`)
                link.style.visibility = 'hidden'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
            >
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
            <Button 
              size="sm" 
              className="h-7 px-3 bg-[#3A7BD5] hover:bg-[#2E5FA3] text-white text-xs whitespace-nowrap"
              onClick={handleAdd}
            >
              <Plus className="w-3 h-3 mr-1" />
              Thêm mới
            </Button>
          </div>
        </div>
      </div>

      {/* Data Types Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tổng quan theo loại dữ liệu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {types.slice(0, 10).map(type => {
              const count = mockMasterData.filter(d => d.type === type).length
              return (
                <div key={type} className="flex items-center space-x-2">
                  {getTypeIcon(type)}
                  <div>
                    <p className="text-sm font-medium">{type}</p>
                    <p className="text-xs text-slate-500">{count} mục</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danh sách Master Data</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredData}
            columns={columns}
            renderCell={renderCell}
            searchable={false}
            pagination={true}
            itemsPerPage={10}
            onRowClick={handleView}
          />
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Chỉnh sửa Master Data' : 'Thêm Master Data mới'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Loại</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Location">Location</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                    <SelectItem value="Supplier">Supplier</SelectItem>
                    <SelectItem value="Certificate">Certificate</SelectItem>
                    <SelectItem value="Document">Document</SelectItem>
                    <SelectItem value="Material">Material</SelectItem>
                    <SelectItem value="Tool">Tool</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="code">Mã</Label>
                <Input
                  id="code"
                  value={formData.code || ''}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  placeholder="Nhập mã"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="name">Tên</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nhập tên"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Danh mục</Label>
                <Input
                  id="category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="Nhập danh mục"
                />
              </div>
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as any})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Nhập mô tả"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="version">Phiên bản</Label>
                <Input
                  id="version"
                  value={formData.version || ''}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                  placeholder="Nhập phiên bản"
                />
              </div>
              <div>
                <Label htmlFor="parent">Cha</Label>
                <Input
                  id="parent"
                  value={formData.parent || ''}
                  onChange={(e) => setFormData({...formData, parent: e.target.value})}
                  placeholder="Nhập mã cha (nếu có)"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSave}>
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
            Bạn có chắc chắn muốn xóa master data này không? Hành động này không thể hoàn tác.
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Hủy
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (deleteConfirm) {
                  handleDelete(deleteConfirm)
                }
              }}
            >
              Xóa
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Item Dialog */}
      <Dialog open={!!viewingItem} onOpenChange={() => setViewingItem(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết Master Data</DialogTitle>
          </DialogHeader>
          {viewingItem && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {getTypeIcon(viewingItem.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{viewingItem.name}</h3>
                  <p className="text-sm text-slate-600">{viewingItem.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={`text-xs ${getTypeColor(viewingItem.type)}`}>{viewingItem.type}</Badge>
                    <Badge className={`text-xs ${getStatusColor(viewingItem.status)}`}>{viewingItem.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Mã</h4>
                  <p className="text-sm font-mono">{viewingItem.code}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Danh mục</h4>
                  <p className="text-sm">{viewingItem.category}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Phiên bản</h4>
                  <p className="text-sm">{viewingItem.version}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Ngày tạo</h4>
                  <p className="text-sm">{viewingItem.createdDate}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Người tạo</h4>
                  <p className="text-sm">{viewingItem.createdBy}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Người sửa</h4>
                  <p className="text-sm">{viewingItem.modifiedBy}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-slate-700 mb-2">Thuộc tính</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(viewingItem.attributes).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm font-medium text-slate-600 capitalize">{key}:</span>
                        <span className="text-sm text-slate-900">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setViewingItem(null)}>
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </AppLayout>
  )
}