// 📊 Demo Data for WebApp Quản Lý Giám Định Nghiệp Đoàn DC
// Standardized demo data for offline loading and server initialization

export interface DemoOrder {
  id: string
  number: string
  name: string
  description: string
  status: 'PENDING' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  companyId: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
  deadline: string
  progress: number
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
  estimatedValue: number
  actualValue?: number
  location: string
  contactPerson: string
  contactPhone: string
  contactEmail: string
}

export interface DemoCompany {
  id: string
  name: string
  code: string
  email: string
  phone: string
  address: string
  taxCode: string
  website?: string
  industry: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE'
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  createdAt: string
  updatedAt: string
  totalOrders: number
  totalValue: number
  rating: number
}

export interface DemoUser {
  id: string
  email: string
  name: string
  phone: string
  role: 'ADMIN' | 'MANAGER' | 'SUPERVISOR' | 'INSPECTOR' | 'USER'
  department: string
  position: string
  avatar?: string
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  createdAt: string
  updatedAt: string
  lastLogin?: string
  totalOrders: number
  completedOrders: number
  performance: number
}

export interface DemoAsset {
  id: string
  name: string
  code: string
  type: string
  category: string
  brand: string
  model: string
  serialNumber: string
  manufactureDate: string
  purchaseDate: string
  purchasePrice: number
  currentValue: number
  location: string
  status: 'ACTIVE' | 'MAINTENANCE' | 'RETIRED' | 'DISPOSED'
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  lastInspectionDate?: string
  nextInspectionDate: string
  warrantyExpiry?: string
  companyId: string
  createdAt: string
  updatedAt: string
}

export interface DemoReport {
  id: string
  orderNumber: string
  orderId: string
  title: string
  content: string
  summary: string
  conclusion: string
  recommendations: string[]
  status: 'DRAFT' | 'SUBMITTED' | 'REVIEWED' | 'APPROVED' | 'REJECTED'
  inspectorId: string
  reviewerId?: string
  inspectionDate: string
  submissionDate: string
  reviewDate?: string
  approvalDate?: string
  location: string
  weather: string
  temperature: number
  humidity: number
  images: string[]
  attachments: string[]
  createdAt: string
  updatedAt: string
}

export interface DemoTask {
  id: string
  title: string
  description: string
  type: 'INSPECTION' | 'MAINTENANCE' | 'REPAIR' | 'CALIBRATION' | 'TRAINING'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'CANCELLED'
  assignedTo: string
  assignedBy: string
  orderId?: string
  assetId?: string
  dueDate: string
  completedDate?: string
  estimatedHours: number
  actualHours?: number
  location: string
  notes: string
  attachments: string[]
  createdAt: string
  updatedAt: string
}

export interface DemoCertificate {
  id: string
  name: string
  code: string
  type: string
  category: string
  issuer: string
  issueDate: string
  expiryDate: string
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'REVOKED'
  scope: string
  standards: string[]
  accreditedBy: string
  surveillanceFrequency: number
  lastSurveillanceDate?: string
  nextSurveillanceDate: string
  attachments: string[]
  createdAt: string
  updatedAt: string
}

// 🏢 Demo Companies Data
export const demoCompanies: DemoCompany[] = [
  {
    id: 'comp-001',
    name: 'Công ty Cổ phần Điện lực ABC',
    code: 'EVN_ABC',
    email: 'contact@diensabc.vn',
    phone: '02412345678',
    address: '123 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    taxCode: '0101234567',
    website: 'www.diensabc.vn',
    industry: 'Điện lực',
    size: 'LARGE',
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
    totalOrders: 45,
    totalValue: 2500000000,
    rating: 4.8
  },
  {
    id: 'comp-002',
    name: 'Tổng Công ty Công nghiệp Xi măng Việt Nam',
    code: 'VICEM_HAI',
    email: 'info@vicemhai.vn',
    phone: '02513861234',
    address: '456 Lê Lợi, TP. Hải Dương',
    taxCode: '0201234567',
    website: 'www.vicemhai.vn',
    industry: 'Xi măng',
    size: 'ENTERPRISE',
    status: 'ACTIVE',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-19T14:20:00Z',
    totalOrders: 32,
    totalValue: 1800000000,
    rating: 4.6
  },
  {
    id: 'comp-003',
    name: 'Công ty TNHH Kỹ thuật Nhiệt Điện',
    code: 'NHIETDIEN_TECH',
    email: 'support@nhietdientech.com',
    phone: '02838765432',
    address: '789 Cộng Hòa, Tân Bình, TP.HCM',
    taxCode: '0301234567',
    industry: 'Nhiệt điện',
    size: 'MEDIUM',
    status: 'ACTIVE',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-18T09:15:00Z',
    totalOrders: 28,
    totalValue: 1200000000,
    rating: 4.5
  },
  {
    id: 'comp-004',
    name: 'Công ty Cổ phần Thép Hòa Phát',
    code: 'HPG_STEEL',
    email: 'cs@hoaphat.com.vn',
    phone: '02435678901',
    address: '321 Phạm Văn Đồng, Từ Liêm, Hà Nội',
    taxCode: '0401234567',
    website: 'www.hoaphat.com.vn',
    industry: 'Thép',
    size: 'ENTERPRISE',
    status: 'ACTIVE',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-17T16:45:00Z',
    totalOrders: 56,
    totalValue: 3200000000,
    rating: 4.9
  },
  {
    id: 'comp-005',
    name: 'Công ty TNHH MTV Cơ khí Chính xác',
    code: 'CHKINH_XAC',
    email: 'info@chkinhxac.vn',
    phone: '04137894567',
    address: '654 Trần Phú, TP. Đà Nẵng',
    taxCode: '0501234567',
    industry: 'Cơ khí',
    size: 'SMALL',
    status: 'ACTIVE',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-16T11:30:00Z',
    totalOrders: 15,
    totalValue: 450000000,
    rating: 4.3
  }
]

// 👥 Demo Users Data
export const demoUsers: DemoUser[] = [
  {
    id: 'user-001',
    email: 'admin@eaip.vn',
    name: 'Nguyễn Văn Admin',
    phone: '0901234567',
    role: 'ADMIN',
    department: 'IT',
    position: 'System Administrator',
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T08:00:00Z',
    lastLogin: '2024-01-20T07:30:00Z',
    totalOrders: 0,
    completedOrders: 0,
    performance: 100
  },
  {
    id: 'user-002',
    email: 'manager@eaip.vn',
    name: 'Trần Thị Manager',
    phone: '0902345678',
    role: 'MANAGER',
    department: 'Operations',
    position: 'Operations Manager',
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T07:45:00Z',
    lastLogin: '2024-01-20T07:00:00Z',
    totalOrders: 0,
    completedOrders: 0,
    performance: 95
  },
  {
    id: 'user-003',
    email: 'supervisor@eaip.vn',
    name: 'Lê Văn Supervisor',
    phone: '0903456789',
    role: 'SUPERVISOR',
    department: 'Inspection',
    position: 'Senior Inspector',
    status: 'ACTIVE',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-19T17:30:00Z',
    lastLogin: '2024-01-19T16:45:00Z',
    totalOrders: 25,
    completedOrders: 23,
    performance: 92
  },
  {
    id: 'user-004',
    email: 'inspector1@eaip.vn',
    name: 'Phạm Thị Inspector',
    phone: '0904567890',
    role: 'INSPECTOR',
    department: 'Inspection',
    position: 'Inspector',
    status: 'ACTIVE',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-20T06:30:00Z',
    lastLogin: '2024-01-20T06:00:00Z',
    totalOrders: 18,
    completedOrders: 16,
    performance: 89
  },
  {
    id: 'user-005',
    email: 'inspector2@eaip.vn',
    name: 'Hoàng Văn Inspector',
    phone: '0905678901',
    role: 'INSPECTOR',
    department: 'Inspection',
    position: 'Inspector',
    status: 'ACTIVE',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-19T15:20:00Z',
    lastLogin: '2024-01-19T14:30:00Z',
    totalOrders: 22,
    completedOrders: 20,
    performance: 91
  }
]

// 📋 Demo Orders Data
export const demoOrders: DemoOrder[] = [
  {
    id: 'order-001',
    number: 'ORD-2024-001',
    name: 'Giám định máy phát điện 1250KVA',
    description: 'Kiểm tra, đo lường và đánh giá tình trạng kỹ thuật của máy phát điện Caterpillar 1250KVA tại nhà máy điện lực ABC',
    status: 'COMPLETED',
    priority: 'HIGH',
    companyId: 'comp-001',
    assignedTo: 'user-003',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-18T16:30:00Z',
    deadline: '2024-01-20T17:00:00Z',
    progress: 100,
    risk: 'MEDIUM',
    estimatedValue: 85000000,
    actualValue: 82000000,
    location: 'Nhà máy Điện lực ABC, Hà Nội',
    contactPerson: 'Nguyễn Văn Nam',
    contactPhone: '0912345678',
    contactEmail: 'namnv@diensabc.vn'
  },
  {
    id: 'order-002',
    number: 'ORD-2024-002',
    name: 'Kiểm tra hệ thống điện nhà máy xi măng',
    description: 'Giám định toàn bộ hệ thống điện trung và hạ thế tại nhà máy xi măng VICEM Hải Dương',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    companyId: 'comp-002',
    assignedTo: 'user-004',
    createdAt: '2024-01-08T09:00:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
    deadline: '2024-01-25T17:00:00Z',
    progress: 65,
    risk: 'HIGH',
    estimatedValue: 120000000,
    location: 'Nhà máy Xi măng VICEM, Hải Dương',
    contactPerson: 'Trần Thị Bình',
    contactPhone: '0923456789',
    contactEmail: 'binhtt@vicemhai.vn'
  },
  {
    id: 'order-003',
    number: 'ORD-2024-003',
    name: 'Giám định thiết bị nâng nhà máy thép',
    description: 'Kiểm tra và chứng nhận an toàn cho các thiết bị nâng: cầu trục, tời điện tại nhà máy thép Hòa Phát',
    status: 'APPROVED',
    priority: 'HIGH',
    companyId: 'comp-004',
    assignedTo: 'user-005',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-19T14:20:00Z',
    deadline: '2024-01-30T17:00:00Z',
    progress: 30,
    risk: 'MEDIUM',
    estimatedValue: 95000000,
    location: 'Nhà máy Thép Hòa Phát, Hà Nội',
    contactPerson: 'Lê Văn Cường',
    contactPhone: '0934567890',
    contactEmail: 'cuonglv@hoaphat.com.vn'
  },
  {
    id: 'order-004',
    number: 'ORD-2024-004',
    name: 'Đo lường hệ thống điều khiển nhiệt điện',
    description: 'Hiệu chỉnh và đo lường hệ thống điều khiển tự động tại nhà máy nhiệt điện',
    status: 'PENDING',
    priority: 'MEDIUM',
    companyId: 'comp-003',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
    deadline: '2024-02-05T17:00:00Z',
    progress: 0,
    risk: 'LOW',
    estimatedValue: 75000000,
    location: 'Nhà máy Nhiệt điện, TP.HCM',
    contactPerson: 'Phạm Thị Dung',
    contactPhone: '0945678901',
    contactEmail: 'dungpt@nhietdientech.com'
  },
  {
    id: 'order-005',
    number: 'ORD-2024-005',
    name: 'Kiểm tra máy công cụ cơ khí chính xác',
    description: 'Giám định độ chính xác và tình trạng kỹ thuật các máy công cụ CNC tại xưởng cơ khí',
    status: 'COMPLETED',
    priority: 'LOW',
    companyId: 'comp-005',
    assignedTo: 'user-004',
    createdAt: '2024-01-12T13:00:00Z',
    updatedAt: '2024-01-17T15:45:00Z',
    deadline: '2024-01-18T17:00:00Z',
    progress: 100,
    risk: 'LOW',
    estimatedValue: 45000000,
    actualValue: 43000000,
    location: 'Xưởng Cơ khí Chính xác, Đà Nẵng',
    contactPerson: 'Hoàng Văn Em',
    contactPhone: '0956789012',
    contactEmail: 'emhv@chkinhxac.vn'
  }
]

// 🏗️ Demo Assets Data
export const demoAssets: DemoAsset[] = [
  {
    id: 'asset-001',
    name: 'Máy phát điện Caterpillar 1250KVA',
    code: 'MD-001-CAT-1250',
    type: 'Máy phát điện',
    category: 'Thiết bị điện',
    brand: 'Caterpillar',
    model: 'C175-20',
    serialNumber: 'CAT2024001',
    manufactureDate: '2020-03-15',
    purchaseDate: '2020-06-01',
    purchasePrice: 2500000000,
    currentValue: 1875000000,
    location: 'Nhà máy Điện lực ABC',
    status: 'ACTIVE',
    condition: 'GOOD',
    lastInspectionDate: '2024-01-18',
    nextInspectionDate: '2024-07-18',
    warrantyExpiry: '2025-03-15',
    companyId: 'comp-001',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-18T16:30:00Z'
  },
  {
    id: 'asset-002',
    name: 'Cầu trục 10 tấn',
    code: 'CT-002-10T',
    type: 'Thiết bị nâng',
    category: 'Thiết bị nâng',
    brand: 'KONE',
    model: 'KCR-10',
    serialNumber: 'KON2024002',
    manufactureDate: '2019-08-20',
    purchaseDate: '2019-11-01',
    purchasePrice: 850000000,
    currentValue: 637500000,
    location: 'Nhà máy Thép Hòa Phát',
    status: 'ACTIVE',
    condition: 'FAIR',
    lastInspectionDate: '2024-01-10',
    nextInspectionDate: '2024-04-10',
    warrantyExpiry: '2024-08-20',
    companyId: 'comp-004',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-10T14:20:00Z'
  },
  {
    id: 'asset-003',
    name: 'Máy CNC DMG Mori',
    code: 'CNC-003-DMG',
    type: 'Máy công cụ',
    category: 'Cơ khí chính xác',
    brand: 'DMG Mori',
    model: 'DMU 50',
    serialNumber: 'DMG2024003',
    manufactureDate: '2021-05-10',
    purchaseDate: '2021-08-01',
    purchasePrice: 1200000000,
    currentValue: 960000000,
    location: 'Xưởng Cơ khí Chính xác',
    status: 'ACTIVE',
    condition: 'EXCELLENT',
    lastInspectionDate: '2024-01-17',
    nextInspectionDate: '2024-07-17',
    warrantyExpiry: '2026-05-10',
    companyId: 'comp-005',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-17T15:45:00Z'
  }
]

// 📊 Demo Reports Data
export const demoReports: DemoReport[] = [
  {
    id: 'report-001',
    orderNumber: 'ORD-2024-001',
    orderId: 'order-001',
    title: 'Báo cáo giám định máy phát điện Caterpillar 1250KVA',
    content: 'Kết quả kiểm tra chi tiết máy phát điện... (nội dung đầy đủ)',
    summary: 'Máy phát điện hoạt động tốt, các thông số kỹ thuật trong giới hạn cho phép',
    conclusion: 'Đạt yêu cầu kỹ thuật, tiếp tục vận hành',
    recommendations: [
      'Thực hiện bảo dưỡng định kỳ theo khuyến nghị nhà sản xuất',
      'Theo dõi nhiệt độ dầu và nước làm mát',
      'Kiểm tra hệ thống nhiên liệu hàng tháng'
    ],
    status: 'APPROVED',
    inspectorId: 'user-003',
    reviewerId: 'user-002',
    inspectionDate: '2024-01-18',
    submissionDate: '2024-01-18T16:30:00Z',
    reviewDate: '2024-01-19T09:00:00Z',
    approvalDate: '2024-01-19T14:00:00Z',
    location: 'Nhà máy Điện lực ABC, Hà Nội',
    weather: 'Nắng, nhiệt độ 25°C',
    temperature: 25,
    humidity: 65,
    images: ['img001.jpg', 'img002.jpg', 'img003.jpg'],
    attachments: ['report001.pdf', 'measurements.xlsx'],
    createdAt: '2024-01-18T16:30:00Z',
    updatedAt: '2024-01-19T14:00:00Z'
  },
  {
    id: 'report-002',
    orderNumber: 'ORD-2024-005',
    orderId: 'order-005',
    title: 'Báo cáo kiểm tra máy công cụ CNC',
    content: 'Kết quả đo lường độ chính xác máy CNC... (nội dung đầy đủ)',
    summary: 'Máy CNC hoạt động tốt, độ chính xác đạt yêu cầu',
    conclusion: 'Đạt tiêu chuẩn ISO 9001:2015',
    recommendations: [
      'Hiệu chỉnh lại trục Z sau 1000 giờ vận hành',
      'Vệ sinh hệ thống trượt trục định kỳ',
      'Cập nhật phần mềm điều khiển phiên bản mới nhất'
    ],
    status: 'APPROVED',
    inspectorId: 'user-004',
    reviewerId: 'user-002',
    inspectionDate: '2024-01-17',
    submissionDate: '2024-01-17T15:45:00Z',
    reviewDate: '2024-01-18T10:00:00Z',
    approvalDate: '2024-01-18T15:00:00Z',
    location: 'Xưởng Cơ khí Chính xác, Đà Nẵng',
    weather: 'Có mây, nhiệt độ 28°C',
    temperature: 28,
    humidity: 70,
    images: ['cnc001.jpg', 'cnc002.jpg'],
    attachments: ['cnc_report002.pdf'],
    createdAt: '2024-01-17T15:45:00Z',
    updatedAt: '2024-01-18T15:00:00Z'
  }
]

// 📋 Demo Tasks Data
export const demoTasks: DemoTask[] = [
  {
    id: 'task-001',
    title: 'Chuẩn bị thiết bị đo lường',
    description: 'Kiểm tra và hiệu chuẩn các thiết bị đo lường cho order ORD-2024-002',
    type: 'INSPECTION',
    priority: 'HIGH',
    status: 'COMPLETED',
    assignedTo: 'user-004',
    assignedBy: 'user-003',
    orderId: 'order-002',
    dueDate: '2024-01-19T17:00:00Z',
    completedDate: '2024-01-19T15:30:00Z',
    estimatedHours: 4,
    actualHours: 3.5,
    location: 'Văn phòng EAIP',
    notes: 'Thiết bị đã được hiệu chuẩn và sẵn sàng',
    attachments: ['equipment_checklist.pdf'],
    createdAt: '2024-01-18T08:00:00Z',
    updatedAt: '2024-01-19T15:30:00Z'
  },
  {
    id: 'task-002',
    title: 'Lập kế hoạch giám định',
    description: 'Phân công nhân sự và lập lịch trình cho order ORD-2024-003',
    type: 'PLANNING',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    assignedTo: 'user-003',
    assignedBy: 'user-002',
    orderId: 'order-003',
    dueDate: '2024-01-22T17:00:00Z',
    estimatedHours: 6,
    location: 'Văn phòng EAIP',
    notes: 'Đang chờ xác nhận từ khách hàng',
    attachments: [],
    createdAt: '2024-01-19T09:00:00Z',
    updatedAt: '2024-01-20T08:30:00Z'
  },
  {
    id: 'task-003',
    title: 'Bảo dưỡng máy phát điện',
    description: 'Thực hiện bảo dưỡng định kỳ máy phát điện tại nhà máy điện lực',
    type: 'MAINTENANCE',
    priority: 'MEDIUM',
    status: 'TODO',
    assignedTo: 'user-005',
    assignedBy: 'user-002',
    assetId: 'asset-001',
    dueDate: '2024-01-25T17:00:00Z',
    estimatedHours: 8,
    location: 'Nhà máy Điện lực ABC',
    notes: 'Cần chuẩn bị vật tư và phụ tùng thay thế',
    attachments: ['maintenance_manual.pdf'],
    createdAt: '2024-01-20T07:00:00Z',
    updatedAt: '2024-01-20T07:00:00Z'
  }
]

// 📜 Demo Certificates Data
export const demoCertificates: DemoCertificate[] = [
  {
    id: 'cert-001',
    name: 'Chứng chỉ Giám định viên Cấp 1',
    code: 'GV-001-2024',
    type: 'Chứng chỉ năng lực',
    category: 'Giám định',
    issuer: 'Bộ Khoa học và Công nghệ',
    issueDate: '2024-01-01',
    expiryDate: '2029-01-01',
    status: 'ACTIVE',
    scope: 'Giám định thiết bị điện, thiết bị nâng',
    standards: ['ISO/IEC 17020:2012', 'TCVN 8595:2012'],
    accreditedBy: 'BoA',
    surveillanceFrequency: 12,
    lastSurveillanceDate: '2024-01-01',
    nextSurveillanceDate: '2025-01-01',
    attachments: ['cert-001.pdf'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cert-002',
    name: 'Chứng chỉ Hệ thống quản lý chất lượng ISO 9001',
    code: 'ISO-9001-2024',
    type: 'Chứng chỉ hệ thống',
    category: 'Quản lý chất lượng',
    issuer: 'Bureau Veritas',
    issueDate: '2024-01-15',
    expiryDate: '2027-01-15',
    status: 'ACTIVE',
    scope: 'Cung cấp dịch vụ giám định kỹ thuật',
    standards: ['ISO 9001:2015'],
    accreditedBy: 'UKAS',
    surveillanceFrequency: 12,
    lastSurveillanceDate: '2024-01-15',
    nextSurveillanceDate: '2025-01-15',
    attachments: ['iso-9001-cert.pdf'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
]

// 📊 Demo Statistics Data
export const demoStats = {
  overview: {
    totalOrders: 156,
    completedOrders: 89,
    pendingOrders: 32,
    inProgressOrders: 25,
    cancelledOrders: 10,
    totalCompanies: 45,
    activeUsers: 28,
    totalAssets: 234,
    totalReports: 178,
    totalRevenue: 2850000000,
    monthlyGrowth: 12.5
  },
  monthlyData: [
    { month: '2023-08', orders: 12, revenue: 180000000 },
    { month: '2023-09', orders: 15, revenue: 225000000 },
    { month: '2023-10', orders: 18, revenue: 270000000 },
    { month: '2023-11', orders: 22, revenue: 330000000 },
    { month: '2023-12', orders: 28, revenue: 420000000 },
    { month: '2024-01', orders: 35, revenue: 525000000 }
  ],
  orderStatusDistribution: [
    { status: 'COMPLETED', count: 89, percentage: 57.1 },
    { status: 'IN_PROGRESS', count: 25, percentage: 16.0 },
    { status: 'PENDING', count: 32, percentage: 20.5 },
    { status: 'CANCELLED', count: 10, percentage: 6.4 }
  ],
  priorityDistribution: [
    { priority: 'CRITICAL', count: 15, percentage: 9.6 },
    { priority: 'HIGH', count: 45, percentage: 28.8 },
    { priority: 'MEDIUM', count: 68, percentage: 43.6 },
    { priority: 'LOW', count: 28, percentage: 17.9 }
  ],
  topPerformers: [
    { userId: 'user-003', name: 'Lê Văn Supervisor', completedOrders: 23, performance: 92 },
    { userId: 'user-005', name: 'Hoàng Văn Inspector', completedOrders: 20, performance: 91 },
    { userId: 'user-004', name: 'Phạm Thị Inspector', completedOrders: 16, performance: 89 }
  ]
}

// 📦 Export all demo data
export const demoData = {
  companies: demoCompanies,
  users: demoUsers,
  orders: demoOrders,
  assets: demoAssets,
  reports: demoReports,
  tasks: demoTasks,
  certificates: demoCertificates,
  stats: demoStats
}

// 🔄 Function to load demo data into database
export async function loadDemoData() {
  try {
    // This function will be used to seed the database
    // Implementation will depend on your database setup
    console.log('Loading demo data...')
    
    // Load companies
    console.log(`Loading ${demoCompanies.length} companies...`)
    
    // Load users
    console.log(`Loading ${demoUsers.length} users...`)
    
    // Load orders
    console.log(`Loading ${demoOrders.length} orders...`)
    
    // Load assets
    console.log(`Loading ${demoAssets.length} assets...`)
    
    // Load reports
    console.log(`Loading ${demoReports.length} reports...`)
    
    // Load tasks
    console.log(`Loading ${demoTasks.length} tasks...`)
    
    // Load certificates
    console.log(`Loading ${demoCertificates.length} certificates...`)
    
    console.log('Demo data loaded successfully!')
    return true
  } catch (error) {
    console.error('Error loading demo data:', error)
    return false
  }
}

export default demoData