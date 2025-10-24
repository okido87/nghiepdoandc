# 🏢 WebApp Quản Lý Giám Định Nghiệp Đoàn DC

Hệ thống quản lý giám định toàn diện cho Nghiệp Đoàn DC, được phát triển bởi EMS SOLUTION. Đây là một ứng dụng web hiện đại, production-ready với đầy đủ tính năng quản lý quy trình giám định, tài sản, nhân sự và báo cáo.

## 🏢 Thông Tin Chủ Đầu Tư

**🏢 Nghiệp Đoàn DC** - Đơn vị sử dụng phần mềm độc quyền
- Lĩnh vực: Giám định, kiểm định, tư vấn kỹ thuật
- Quy mô: Hệ thống đa chi nhánh, đa đối tác

## 🚀 Thông Tin Nhà Phát Triển

**🔧 EMS SOLUTION** - Đơn vị phát triển phần mềm
- 📞 Hotline: 0903375265 (Mr.Hiền)
- 🌐 Website: www.gpems.net
- 📧 Email: admin@gpems.net
- Chuyên môn: Phát triển giải pháp quản lý doanh nghiệp

## ✨ Tính Năng Nổi Bật

### 🎯 Module Chính
- **📋 Quản lý Orders** - Theo dõi và quản lý các yêu cầu giám định
- **🏗️ Quản lý Tài sản** - Danh mục và theo dõi tài sản giám định
- **👥 Quản lý Nhân sự** - Ma trận RASCI và phân công theo PDCA
- **📊 Báo cáo Hiện trường** - Báo cáo chi tiết từ hiện trường
- **📈 Analytics & Dashboard** - Thống kê và phân tích dữ liệu
- **🔐 Phân quyền** - Quản lý quyền truy cập và vai trò người dùng
- **🏛️ Master Data** - Cài đặt dữ liệu nền tảng hệ thống

### 🛠️ Tính Năng Hỗ Trợ
- **📅 Timeline** - Theo dõi tiến độ và lịch sử hoạt động
- **🤝 Quản lý Đối tác** - Thông tin đối tác và khách hàng
- **🏪 Quản lý Chi nhánh** - Hệ thống đa chi nhánh
- **💰 Tài chính** - Quản lý giao dịch và báo cáo tài chính
- **⚙️ Workflows** - Quy trình tự động hóa
- **📱 Mobile Responsive** - Tương thích mọi thiết bị

## 🎨 Giao Diện Người Dùng

### 📱 Dashboard Tổng Quan
- **Thống kê KPI** - Tổng quan số liệu quan trọng
- **Thao tác nhanh** - Truy cập nhanh các chức năng
- **Hoạt động gần đây** - Theo dõi hoạt động hệ thống
- **Tình trạng chung** - Tổng quan tiến độ công việc

### 🎯 Thiết Kế Responsive
- **Mobile-first** - Tối ưu cho di động
- **Dark/Light Mode** - Chuyển đổi giao diện
- **Real-time Updates** - Cập nhật thời gian thực
- **Interactive Charts** - Biểu đồ tương tác

## 🛠️ Công Nghệ

### 🎯 Framework Core
- **⚡ Next.js 15** - React framework với App Router
- **📘 TypeScript 5** - Type-safe cho development
- **🎨 Tailwind CSS 4** - Utility-first CSS framework
- **🧩 shadcn/ui** - Component library chất lượng cao

### 📊 Data & Backend
- **🗄️ Prisma ORM** - Database management
- **🔄 TanStack Query** - Data fetching và caching
- **🐻 Zustand** - State management
- **🌐 Axios** - HTTP client

### 🎨 UI/UX Features
- **📊 Recharts** - Data visualization
- **🖱️ DND Kit** - Drag & drop functionality
- **🎬 Framer Motion** - Animations
- **🎨 Lucide React** - Icon library

### 🔐 Security & Auth
- **🔐 NextAuth.js** - Authentication solution
- **✅ Zod** - Schema validation
- **🔒 Type Safety** - End-to-end TypeScript

## 🚀 Quick Start

```bash
# Cài đặt dependencies
npm install

# Khởi động database (nếu cần)
npm run db:push

# Chạy development server
npm run dev

# Build cho production
npm run build

# Chạy production server
npm start
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 📁 Cấu Trúc Dự Án

```
nghiepdoandc/
├── src/                      # Mã nguồn chính
│   ├── app/                  # Next.js App Router
│   │   ├── analytics/        # Module phân tích dữ liệu
│   │   ├── api/              # API endpoints
│   │   ├── branches/         # Quản lý chi nhánh
│   │   ├── customers/        # Quản lý khách hàng
│   │   ├── eaip/             # Module EAIP
│   │   ├── finance/          # Quản lý tài chính
│   │   ├── master-data/      # Dữ liệu nền tảng
│   │   ├── orders/           # Quản lý đơn hàng
│   │   ├── partners/         # Quản lý đối tác
│   │   ├── permissions/      # Phân quyền
│   │   ├── plans/            # Kế hoạch
│   │   ├── rasci/            # Ma trận RASCI
│   │   ├── reports/          # Báo cáo
│   │   ├── settings/         # Cài đặt
│   │   ├── tasks/            # Quản lý công việc
│   │   ├── timeline/         # Timeline
│   │   ├── users/            # Quản lý người dùng
│   │   └── workflows/        # Quy trình làm việc
│   ├── components/           # React components
│   │   ├── ui/               # UI components
│   │   └── views/            # View components
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Thư viện và utilities
├── public/                   # Static assets
├── prisma/                   # Prisma ORM schema
├── data/                     # Dữ liệu mẫu và seeding
├── db/                       # Database files
├── docs/                     # Tài liệu dự án
└── scripts/                  # Scripts hỗ trợ
```

## 📊 Database Schema

### 🏢 Core Entities
- **Orders** - Quản lý yêu cầu giám định
- **Plans** - Kế hoạch và tài sản
- **Reports** - Báo cáo hiện trường
- **Users** - Người dùng và phân quyền
- **Companies** - Thông tin công ty
- **Assets** - Tài sản giám định
- **Tasks** - Công việc và nhiệm vụ
- **Certificates** - Chứng chỉ và giấy phép

### 🔗 Relationships
- Users → Orders (Many-to-Many)
- Companies → Orders (One-to-Many)
- Plans → Assets (One-to-Many)
- Reports → Orders (One-to-Many)

## 🎨 Features Chi Tiết

### 📋 Orders Management
- ✅ Tạo và quản lý yêu cầu giám định
- ✅ Theo dõi tiến độ thực hiện
- ✅ Phân công giám định viên
- ✅ Quản lý trạng thái và duyệt
- ✅ Timeline và lịch sử thay đổi

### 🏗️ Assets & Plans Management
- ✅ Danh mục tài sản giám định
- ✅ Lập kế hoạch kiểm định
- ✅ Theo dõi lịch bảo trì
- ✅ Quản lý chứng chỉ
- ✅ Báo cáo tình trạng tài sản

### 👥 Human Resources
- ✅ Quản lý thông tin nhân viên
- ✅ Ma trận RASCI (Responsible, Accountable, Support, Consulted, Informed)
- ✅ Phân công theo chu trình PDCA
- ✅ Quản lý vai trò và quyền hạn
- ✅ Đánh giá hiệu suất

### 📊 Reporting & Analytics
- ✅ Báo cáo hiện trường chi tiết
- ✅ Dashboard thống kê real-time
- ✅ Xuất báo cáo PDF/Excel
- ✅ Biểu đồ phân tích dữ liệu
- ✅ KPI tracking

### 🔐 Security & Permissions
- ✅ Authentication và authorization
- ✅ Role-based access control
- ✅ Audit trail và logging
- ✅ Data encryption
- ✅ Session management

## 🌐 API Documentation

### 📋 Orders API
```typescript
GET /api/orders          // Lấy danh sách orders
POST /api/orders         // Tạo order mới
PUT /api/orders/:id      // Cập nhật order
DELETE /api/orders/:id   // Xóa order
```

### 👥 Users API
```typescript
GET /api/users           // Lấy danh sách users
POST /api/users          // Tạo user mới
PUT /api/users/:id       // Cập nhật user
DELETE /api/users/:id    // Xóa user
```

### 📊 Stats API
```typescript
GET /api/stats           // Lấy thống kê tổng quan
GET /api/stats/kpi       // Lấy KPI chi tiết
GET /api/stats/charts    // Dữ liệu cho biểu đồ
```

## 🎨 UI Components Available

### 📋 Data Display
- **Data Table** - Bảng dữ liệu với sort, filter, pagination
- **Charts** - Biểu đồ (Bar, Line, Pie, Area)
- **Cards** - Thẻ thông tin với statistics
- **Badges** - Hiển thị trạng thái và labels

### 🎯 Forms & Input
- **Form Components** - Input, Select, Textarea, Checkbox
- **Date Picker** - Chọn ngày tháng
- **File Upload** - Tải lên tài liệu
- **Rich Text Editor** - Soạn thảo nội dung

### 🎨 Interactive Elements
- **Modal/Dialog** - Popup windows
- **Dropdown** - Menu thả xuống
- **Tabs** - Chuyển tab nội dung
- **Accordion** - Content accordion

## 📱 Responsive Design

### 🖥️ Desktop (>1024px)
- Full sidebar navigation
- Multi-column layouts
- Hover states and tooltips
- Keyboard shortcuts

### 📱 Tablet (768px-1024px)
- Collapsible sidebar
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized spacing

### 📱 Mobile (<768px)
- Bottom navigation
- Single column layouts
- Swipe gestures
- Mobile-optimized forms

## 🚀 Deployment

### 🐳 Docker Deployment
```bash
# Build image
docker build -t eaip-management .

# Run container
docker run -p 3000:3000 eaip-management
```

### 🌐 Production Deployment
```bash
# Build optimized version
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### 📄 Environment Variables
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 🗄️ Database Setup
```bash
# Push schema to database
npm run db:push

# Generate Prisma client
npm run db:generate

# Reset database (dev only)
npm run db:reset
```

## 🤝 Hỗ Trợ Kỹ Thuật

### 📞 Liên Hệ EMS SOLUTION
- **Hotline**: 0903375265 (Mr.Hiền)
- **Email**: admin@gpems.net
- **Website**: www.gpems.net

### 📋 Dịch Vụ Hỗ Trợ
- 🔧 Installation và setup
- 📚 Training và documentation
- 🐛 Bug fixing và maintenance
- 🚀 Feature development
- 📊 Performance optimization

## 📄 License

Phần mềm được phát triển độc quyền cho Nghiệp Đoàn DC bởi EMS SOLUTION.
© 2024 EMS SOLUTION. All rights reserved.

---

**Phát triển bởi ❤️ EMS SOLUTION**  
**Dành riêng cho 🏢 Nghiệp Đoàn DC**