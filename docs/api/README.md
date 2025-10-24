# 📡 API Documentation

Tổng quan về API cho WebApp Quản Lý Giám Định Nghiệp Đoàn DC.

## 🔗 Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## 🔐 Authentication

Tất cả API requests cần authentication token:

```http
Authorization: Bearer <your-jwt-token>
```

## 📋 API Endpoints Overview

### 🏢 Core Business APIs
- **Orders API** - Quản lý yêu cầu giám định
- **Plans API** - Quản lý kế hoạch và tài sản  
- **Reports API** - Quản lý báo cáo hiện trường
- **Assets API** - Quản lý tài sản giám định
- **Tasks API** - Quản lý công việc và nhiệm vụ

### 👥 User Management APIs
- **Users API** - Quản lý người dùng
- **Authentication API** - Đăng nhập/đăng ký
- **Permissions API** - Quản lý phân quyền
- **Companies API** - Quản lý thông tin công ty

### 📊 Analytics & Reporting APIs
- **Stats API** - Thống kê và KPI
- **Analytics API** - Phân tích dữ liệu
- **Charts API** - Dữ liệu cho biểu đồ
- **Timeline API** - Lịch sử hoạt động

### 🗄️ Master Data APIs
- **Master Data API** - Dữ liệu nền tảng
- **Certificates API** - Quản lý chứng chỉ
- **Incidents API** - Quản lý sự cố
- **Documents API** - Quản lý tài liệu

## 📊 Response Format

### ✅ Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful",
  "timestamp": "2024-01-20T10:30:00Z"
}
```

### ❌ Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

## 🔄 HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 422 | Unprocessable Entity | Validation errors |
| 500 | Internal Server Error | Server error |

## 📝 Request Headers

```http
Content-Type: application/json
Authorization: Bearer <token>
Accept: application/json
User-Agent: EAIP-WebApp/1.0
```

## 🚀 Rate Limiting

- **Standard**: 100 requests per minute
- **Premium**: 1000 requests per minute
- **Enterprise**: Unlimited

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642694400
```

## 🔄 Pagination

List endpoints support pagination:

```http
GET /api/orders?page=1&limit=20&sort=createdAt&order=desc
```

Response:
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## 🔍 Filtering & Search

Most list endpoints support filtering:

```http
GET /api/orders?status=active&company=ABC&search=máy phát điện
```

Available filters:
- `status` - Filter by status
- `company` - Filter by company
- `dateFrom` - Filter by date range (start)
- `dateTo` - Filter by date range (end)
- `search` - Text search across multiple fields

## 📊 Real-time Updates

WebSocket endpoint for real-time updates:

```javascript
const socket = io('ws://localhost:3000', {
  auth: {
    token: 'your-jwt-token'
  }
});

socket.on('order:updated', (data) => {
  console.log('Order updated:', data);
});
```

## 🧪 Testing API

Use the provided test endpoints:

```http
GET /api/health          # Health check
GET /api/test/auth       # Test authentication
GET /api/test/data       # Test data access
```

## 📞 API Support

For API support and questions:
- **Email**: admin@gpems.net
- **Hotline**: 0903375265 (Mr.Hiền)
- **Documentation**: [Full API Docs](../)

---

© 2024 EMS SOLUTION - API Documentation for Nghiệp Đoàn DC