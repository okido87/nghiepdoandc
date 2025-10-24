'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AppLayout } from '@/components/app-layout'
import { 
  Edit, 
  CheckCircle, 
  Download, 
  Calendar,
  Building,
  User,
  MapPin,
  Phone,
  Mail,
  FileText,
  Clock,
  TrendingUp,
  ArrowLeft,
  Home,
  Eye,
  Camera,
  Upload,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'

interface Asset {
  id: number
  name: string
  type: string
  location: string
  status: 'Chưa giám định' | 'Đang giám định' | 'Hoàn thành' | 'Có vấn đề'
  progress: number
  inspectionDate?: string
  inspector?: string
  images?: string[]
  description?: string
  reportNotes?: string
}

interface Order {
  id: number
  number: string
  name: string
  company: string
  status: 'Yêu cầu mới' | 'Khảo sát' | 'Báo cáo khảo sát' | 'Lên báo giá' | 'Ký hợp đồng' | 'Quyết định thành lập tổ giám định' | 'Gửi công văn thông báo kế hoạch giám định' | 'Thực hiện giám định hiện trường' | 'Báo cáo giám định' | 'Dự thảo chứng thư giám định' | 'Gửi dự thảo chứng thư' | 'Khách hàng duyệt chứng thư' | 'Nghiệm thu khối lượng' | 'Đề nghị thanh toán' | 'Hoàn thành' | 'Đã thanh toán' | 'Yêu cầu hủy' | 'Đã hủy'
  inspector: string
  createdDate: string
  deadline: string
  value: string
  type: string
  priority: 'Cao' | 'Trung bình' | 'Thấp'
  progress: number
  description: string
  assetCount: number
  reportCount: number
  address: string
  phone: string
  email: string
  branch?: string
  branchCode?: string
  assets?: Asset[]
}

interface RASCIItem {
  id: number
  name: string
  r: boolean
  a: boolean
  s: boolean
  c: boolean
  i: boolean
}

const mockOrder: Order = {
  id: 1,
  number: 'ORD-2024-001',
  name: 'Giám định máy phát điện 1500KVA',
  company: 'Công ty Điện lực ABC',
  status: 'Thực hiện giám định hiện trường',
  inspector: 'Nguyễn Văn An',
  createdDate: '2024-01-10',
  deadline: '2024-01-20',
  value: '15,000,000 VNĐ',
  type: 'Thiết bị điện',
  priority: 'Cao',
  progress: 65,
  description: 'Kiểm tra tình trạng hoạt động và hiệu suất của máy phát điện chính tại nhà máy',
  assetCount: 10,
  reportCount: 12,
  address: '123 Nguyễn Huệ, Q.1, TP.HCM',
  phone: '028 3821 2345',
  email: 'contact@dienlucabc.vn',
  branch: 'Chi nhánh TP.HCM',
  branchCode: 'HCM001',
  assets: [
    {
      id: 1,
      name: 'Máy phát điện 1500KVA',
      type: 'Thiết bị chính',
      location: 'Phòng máy A',
      status: 'Hoàn thành',
      progress: 100,
      inspectionDate: '2024-01-15',
      inspector: 'Nguyễn Văn An',
      images: ['image1.jpg', 'image2.jpg'],
      description: 'Tình trạng hoạt động tốt, các thông số trong giới hạn cho phép',
      reportNotes: 'Kiểm tra hoàn tất, thiết bị sẵn sàng vận hành'
    },
    {
      id: 2,
      name: 'Tủ điều khiển ATS',
      type: 'Thiết bị điều khiển',
      location: 'Phòng điều khiển',
      status: 'Đang giám định',
      progress: 60,
      inspectionDate: '2024-01-16',
      inspector: 'Trần Thị Bình',
      images: ['image3.jpg'],
      description: 'Đang kiểm tra các relay và bộ chuyển mạch',
      reportNotes: 'Cần kiểm tra thêm bộ sạc bình'
    },
    {
      id: 3,
      name: 'Hệ thống làm mát',
      type: 'Hệ thống phụ trợ',
      location: 'Máy nhà A',
      status: 'Có vấn đề',
      progress: 40,
      inspectionDate: '2024-01-16',
      inspector: 'Lê Văn Cường',
      images: ['image4.jpg', 'image5.jpg'],
      description: 'Máy bơm nước làm mát có tiếng ồn bất thường',
      reportNotes: 'Cần thay thế vòng bi máy bơm'
    },
    {
      id: 4,
      name: 'Bình chứa nhiên liệu',
      type: 'Hệ thống nhiên liệu',
      location: 'Nhà chứa nhiên liệu',
      status: 'Chưa giám định',
      progress: 0,
      inspectionDate: undefined,
      inspector: undefined,
      images: [],
      description: '',
      reportNotes: ''
    },
    {
      id: 5,
      name: 'Hệ thống xả khí',
      type: 'Hệ thống phụ trợ',
      location: 'Máy nhà A',
      status: 'Hoàn thành',
      progress: 100,
      inspectionDate: '2024-01-14',
      inspector: 'Phạm Thị Dung',
      images: ['image6.jpg'],
      description: 'Hệ thống ống xả và giảm thanh hoạt động tốt',
      reportNotes: 'Kiểm tra hoàn tất, không có rò rỉ'
    },
    {
      id: 6,
      name: 'Máy biến áp bước xuống',
      type: 'Thiết bị điện',
      location: 'Trạm biến áp',
      status: 'Đang giám định',
      progress: 75,
      inspectionDate: '2024-01-17',
      inspector: 'Hoàng Văn Em',
      images: ['image7.jpg', 'image8.jpg'],
      description: 'Kiểm tra cuộn dây và cách điện',
      reportNotes: 'Nạp dầu cách điện và kiểm tra nhiệt độ'
    },
    {
      id: 7,
      name: 'Hệ thống khởi động',
      type: 'Thiết bị khởi động',
      location: 'Phòng máy A',
      status: 'Hoàn thành',
      progress: 100,
      inspectionDate: '2024-01-13',
      inspector: 'Đỗ Thị Giang',
      images: ['image9.jpg'],
      description: 'Bộ sạc ắc quy và motor khởi động hoạt động bình thường',
      reportNotes: 'Thay thế ắc quy cũ, kiểm tra hoàn tất'
    },
    {
      id: 8,
      name: 'Tủ điện phân phối',
      type: 'Tủ điện',
      location: 'Phòng điện lực',
      status: 'Có vấn đề',
      progress: 30,
      inspectionDate: '2024-01-16',
      inspector: 'Vũ Văn Hùng',
      images: ['image10.jpg'],
      description: 'Một số cầu chì bị quá tải',
      reportNotes: 'Cần thay thế cầu chì và kiểm tra tải'
    },
    {
      id: 9,
      name: 'Hệ thống grounding',
      type: 'Hệ thống an toàn',
      location: 'Sân ngoài trời',
      status: 'Chưa giám định',
      progress: 0,
      inspectionDate: undefined,
      inspector: undefined,
      images: [],
      description: '',
      reportNotes: ''
    },
    {
      id: 10,
      name: 'Van an toàn',
      type: 'Thiết bị an toàn',
      location: 'Đường ống chính',
      status: 'Đang giám định',
      progress: 50,
      inspectionDate: '2024-01-17',
      inspector: 'Bùi Thị Lan',
      images: ['image11.jpg'],
      description: 'Kiểm tra áp suất hoạt động của van',
      reportNotes: 'Van hoạt động đúng áp suất thiết kế'
    }
  ]
}

const mockRASCI: RASCIItem[] = [
  { id: 1, name: 'Nguyễn Văn An', r: true, a: false, s: false, c: false, i: false },
  { id: 2, name: 'Trần Thị Bình', r: false, a: true, s: false, c: false, i: false },
  { id: 3, name: 'Lê Văn Cường', r: false, a: false, s: true, c: false, i: false },
  { id: 4, name: 'Phạm Thị Dung', r: false, a: false, s: false, c: true, i: false },
  { id: 5, name: 'Hoàng Văn Em', r: false, a: false, s: false, c: false, i: true },
]

const mockOrdersList: Order[] = [
  { id: 1, number: 'ORD-2024-001', name: 'Giám định máy phát điện 1500KVA', company: 'Công ty Điện lực ABC', status: 'Thực hiện giám định hiện trường', inspector: 'Nguyễn Văn An', createdDate: '2024-01-10', deadline: '2024-01-20', value: '15,000,000 VNĐ', type: 'Thiết bị điện', priority: 'Cao', progress: 65, description: 'Kiểm tra tình trạng hoạt động và hiệu suất của máy phát điện chính tại nhà máy', assetCount: 5, reportCount: 12, address: '123 Nguyễn Huệ, Q.1, TP.HCM', phone: '028 3821 2345', email: 'contact@dienlucabc.vn', branch: 'Chi nhánh TP.HCM', branchCode: 'HCM001' },
  { id: 2, number: 'ORD-2024-002', name: 'Kiểm tra hệ thống điện nhà xưởng', company: 'Công ty XYZ Manufacturing', status: 'Báo cáo khảo sát', inspector: 'Trần Thị Bình', createdDate: '2024-01-12', deadline: '2024-01-25', value: '8,500,000 VNĐ', type: 'Hệ thống điện', priority: 'Trung bình', progress: 40, description: 'Đánh giá an toàn hệ thống điện', assetCount: 8, reportCount: 6, address: '456 Lê Lợi, Q.3, TP.HCM', phone: '028 3822 3456', email: 'info@xyz.vn', branch: 'Chi nhánh TP.HCM', branchCode: 'HCM001' },
  { id: 3, number: 'ORD-2024-003', name: 'Giám định thiết bị nâng', company: 'Công ty Cơ khí DEF', status: 'Hoàn thành', inspector: 'Lê Văn Cường', createdDate: '2024-01-14', deadline: '2024-01-30', value: '12,000,000 VNĐ', type: 'Thiết bị nâng', priority: 'Cao', progress: 100, description: 'Kiểm tra cần trục và thiết bị nâng', assetCount: 3, reportCount: 8, address: '789 Võ Văn Kiệt, Q.5, TP.HCM', phone: '028 3823 4567', email: 'def@co-khi.vn', branch: 'Chi nhánh TP.HCM', branchCode: 'HCM001' },
  { id: 4, number: 'ORD-2024-004', name: 'Đo lường hệ thống chống sét', company: 'Tòa nhà Landmark 81', status: 'Khách hàng duyệt chứng thư', inspector: 'Phạm Thị Dung', createdDate: '2024-01-08', deadline: '2024-01-15', value: '25,000,000 VNĐ', type: 'Hệ thống chống sét', priority: 'Cao', progress: 85, description: 'Kiểm tra hệ thống tiếp đất và chống sét', assetCount: 12, reportCount: 24, address: '720 Điện Biên Phủ, Q.3, TP.HCM', phone: '028 3824 5678', email: 'landmark81@example.com', branch: 'Chi nhánh TP.HCM', branchCode: 'HCM001' },
  { id: 5, number: 'ORD-2024-005', name: 'Giám định hệ thống PCCC', company: 'Trung tâm thương mại Vincom', status: 'Gửi công văn thông báo kế hoạch giám định', inspector: 'Hoàng Văn Em', createdDate: '2024-01-15', deadline: '2024-02-01', value: '18,000,000 VNĐ', type: 'PCCC', priority: 'Cao', progress: 30, description: 'Kiểm tra hệ thống phòng cháy chữa cháy', assetCount: 15, reportCount: 18, address: '72 Lê Thánh Tôn, Q.1, TP.HCM', phone: '028 3825 6789', email: 'vincom@example.com', branch: 'Chi nhánh TP.HCM', branchCode: 'HCM001' },
  { id: 6, number: 'ORD-2024-006', name: 'Kiểm tra máy biến áp', company: 'Nhà máy Thép Hòa Phát', status: 'Đã thanh toán', inspector: 'Đỗ Thị Giang', createdDate: '2024-01-05', deadline: '2024-01-12', value: '20,000,000 VNĐ', type: 'Thiết bị điện', priority: 'Trung bình', progress: 100, description: 'Bảo dưỡng máy biến áp 500KVA', assetCount: 4, reportCount: 10, address: 'Khu công nghiệp Hòa Phát, Hải Dương', phone: '0220 3826 7890', email: 'hoaphat@example.com', branch: 'Chi nhánh Hà Nội', branchCode: 'HN001' },
  { id: 7, number: 'ORD-2024-007', name: 'Giám định đường dây tải điện', company: 'Tập đoàn Điện lực Việt Nam', status: 'Lên báo giá', inspector: 'Vũ Văn Hùng', createdDate: '2024-01-16', deadline: '2024-02-05', value: '35,000,000 VNĐ', type: 'Hệ thống truyền tải', priority: 'Cao', progress: 15, description: 'Kiểm tra đường dây 110kV', assetCount: 20, reportCount: 15, address: '386 Trần Hưng Đạo, Q.5, TP.HCM', phone: '028 3827 8901', email: 'evn@example.com', branch: 'Chi nhánh TP.HCM', branchCode: 'HCM001' },
  { id: 8, number: 'ORD-2024-008', name: 'Kiểm tra hệ thống chiếu sáng', company: 'Sân bay Nội Bài', status: 'Báo cáo giám định', inspector: 'Bùi Thị Lan', createdDate: '2024-01-13', deadline: '2024-01-28', value: '10,000,000 VNĐ', type: 'Hệ thống chiếu sáng', priority: 'Trung bình', progress: 70, description: 'Kiểm tra hệ thống đèn đường băng', assetCount: 50, reportCount: 30, address: 'Sân bay Nội Bài, Hà Nội', phone: '024 3828 9012', email: 'noibai@example.com', branch: 'Chi nhánh Hà Nội', branchCode: 'HN001' },
  { id: 9, number: 'ORD-2024-009', name: 'Giám định tủ điện', company: 'Khu công nghiệp Sóng Thần', status: 'Nghiệm thu khối lượng', inspector: 'Cao Văn Minh', createdDate: '2024-01-09', deadline: '2024-01-18', value: '6,000,000 VNĐ', type: 'Tủ điện', priority: 'Thấp', progress: 90, description: 'Kiểm tra tủ điện phân phối', assetCount: 6, reportCount: 8, address: 'Khu công nghiệp Sóng Thần, Bình Dương', phone: '0274 3829 0123', email: 'songthan@example.com', branch: 'Chi nhánh Bình Dương', branchCode: 'BD001' },
  { id: 10, number: 'ORD-2024-010', name: 'Kiểm tra máy phát điện dự phòng', company: 'Bệnh viện Chợ Rẫy', status: 'Dự thảo chứng thư giám định', inspector: 'Dương Thị Nga', createdDate: '2024-01-17', deadline: '2024-02-03', value: '14,000,000 VNĐ', type: 'Máy phát điện', priority: 'Cao', progress: 50, description: 'Bảo dưỡng máy phát điện 500KVA', assetCount: 2, reportCount: 6, address: '201B Nguyễn Chí Thanh, Q.5, TP.HCM', phone: '028 3830 1234', email: 'choray@example.com', branch: 'Chi nhánh TP.HCM', branchCode: 'HCM001' },
  { id: 11, number: 'ORD-2024-011', name: 'Giám định hệ thống grounding', company: 'Nhà máy Samsung Bắc Ninh', status: 'Đề nghị thanh toán', inspector: 'Đinh Văn Phát', createdDate: '2024-01-07', deadline: '2024-01-14', value: '9,000,000 VNĐ', type: 'Hệ thống tiếp đất', priority: 'Trung bình', progress: 95, description: 'Đo điện trở tiếp đất', assetCount: 8, reportCount: 12, address: 'Khu công nghiệp Yên Phong, Bắc Ninh', phone: '0222 3831 2345', email: 'samsung@example.com' },
  { id: 12, number: 'ORD-2024-012', name: 'Kiểm tra UPS', company: 'Trung tâm dữ liệu FPT', status: 'Gửi dự thảo chứng thư', inspector: 'Gia Thị Quỳnh', createdDate: '2024-01-18', deadline: '2024-02-08', value: '7,500,000 VNĐ', type: 'UPS', priority: 'Trung bình', progress: 55, description: 'Kiểm tra hệ thống UPS 200KVA', assetCount: 3, reportCount: 5, address: 'Tòa nhà FPT, Quận 9, TP.HCM', phone: '028 3832 3456', email: 'fpt@example.com' },
  { id: 13, number: 'ORD-2024-013', name: 'Giám định cầu trục', company: 'Cảng Hải Phòng', status: 'Quyết định thành lập tổ giám định', inspector: 'Hà Văn Sơn', createdDate: '2024-01-11', deadline: '2024-01-26', value: '22,000,000 VNĐ', type: 'Thiết bị nâng', priority: 'Cao', progress: 25, description: 'Kiểm tra cầu trục 50 tấn', assetCount: 5, reportCount: 14, address: 'Cảng Hải Phòng, Hải Phòng', phone: '0225 3833 4567', email: 'haiphong@example.com' },
  { id: 14, number: 'ORD-2024-014', name: 'Kiểm tra hệ thống solar', company: 'Nhà máy Formosa Hà Tĩnh', status: 'Yêu cầu mới', inspector: 'Kiều Thị Trúc', createdDate: '2024-01-06', deadline: '2024-01-13', value: '28,000,000 VNĐ', type: 'Năng lượng mặt trời', priority: 'Trung bình', progress: 5, description: 'Kiểm tra hệ thống solar 5MW', assetCount: 100, reportCount: 45, address: 'Khu kinh tế Vũng Áng, Hà Tĩnh', phone: '0239 3834 5678', email: 'formosa@example.com' },
  { id: 15, number: 'ORD-2024-015', name: 'Giám định thiết bị y tế', company: 'Bệnh viện Bạch Mai', status: 'Khảo sát', inspector: 'Lâm Văn Tài', createdDate: '2024-01-19', deadline: '2024-02-10', value: '16,000,000 VNĐ', type: 'Thiết bị y tế', priority: 'Cao', progress: 10, description: 'Kiểm tra hệ thống điện phòng mổ', assetCount: 4, reportCount: 9, address: '78 Giải Phóng, Đống Đa, Hà Nội', phone: '024 3835 6789', email: 'bachmai@example.com' },
  { id: 16, number: 'ORD-2024-016', name: 'Kiểm tra hệ thống chiếu sáng công cộng', company: 'UBND Quận 1', status: 'Đã hủy', inspector: 'Mai Thị Uyên', createdDate: '2024-01-04', deadline: '2024-01-11', value: '5,000,000 VNĐ', type: 'Chiếu sáng công cộng', priority: 'Thấp', progress: 0, description: 'Bảo dưỡng đèn đường LED', assetCount: 30, reportCount: 20, address: '18 Lê Duẩn, Q.1, TP.HCM', phone: '028 3836 7890', email: 'quan1@example.com' },
  { id: 17, number: 'ORD-2024-017', name: 'Giám định máy biến áp nhỏ', company: 'Trường học THPT Chu Văn An', status: 'Ký hợp đồng', inspector: 'Ngô Văn Vương', createdDate: '2024-01-20', deadline: '2024-02-12', value: '4,000,000 VNĐ', type: 'Thiết bị điện', priority: 'Thấp', progress: 20, description: 'Kiểm tra máy biến áp 100KVA', assetCount: 1, reportCount: 2, address: '208 Nguyễn Huệ, Q.1, TP.HCM', phone: '028 3837 8901', email: 'chuvanan@example.com' },
  { id: 18, number: 'ORD-2024-018', name: 'Kiểm tra hệ thống camera', company: 'Siêu thị Co.opmart', status: 'Yêu cầu hủy', inspector: 'Phan Thị Xuân', createdDate: '2024-01-16', deadline: '2024-01-31', value: '8,000,000 VNĐ', type: 'An ninh', priority: 'Trung bình', progress: 35, description: 'Kiểm tra hệ thống camera giám sát', assetCount: 25, reportCount: 18, address: '265 Bà Huyện Thanh Quan, Q.1, TP.HCM', phone: '028 3838 9012', email: 'coopmart@example.com' },
  { id: 19, number: 'ORD-2024-019', name: 'Giám định thang máy', company: 'Chung cư Vinhomes Golden River', status: 'Hoàn thành', inspector: 'Quách Văn Yến', createdDate: '2024-01-03', deadline: '2024-01-10', value: '11,000,000 VNĐ', type: 'Thang máy', priority: 'Cao', progress: 100, description: 'Kiểm tra an toàn thang máy', assetCount: 8, reportCount: 16, address: '154 Tôn Thất Thuyết, Q.4, TP.HCM', phone: '028 3839 0123', email: 'vinhomes@example.com' },
  { id: 20, number: 'ORD-2024-020', name: 'Kiểm tra hệ thống bơm chữa cháy', company: 'Khu đô thị Phú Mỹ Hưng', status: 'Khảo sát', inspector: 'Tô Thị Ánh', createdDate: '2024-01-21', deadline: '2024-02-15', value: '13,000,000 VNĐ', type: 'PCCC', priority: 'Cao', progress: 8, description: 'Kiểm tra hệ thống bơm chữa cháy tự động', assetCount: 6, reportCount: 11, address: 'Tân Phong, Quận 7, TP.HCM', phone: '028 3840 1234', email: 'phumyhung@example.com' }
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('plan')
  const [rasciData, setRasciData] = useState(mockRASCI)
  const [isDetailMode, setIsDetailMode] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order>(mockOrder)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [orders, setOrders] = useState<Order[]>(mockOrdersList)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  })
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrdersList)
  const [assetSearch, setAssetSearch] = useState('')
  const [newOrder, setNewOrder] = useState<Partial<Order>>({
    number: '',
    name: '',
    company: '',
    status: 'Yêu cầu mới',
    inspector: '',
    createdDate: new Date().toISOString().split('T')[0],
    deadline: '',
    value: '',
    type: '',
    priority: 'Trung bình',
    progress: 0,
    description: '',
    assetCount: 0,
    reportCount: 0,
    address: '',
    phone: '',
    email: ''
  })
  const [reportData, setReportData] = useState({
    description: '',
    images: [] as File[],
    status: 'Chưa giám định' as Asset['status']
  })

  const handleBackToList = () => {
    setIsDetailMode(false)
  }

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailMode(true)
  }

  const handleCreateOrder = () => {
    if (newOrder.name && newOrder.company && newOrder.number) {
      const order: Order = {
        id: Math.max(...orders.map(o => o.id)) + 1,
        number: newOrder.number,
        name: newOrder.name,
        company: newOrder.company,
        status: newOrder.status as Order['status'],
        inspector: newOrder.inspector || '',
        createdDate: newOrder.createdDate || new Date().toISOString().split('T')[0],
        deadline: newOrder.deadline || '',
        value: newOrder.value || '',
        type: newOrder.type || '',
        priority: newOrder.priority as Order['priority'],
        progress: newOrder.progress || 0,
        description: newOrder.description || '',
        assetCount: newOrder.assetCount || 0,
        reportCount: newOrder.reportCount || 0,
        address: newOrder.address || '',
        phone: newOrder.phone || '',
        email: newOrder.email || ''
      }
      const updatedOrders = [...orders, order]
      setOrders(updatedOrders)
      setFilteredOrders(updatedOrders)
      setIsCreateModalOpen(false)
      setNewOrder({
        number: '',
        name: '',
        company: '',
        status: 'Yêu cầu mới',
        inspector: '',
        createdDate: new Date().toISOString().split('T')[0],
        deadline: '',
        value: '',
        type: '',
        priority: 'Trung bình',
        progress: 0,
        description: '',
        assetCount: 0,
        reportCount: 0,
        address: '',
        phone: '',
        email: ''
      })
    }
  }

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order)
    setIsEditModalOpen(true)
  }

  const handleUpdateOrder = () => {
    if (editingOrder) {
      const updatedOrders = orders.map(order => 
        order.id === editingOrder.id ? editingOrder : order
      )
      setOrders(updatedOrders)
      setFilteredOrders(updatedOrders)
      setIsEditModalOpen(false)
      setEditingOrder(null)
    }
  }

  const handleDeleteOrder = (orderId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa order này?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId)
      setOrders(updatedOrders)
      setFilteredOrders(updatedOrders)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    let filtered = [...orders]
    
    if (newFilters.status) {
      filtered = filtered.filter(order => order.status === newFilters.status)
    }
    
    if (newFilters.priority) {
      filtered = filtered.filter(order => order.priority === newFilters.priority)
    }
    
    if (newFilters.search) {
      const searchTerm = newFilters.search.toLowerCase()
      filtered = filtered.filter(order => 
        order.name.toLowerCase().includes(searchTerm) ||
        order.company.toLowerCase().includes(searchTerm) ||
        order.number.toLowerCase().includes(searchTerm)
      )
    }
    
    setFilteredOrders(filtered)
  }

  const handleExport = () => {
    const csvContent = [
      ['Số Order', 'Tên Order', 'Công ty', 'Trạng thái', 'Giám định viên', 'Ngày tạo', 'Hạn chót', 'Giá trị', 'Ưu tiên'],
      ...filteredOrders.map(order => [
        order.number,
        order.name,
        order.company,
        order.status,
        order.inspector,
        order.createdDate,
        order.deadline,
        order.value,
        order.priority
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const groupOrdersByStatus = () => {
    const statusGroups: { [key: string]: Order[] } = {}
    
    filteredOrders.forEach(order => {
      if (!statusGroups[order.status]) {
        statusGroups[order.status] = []
      }
      statusGroups[order.status].push(order)
    })
    
    return statusGroups
  }

  const getFilteredAssets = () => {
    if (!selectedOrder.assets) return []
    
    if (!assetSearch) return selectedOrder.assets
    
    const searchTerm = assetSearch.toLowerCase()
    return selectedOrder.assets.filter(asset =>
      asset.name.toLowerCase().includes(searchTerm) ||
      asset.type.toLowerCase().includes(searchTerm) ||
      asset.location.toLowerCase().includes(searchTerm) ||
      asset.status.toLowerCase().includes(searchTerm)
    )
  }

  const handleOpenReport = (asset: Asset) => {
    setSelectedAsset(asset)
    setReportData({
      description: asset.description || '',
      images: [],
      status: asset.status
    })
    setIsReportModalOpen(true)
  }

  const handleCloseReport = () => {
    setIsReportModalOpen(false)
    setSelectedAsset(null)
    setReportData({
      description: '',
      images: [],
      status: 'Chưa giám định'
    })
  }

  const handleSaveReport = () => {
    if (selectedAsset && selectedOrder.assets) {
      const updatedAssets = selectedOrder.assets.map(asset => 
        asset.id === selectedAsset.id 
          ? { 
              ...asset, 
              description: reportData.description,
              status: reportData.status,
              inspectionDate: new Date().toISOString().split('T')[0],
              inspector: selectedOrder.inspector,
              images: [...(asset.images || []), ...reportData.images.map(img => img.name)],
              reportNotes: reportData.description
            }
          : asset
      )
      
      setSelectedOrder({
        ...selectedOrder,
        assets: updatedAssets
      })
    }
    handleCloseReport()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setReportData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoàn thành': 
      case 'Đã thanh toán': 
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Thực hiện giám định hiện trường': 
      case 'Báo cáo giám định': 
      case 'Dự thảo chứng thư giám định': 
      case 'Gửi dự thảo chứng thư': 
      case 'Khách hàng duyệt chứng thư': 
      case 'Nghiệm thu khối lượng': 
      case 'Đề nghị thanh toán': 
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Khảo sát': 
      case 'Báo cáo khảo sát': 
      case 'Lên báo giá': 
      case 'Quyết định thành lập tổ giám định': 
      case 'Gửi công văn thông báo kế hoạch giám định': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Yêu cầu mới': 
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'Yêu cầu hủy': 
      case 'Đã hủy': 
        return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Cao': return 'bg-red-100 text-red-800 border-red-200'
      case 'Trung bình': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Thấp': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAssetStatusColor = (status: string) => {
    switch (status) {
      case 'Hoàn thành': return 'bg-green-100 text-green-800 border-green-200'
      case 'Đang giám định': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Có vấn đề': return 'bg-red-100 text-red-800 border-red-200'
      case 'Chưa giám định': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const toggleRASCI = (itemId: number, role: keyof RASCIItem) => {
    if (role === 'id' || role === 'name') return
    setRasciData(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, [role]: !item[role] }
        : item
    ))
  }

  // Order List View
  const OrderListView = () => {
    const groupedOrders = groupOrdersByStatus()
    const statusOrder = [
      'Yêu cầu mới',
      'Khảo sát', 
      'Báo cáo khảo sát',
      'Lên báo giá',
      'Ký hợp đồng',
      'Quyết định thành lập tổ giám định',
      'Gửi công văn thông báo kế hoạch giám định',
      'Thực hiện giám định hiện trường',
      'Báo cáo giám định',
      'Dự thảo chứng thư giám định',
      'Gửi dự thảo chứng thư',
      'Khách hàng duyệt chứng thư',
      'Nghiệm thu khối lượng',
      'Đề nghị thanh toán',
      'Hoàn thành',
      'Đã thanh toán',
      'Yêu cầu hủy',
      'Đã hủy'
    ]

    return (
      <div className="space-y-3">
        {/* Header with Integrated Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-[#1A365D]">Quản lý Orders</h1>
          
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
                <option value="Yêu cầu mới">Yêu cầu mới</option>
                <option value="Khảo sát">Khảo sát</option>
                <option value="Thực hiện giám định hiện trường">Thực hiện giám định hiện trường</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
              <select 
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="text-xs p-1 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#3A7BD5] rounded"
              >
                <option value="">Ưu tiên</option>
                <option value="Cao">Cao</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Thấp">Thấp</option>
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
                  setFilters({ status: '', priority: '', search: '' })
                  setFilteredOrders(orders)
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
                <FileText className="w-3 h-3 mr-1" />
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
                  <p className="text-xs text-[#6B7280] mb-0.5">Tổng Orders</p>
                  <p className="text-base font-semibold text-[#1A365D]">{filteredOrders.length}</p>
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
                  <p className="text-xs text-[#6B7280] mb-0.5">Đang thực hiện</p>
                  <p className="text-base font-semibold text-[#3A7BD5]">
                    {filteredOrders.filter(o => o.status.includes('giám định') || o.status.includes('Báo cáo') || o.status.includes('chứng thư') || o.status.includes('Nghiệm thu')).length}
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
                  <p className="text-xs text-[#6B7280] mb-0.5">Hoàn thành</p>
                  <p className="text-base font-semibold text-green-600">
                    {filteredOrders.filter(o => o.status === 'Hoàn thành' || o.status === 'Đã thanh toán').length}
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
                  <p className="text-xs text-[#6B7280] mb-0.5">Ưu tiên Cao</p>
                  <p className="text-base font-semibold text-red-600">
                    {filteredOrders.filter(o => o.priority === 'Cao').length}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <TrendingUp className="w-2.5 h-2.5 text-red-500" />
                    <span className="text-xs text-red-500">+5%</span>
                    <span className="text-xs text-[#6B7280]">vs tháng trước</span>
                  </div>
                </div>
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center ml-1">
                  <AlertCircle className="w-3 h-3 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Grouped by Status */}
        <div className="space-y-4">
          {statusOrder.map(status => {
            const statusOrders = groupedOrders[status]
            if (!statusOrders || statusOrders.length === 0) return null

            return (
              <div key={status} className="space-y-2">
                {/* Status Header */}
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    status === 'Hoàn thành' || status === 'Đã thanh toán' ? 'bg-green-500' :
                    status.includes('giám định') || status.includes('Báo cáo') || status.includes('chứng thư') || status.includes('Nghiệm thu') || status.includes('Đề nghị thanh toán') ? 'bg-blue-500' :
                    status.includes('Khảo sát') || status.includes('báo giá') || status.includes('hợp đồng') || status.includes('Quyết định') || status.includes('công văn') ? 'bg-yellow-500' :
                    status === 'Yêu cầu mới' ? 'bg-gray-500' :
                    status.includes('hủy') ? 'bg-red-500' :
                    'bg-gray-500'
                  }`} />
                  <h2 className="text-sm font-semibold text-[#1A365D]">{status}</h2>
                  <Badge className="text-xs bg-[#E8F1FA] text-[#3A7BD5] border-[#D1E5F0]">
                    {statusOrders.length} order
                  </Badge>
                </div>

                {/* Orders in this status */}
                <div className="grid gap-2 ml-5">
                  {statusOrders.map((order) => (
                    <Card 
                      key={order.id} 
                      className="border-[#D1E5F0] bg-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div 
                            className="flex-1 cursor-pointer"
                            onClick={() => handleViewDetail(order)}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-[#1A365D]">{order.number}</h3>
                              <Badge className={`text-xs ${getPriorityColor(order.priority)}`}>
                                {order.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-[#4A5568] mb-1">{order.name}</p>
                            <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                              <span className="flex items-center gap-1">
                                <Building className="w-3 h-3" />
                                {order.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {order.inspector}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {order.deadline}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 px-2 text-[#3A7BD5] hover:bg-[#E8F1FA]"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewDetail(order)
                              }}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 px-2 text-[#5AB2F2] hover:bg-[#E8F1FA]"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditOrder(order)
                              }}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 px-2 text-red-500 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteOrder(order.id)
                              }}
                            >
                              <AlertCircle className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Order Detail View
  const OrderDetailView = () => (
    <div className="space-y-3">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 px-2 text-[#3A7BD5] hover:bg-[#E8F1FA]"
          onClick={handleBackToList}
        >
          <Home className="w-3 h-3 mr-1" />
          Quản lý Orders
        </Button>
        <span className="text-[#6B7280]">/</span>
        <span className="text-[#1A365D] font-medium">{selectedOrder.number}</span>
      </div>

      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-[#E8F1FA] border-b border-[#D1E5F0] p-3 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-[#3A7BD5] hover:bg-[#E8F1FA]"
              onClick={handleBackToList}
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Quay lại
            </Button>
            <h1 className="text-lg font-semibold text-[#1A365D]">{selectedOrder.number}</h1>
            <Badge className={`text-xs ${getStatusColor(selectedOrder.status)}`}>
              {selectedOrder.status}
            </Badge>
            <Badge className={`text-xs ${getPriorityColor(selectedOrder.priority)}`}>
              {selectedOrder.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              value={assetSearch}
              onChange={(e) => setAssetSearch(e.target.value)}
              placeholder="Tìm kiếm tài sản..."
              className="text-xs p-1 border border-[#D1E5F0] rounded focus:outline-none focus:ring-2 focus:ring-[#3A7BD5] w-40"
            />
            <Button size="sm" className="h-7 px-3 bg-[#3A7BD5] hover:bg-[#2E5FA3] text-white text-xs">
              <Edit className="w-3 h-3 mr-1" />
              Edit
            </Button>
            <Button size="sm" className="h-7 px-3 bg-[#5AB2F2] hover:bg-[#4A9FE1] text-white text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="h-7 px-3 border-[#D1E5F0] text-[#3A7BD5] hover:bg-[#E8F1FA] text-xs">
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Horizontal Layout */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Left Panel - 2 Column Info Form */}
        <div className="lg:w-1/2 space-y-3">
          <Card className="border-[#D1E5F0] bg-white shadow-sm">
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                {/* General Info Column */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-[#3A7BD5]" />
                    <span className="font-medium text-[#1A365D]">Tên Order:</span>
                  </div>
                  <p className="text-[#4A5568] ml-5">{selectedOrder.name}</p>
                  
                  <div className="flex items-center gap-2">
                    <Building className="w-3 h-3 text-[#3A7BD5]" />
                    <span className="font-medium text-[#1A365D]">Công ty:</span>
                  </div>
                  <p className="text-[#4A5568] ml-5">{selectedOrder.company}</p>
                  
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-[#3A7BD5]" />
                    <span className="font-medium text-[#1A365D]">Giám định viên:</span>
                  </div>
                  <p className="text-[#4A5568] ml-5">{selectedOrder.inspector}</p>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-[#3A7BD5]" />
                    <span className="font-medium text-[#1A365D]">Địa chỉ:</span>
                  </div>
                  <p className="text-[#4A5568] ml-5">{selectedOrder.address}</p>
                </div>

                {/* Status & Timeline Column */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-[#3A7BD5]" />
                    <span className="font-medium text-[#1A365D]">Ngày tạo:</span>
                  </div>
                  <p className="text-[#4A5568] ml-5">{selectedOrder.createdDate}</p>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-[#3A7BD5]" />
                    <span className="font-medium text-[#1A365D]">Hạn chót:</span>
                  </div>
                  <p className="text-[#4A5568] ml-5">{selectedOrder.deadline}</p>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-[#3A7BD5]" />
                    <span className="font-medium text-[#1A365D]">Giá trị:</span>
                  </div>
                  <p className="text-[#4A5568] ml-5">{selectedOrder.value}</p>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-[#3A7BD5]" />
                    <span className="font-medium text-[#1A365D]">Điện thoại:</span>
                  </div>
                  <p className="text-[#4A5568] ml-5">{selectedOrder.phone}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-3 pt-3 border-t border-[#D1E5F0]">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-3 h-3 text-[#3A7BD5]" />
                  <span className="font-medium text-[#1A365D] text-xs">Mô tả:</span>
                </div>
                <p className="text-[#4A5568] text-xs ml-5">{selectedOrder.description}</p>
              </div>

              {/* Progress */}
              <div className="mt-3 pt-3 border-t border-[#D1E5F0]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-[#1A365D] text-xs">Tiến độ:</span>
                  <span className="text-[#3A7BD5] text-xs font-medium">{selectedOrder.progress}%</span>
                </div>
                <div className="w-full bg-[#E8F1FA] rounded-full h-2">
                  <div 
                    className="bg-[#3A7BD5] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${selectedOrder.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inline Tables */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-3">
                <h3 className="text-xs font-semibold text-[#1A365D] mb-2">Tài sản ({selectedOrder.assetCount})</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#4A5568]">Máy phát điện 1500KVA</span>
                    <span className="text-[#3A7BD5]">✓</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#4A5568]">Tủ điều khiển</span>
                    <span className="text-[#5AB2F2]">⚡</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#4A5568]">Hệ thống làm mát</span>
                    <span className="text-[#5AB2F2]">⚡</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#D1E5F0] bg-white shadow-sm">
              <CardContent className="p-3">
                <h3 className="text-xs font-semibold text-[#1A365D] mb-2">Báo cáo ({selectedOrder.reportCount})</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#4A5568]">Báo cáo kỹ thuật</span>
                    <span className="text-[#3A7BD5]">✓</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#4A5568]">Hình ảnh kiểm tra</span>
                    <span className="text-[#5AB2F2]">📷</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#4A5568]">Biên bản nghiệm thu</span>
                    <span className="text-[#5AB2F2]">📄</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Panel - Tabs */}
        <div className="lg:w-1/2">
          <Card className="border-[#D1E5F0] bg-white shadow-sm h-full">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 w-full bg-[#E8F1FA] border-b border-[#D1E5F0] rounded-none h-8">
                  <TabsTrigger 
                    value="plan" 
                    className="text-xs h-7 rounded-none data-[state=active]:bg-white data-[state=active]:text-[#3A7BD5] data-[state=active]:border-b-2 data-[state=active]:border-[#3A7BD5]"
                  >
                    Plan
                  </TabsTrigger>
                  <TabsTrigger 
                    value="rasci" 
                    className="text-xs h-7 rounded-none data-[state=active]:bg-white data-[state=active]:text-[#3A7BD5] data-[state=active]:border-b-2 data-[state=active]:border-[#3A7BD5]"
                  >
                    RASCI
                  </TabsTrigger>
                  <TabsTrigger 
                    value="report" 
                    className="text-xs h-7 rounded-none data-[state=active]:bg-white data-[state=active]:text-[#3A7BD5] data-[state=active]:border-b-2 data-[state=active]:border-[#3A7BD5]"
                  >
                    Report
                  </TabsTrigger>
                  <TabsTrigger 
                    value="timeline" 
                    className="text-xs h-7 rounded-none data-[state=active]:bg-white data-[state=active]:text-[#3A7BD5] data-[state=active]:border-b-2 data-[state=active]:border-[#3A7BD5]"
                  >
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger 
                    value="logs" 
                    className="text-xs h-7 rounded-none data-[state=active]:bg-white data-[state=active]:text-[#3A7BD5] data-[state=active]:border-b-2 data-[state=active]:border-[#3A7BD5]"
                  >
                    Logs
                  </TabsTrigger>
                </TabsList>

                <div className="p-3 max-h-96 overflow-y-auto">
                  <TabsContent value="plan" className="mt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-[#1A365D]">Danh mục tài sản giám định</h3>
                        <div className="text-xs text-[#6B7280]">
                          Tổng số: {getFilteredAssets().length} tài sản
                        </div>
                      </div>
                      
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {getFilteredAssets().map((asset) => (
                          <Card key={asset.id} className="border-[#D1E5F0] bg-white shadow-sm">
                            <CardContent className="p-3">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-sm font-medium text-[#1A365D]">{asset.name}</h4>
                                    <Badge className={`text-xs ${getAssetStatusColor(asset.status)}`}>
                                      {asset.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-2">
                                    <span className="flex items-center gap-1">
                                      <FileText className="w-3 h-3" />
                                      {asset.type}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {asset.location}
                                    </span>
                                  </div>
                                  
                                  {asset.inspectionDate && (
                                    <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-2">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {asset.inspectionDate}
                                      </span>
                                      {asset.inspector && (
                                        <span className="flex items-center gap-1">
                                          <User className="w-3 h-3" />
                                          {asset.inspector}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  
                                  {asset.description && (
                                    <p className="text-xs text-[#4A5568] mb-2">{asset.description}</p>
                                  )}
                                  
                                  {asset.images && asset.images.length > 0 && (
                                    <div className="flex items-center gap-2 text-xs text-[#3A7BD5]">
                                      <Camera className="w-3 h-3" />
                                      <span>{asset.images.length} hình ảnh</span>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex flex-col items-end gap-2">
                                  <div className="text-right">
                                    <div className="text-xs text-[#6B7280] mb-1">Tiến độ</div>
                                    <div className="text-sm font-medium text-[#3A7BD5]">{asset.progress}%</div>
                                  </div>
                                  
                                  <Button 
                                    size="sm" 
                                    className="h-6 px-2 bg-[#3A7BD5] hover:bg-[#2E5FA3] text-white text-xs"
                                    onClick={() => handleOpenReport(asset)}
                                  >
                                    <Upload className="w-3 h-3 mr-1" />
                                    Báo cáo
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Progress Bar */}
                              <div className="w-full bg-[#E8F1FA] rounded-full h-1.5">
                                <div 
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    asset.status === 'Hoàn thành' ? 'bg-green-500' :
                                    asset.status === 'Đang giám định' ? 'bg-blue-500' :
                                    asset.status === 'Có vấn đề' ? 'bg-red-500' :
                                    'bg-gray-300'
                                  }`}
                                  style={{ width: `${asset.progress}%` }}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="rasci" className="mt-0">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-[#1A365D]">Ma trận RASCI</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-[#D1E5F0]">
                              <th className="text-left py-2 px-2 font-medium text-[#1A365D]">Họ và tên</th>
                              <th className="text-center py-2 px-1 font-medium text-[#1A365D]">R</th>
                              <th className="text-center py-2 px-1 font-medium text-[#1A365D]">A</th>
                              <th className="text-center py-2 px-1 font-medium text-[#1A365D]">S</th>
                              <th className="text-center py-2 px-1 font-medium text-[#1A365D]">C</th>
                              <th className="text-center py-2 px-1 font-medium text-[#1A365D]">I</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rasciData.map((item) => (
                              <tr key={item.id} className="border-b border-[#E8F1FA]">
                                <td className="py-2 px-2 text-[#4A5568]">{item.name}</td>
                                <td className="py-1 px-1 text-center">
                                  <input
                                    type="checkbox"
                                    checked={item.r}
                                    onChange={() => toggleRASCI(item.id, 'r')}
                                    className="w-3 h-3 text-[#3A7BD5] border-[#D1E5F0] rounded focus:ring-[#3A7BD5]"
                                  />
                                </td>
                                <td className="py-1 px-1 text-center">
                                  <input
                                    type="checkbox"
                                    checked={item.a}
                                    onChange={() => toggleRASCI(item.id, 'a')}
                                    className="w-3 h-3 text-[#3A7BD5] border-[#D1E5F0] rounded focus:ring-[#3A7BD5]"
                                  />
                                </td>
                                <td className="py-1 px-1 text-center">
                                  <input
                                    type="checkbox"
                                    checked={item.s}
                                    onChange={() => toggleRASCI(item.id, 's')}
                                    className="w-3 h-3 text-[#3A7BD5] border-[#D1E5F0] rounded focus:ring-[#3A7BD5]"
                                  />
                                </td>
                                <td className="py-1 px-1 text-center">
                                  <input
                                    type="checkbox"
                                    checked={item.c}
                                    onChange={() => toggleRASCI(item.id, 'c')}
                                    className="w-3 h-3 text-[#3A7BD5] border-[#D1E5F0] rounded focus:ring-[#3A7BD5]"
                                  />
                                </td>
                                <td className="py-1 px-1 text-center">
                                  <input
                                    type="checkbox"
                                    checked={item.i}
                                    onChange={() => toggleRASCI(item.id, 'i')}
                                    className="w-3 h-3 text-[#3A7BD5] border-[#D1E5F0] rounded focus:ring-[#3A7BD5]"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="report" className="mt-0">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-[#1A365D]">Báo cáo</h3>
                      <div className="space-y-2">
                        <div className="p-2 bg-[#F8FBFF] rounded border border-[#D1E5F0]">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[#1A365D]">Báo cáo kỹ thuật.pdf</span>
                            <Button size="sm" variant="ghost" className="h-6 px-2 text-[#3A7BD5]">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-[#4A5568] mt-1">2.3 MB - Cập nhật: 10/01/2024</p>
                        </div>
                        <div className="p-2 bg-[#F8FBFF] rounded border border-[#D1E5F0]">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[#1A365D]">Hình ảnh kiểm tra.zip</span>
                            <Button size="sm" variant="ghost" className="h-6 px-2 text-[#3A7BD5]">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-[#4A5568] mt-1">15.7 MB - Cập nhật: 12/01/2024</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline" className="mt-0">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-[#1A365D]">Timeline</h3>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-[#3A7BD5] rounded-full mt-1"></div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-[#1A365D]">Order được tạo</p>
                            <p className="text-xs text-[#4A5568]">{selectedOrder.createdDate} - 09:00</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-[#5AB2F2] rounded-full mt-1"></div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-[#1A365D]">Bắt đầu giám định</p>
                            <p className="text-xs text-[#4A5568]">12/01/2024 - 14:00</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-gray-300 rounded-full mt-1"></div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-[#1A365D]">Dự kiến hoàn thành</p>
                            <p className="text-xs text-[#4A5568]">{selectedOrder.deadline} - 17:00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="logs" className="mt-0">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-[#1A365D]">Logs hoạt động</h3>
                      <div className="space-y-1">
                        <div className="p-2 bg-[#F8FBFF] rounded border border-[#D1E5F0]">
                          <p className="text-xs font-medium text-[#1A365D]">System</p>
                          <p className="text-xs text-[#4A5568]">Order được tạo bởi admin</p>
                          <p className="text-xs text-[#5AB2F2]">{selectedOrder.createdDate} 09:00:15</p>
                        </div>
                        <div className="p-2 bg-[#F8FBFF] rounded border border-[#D1E5F0]">
                          <p className="text-xs font-medium text-[#1A365D]">{selectedOrder.inspector}</p>
                          <p className="text-xs text-[#4A5568]">Cập nhật tiến độ {selectedOrder.progress}%</p>
                          <p className="text-xs text-[#5AB2F2]">12/01/2024 14:30:22</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#F8FBFF] p-2">
        {isDetailMode ? <OrderDetailView /> : <OrderListView />}
        
        {/* Report Modal */}
        <Dialog open={isReportModalOpen} onOpenChange={handleCloseReport}>
          <DialogContent className="sm:max-w-[600px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-[#1A365D]">
                Báo cáo giám định - {selectedAsset?.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Asset Info */}
              <div className="p-3 bg-[#F8FBFF] rounded border border-[#D1E5F0]">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-medium text-[#1A365D]">Loại tài sản:</span>
                    <span className="text-[#4A5568] ml-2">{selectedAsset?.type}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1A365D]">Vị trí:</span>
                    <span className="text-[#4A5568] ml-2">{selectedAsset?.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Status Selection */}
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-2">
                  Trạng thái giám định
                </label>
                <select 
                  value={reportData.status}
                  onChange={(e) => setReportData(prev => ({ ...prev, status: e.target.value as Asset['status'] }))}
                  className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                >
                  <option value="Chưa giám định">Chưa giám định</option>
                  <option value="Đang giám định">Đang giám định</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Có vấn đề">Có vấn đề</option>
                </select>
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-2">
                  Mô tả tình trạng giám định
                </label>
                <textarea 
                  value={reportData.description}
                  onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Nhập mô tả chi tiết về tình trạng tài sản..."
                  className="w-full p-3 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5] min-h-[100px] resize-none"
                />
              </div>
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-2">
                  Hình ảnh giám định
                </label>
                <div className="border-2 border-dashed border-[#D1E5F0] rounded p-4 text-center">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label 
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Camera className="w-8 h-8 text-[#3A7BD5]" />
                    <span className="text-xs text-[#3A7BD5]">Nhấp để tải lên hình ảnh</span>
                    <span className="text-xs text-[#6B7280]">Hoặc kéo và thả file vào đây</span>
                  </label>
                </div>
                
                {/* Uploaded Images */}
                {reportData.images.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="text-xs font-medium text-[#1A365D]">Hình ảnh đã tải lên:</div>
                    {reportData.images.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-[#F8FBFF] rounded border border-[#D1E5F0]">
                        <span className="text-xs text-[#4A5568]">{file.name}</span>
                        <span className="text-xs text-[#3A7BD5]">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Existing Images */}
              {selectedAsset?.images && selectedAsset.images.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-[#1A365D] mb-2">Hình ảnh hiện có:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedAsset.images.map((image, index) => (
                      <div key={index} className="p-2 bg-[#F8FBFF] rounded border border-[#D1E5F0] text-center">
                        <Camera className="w-4 h-4 text-[#3A7BD5] mx-auto mb-1" />
                        <span className="text-xs text-[#4A5568] truncate block">{image}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-[#D1E5F0]">
                <Button 
                  variant="outline" 
                  onClick={handleCloseReport}
                  className="h-8 px-4 border-[#D1E5F0] text-[#3A7BD5] hover:bg-[#E8F1FA] text-xs"
                >
                  Hủy
                </Button>
                <Button 
                  onClick={handleSaveReport}
                  className="h-8 px-4 bg-[#3A7BD5] hover:bg-[#2E5FA3] text-white text-xs"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Lưu báo cáo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Create Order Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-[#1A365D]">
                Tạo Order mới
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Số Order</label>
                  <input 
                    type="text" 
                    value={newOrder.number}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, number: e.target.value }))}
                    className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                    placeholder="ORD-2024-XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Ưu tiên</label>
                  <select 
                    value={newOrder.priority}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, priority: e.target.value as Order['priority'] }))}
                    className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                  >
                    <option value="Cao">Cao</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Thấp">Thấp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Tên Order</label>
                <input 
                  type="text" 
                  value={newOrder.name}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                  placeholder="Nhập tên order"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Công ty</label>
                <input 
                  type="text" 
                  value={newOrder.company}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                  placeholder="Nhập tên công ty"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Giám định viên</label>
                  <input 
                    type="text" 
                    value={newOrder.inspector}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, inspector: e.target.value }))}
                    className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                    placeholder="Nhập tên giám định viên"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Loại hình</label>
                  <input 
                    type="text" 
                    value={newOrder.type}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                    placeholder="Nhập loại hình"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Ngày tạo</label>
                  <input 
                    type="date" 
                    value={newOrder.createdDate}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, createdDate: e.target.value }))}
                    className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Hạn chót</label>
                  <input 
                    type="date" 
                    value={newOrder.deadline}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Giá trị</label>
                <input 
                  type="text" 
                  value={newOrder.value}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, value: e.target.value }))}
                  className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                  placeholder="Nhập giá trị"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Địa chỉ</label>
                <input 
                  type="text" 
                  value={newOrder.address}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Điện thoại</label>
                  <input 
                    type="text" 
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Email</label>
                  <input 
                    type="email" 
                    value={newOrder.email}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                    placeholder="Nhập email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A365D] mb-1">Mô tả</label>
                <textarea 
                  value={newOrder.description}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, description: e.target.value }))}
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
                  onClick={handleCreateOrder}
                  className="h-8 px-4 bg-[#3A7BD5] hover:bg-[#2E5FA3] text-white text-xs"
                >
                  <FileText className="w-3 h-3 mr-1" />
                  Tạo Order
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Order Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-[#1A365D]">
                Chỉnh sửa Order - {editingOrder?.number}
              </DialogTitle>
            </DialogHeader>
            
            {editingOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A365D] mb-1">Số Order</label>
                    <input 
                      type="text" 
                      value={editingOrder.number}
                      onChange={(e) => setEditingOrder(prev => prev ? { ...prev, number: e.target.value } : null)}
                      className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A365D] mb-1">Trạng thái</label>
                    <select 
                      value={editingOrder.status}
                      onChange={(e) => setEditingOrder(prev => prev ? { ...prev, status: e.target.value as Order['status'] } : null)}
                      className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                    >
                      <option value="Yêu cầu mới">Yêu cầu mới</option>
                      <option value="Khảo sát">Khảo sát</option>
                      <option value="Báo cáo khảo sát">Báo cáo khảo sát</option>
                      <option value="Lên báo giá">Lên báo giá</option>
                      <option value="Ký hợp đồng">Ký hợp đồng</option>
                      <option value="Quyết định thành lập tổ giám định">Quyết định thành lập tổ giám định</option>
                      <option value="Gửi công văn thông báo kế hoạch giám định">Gửi công văn thông báo kế hoạch giám định</option>
                      <option value="Thực hiện giám định hiện trường">Thực hiện giám định hiện trường</option>
                      <option value="Báo cáo giám định">Báo cáo giám định</option>
                      <option value="Dự thảo chứng thư giám định">Dự thảo chứng thư giám định</option>
                      <option value="Gửi dự thảo chứng thư">Gửi dự thảo chứng thư</option>
                      <option value="Khách hàng duyệt chứng thư">Khách hàng duyệt chứng thư</option>
                      <option value="Nghiệm thu khối lượng">Nghiệm thu khối lượng</option>
                      <option value="Đề nghị thanh toán">Đề nghị thanh toán</option>
                      <option value="Hoàn thành">Hoàn thành</option>
                      <option value="Đã thanh toán">Đã thanh toán</option>
                      <option value="Yêu cầu hủy">Yêu cầu hủy</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Tên Order</label>
                  <input 
                    type="text" 
                    value={editingOrder.name}
                    onChange={(e) => setEditingOrder(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Công ty</label>
                  <input 
                    type="text" 
                    value={editingOrder.company}
                    onChange={(e) => setEditingOrder(prev => prev ? { ...prev, company: e.target.value } : null)}
                    className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A365D] mb-1">Giám định viên</label>
                    <input 
                      type="text" 
                      value={editingOrder.inspector}
                      onChange={(e) => setEditingOrder(prev => prev ? { ...prev, inspector: e.target.value } : null)}
                      className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A365D] mb-1">Ưu tiên</label>
                    <select 
                      value={editingOrder.priority}
                      onChange={(e) => setEditingOrder(prev => prev ? { ...prev, priority: e.target.value as Order['priority'] } : null)}
                      className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                    >
                      <option value="Cao">Cao</option>
                      <option value="Trung bình">Trung bình</option>
                      <option value="Thấp">Thấp</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A365D] mb-1">Hạn chót</label>
                    <input 
                      type="date" 
                      value={editingOrder.deadline}
                      onChange={(e) => setEditingOrder(prev => prev ? { ...prev, deadline: e.target.value } : null)}
                      className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A365D] mb-1">Giá trị</label>
                    <input 
                      type="text" 
                      value={editingOrder.value}
                      onChange={(e) => setEditingOrder(prev => prev ? { ...prev, value: e.target.value } : null)}
                      className="w-full p-2 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A365D] mb-1">Mô tả</label>
                  <textarea 
                    value={editingOrder.description}
                    onChange={(e) => setEditingOrder(prev => prev ? { ...prev, description: e.target.value } : null)}
                    className="w-full p-3 border border-[#D1E5F0] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3A7BD5] min-h-[80px] resize-none"
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4 border-t border-[#D1E5F0]">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditModalOpen(false)}
                    className="h-8 px-4 border-[#D1E5F0] text-[#3A7BD5] hover:bg-[#E8F1FA] text-xs"
                  >
                    Hủy
                  </Button>
                  <Button 
                    onClick={handleUpdateOrder}
                    className="h-8 px-4 bg-[#3A7BD5] hover:bg-[#2E5FA3] text-white text-xs"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Cập nhật
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}