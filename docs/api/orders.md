# 📋 Orders API Documentation

API endpoints for managing orders in WebApp Quản Lý Giám Định Nghiệp Đoàn DC.

## 🔗 Base URL
```
GET    /api/orders
POST   /api/orders
GET    /api/orders/[id]
PUT    /api/orders/[id]
DELETE /api/orders/[id]
```

## 📊 Data Model

### Order Object
```typescript
interface Order {
  id: string                    // Unique identifier
  number: string                // Order number (e.g., "ORD-2024-001")
  name: string                  // Order title/name
  description?: string          // Detailed description
  status: OrderStatus          // Current status
  priority: Priority           // Priority level
  companyId: string            // Company ID (foreign key)
  assignedTo?: string          // Assigned user ID
  createdAt: string            // Creation timestamp (ISO 8601)
  updatedAt: string            // Last update timestamp (ISO 8601)
  deadline: string             // Deadline timestamp (ISO 8601)
  progress: number             // Progress percentage (0-100)
  risk: RiskLevel             // Risk assessment
  estimatedValue: number       // Estimated value (VND)
  actualValue?: number         // Actual value (VND)
  location: string             // Inspection location
  contactPerson: string        // Contact person name
  contactPhone: string         // Contact phone number
  contactEmail: string         // Contact email
}
```

### Enums
```typescript
type OrderStatus = 'PENDING' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'
```

## 🚀 API Endpoints

### 📋 Get All Orders
```http
GET /api/orders
```

#### Query Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | number | No | 1 | Page number for pagination |
| limit | number | No | 20 | Items per page (max 100) |
| status | OrderStatus | No | - | Filter by status |
| priority | Priority | No | - | Filter by priority |
| companyId | string | No | - | Filter by company |
| assignedTo | string | No | - | Filter by assigned user |
| search | string | No | - | Search in name, description |
| dateFrom | string | No | - | Filter by creation date (ISO 8601) |
| dateTo | string | No | - | Filter by creation date (ISO 8601) |
| sort | string | No | createdAt | Sort field |
| order | 'asc' | 'desc' | No | desc | Sort direction |

#### Example Request
```http
GET /api/orders?page=1&limit=10&status=IN_PROGRESS&priority=HIGH&sort=deadline&order=asc
```

#### Response
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "order-001",
        "number": "ORD-2024-001",
        "name": "Giám định máy phát điện 1250KVA",
        "description": "Kiểm tra máy phát điện Caterpillar",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "companyId": "comp-001",
        "assignedTo": "user-003",
        "createdAt": "2024-01-05T08:00:00Z",
        "updatedAt": "2024-01-20T10:15:00Z",
        "deadline": "2024-01-25T17:00:00Z",
        "progress": 65,
        "risk": "MEDIUM",
        "estimatedValue": 85000000,
        "location": "Nhà máy Điện lực ABC",
        "contactPerson": "Nguyễn Văn Nam",
        "contactPhone": "0912345678",
        "contactEmail": "namnv@diensabc.vn",
        "company": {
          "id": "comp-001",
          "name": "Công ty Cổ phần Điện lực ABC",
          "code": "EVN_ABC"
        },
        "assignee": {
          "id": "user-003",
          "name": "Lê Văn Supervisor",
          "email": "supervisor@eaip.vn"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 156,
      "totalPages": 16,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### ➕ Create Order
```http
POST /api/orders
```

#### Request Body
```json
{
  "name": "Giám định máy phát điện 1250KVA",
  "description": "Kiểm tra, đo lường và đánh giá tình trạng kỹ thuật",
  "priority": "HIGH",
  "companyId": "comp-001",
  "assignedTo": "user-003",
  "deadline": "2024-01-25T17:00:00Z",
  "estimatedValue": 85000000,
  "location": "Nhà máy Điện lực ABC",
  "contactPerson": "Nguyễn Văn Nam",
  "contactPhone": "0912345678",
  "contactEmail": "namnv@diensabc.vn"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "order-002",
    "number": "ORD-2024-002",
    "name": "Giám định máy phát điện 1250KVA",
    "status": "PENDING",
    "priority": "HIGH",
    "companyId": "comp-001",
    "assignedTo": "user-003",
    "createdAt": "2024-01-20T10:30:00Z",
    "updatedAt": "2024-01-20T10:30:00Z",
    "deadline": "2024-01-25T17:00:00Z",
    "progress": 0,
    "risk": "MEDIUM",
    "estimatedValue": 85000000,
    "location": "Nhà máy Điện lực ABC",
    "contactPerson": "Nguyễn Văn Nam",
    "contactPhone": "0912345678",
    "contactEmail": "namnv@diensabc.vn"
  },
  "message": "Order created successfully"
}
```

### 📄 Get Single Order
```http
GET /api/orders/[id]
```

#### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Order ID |

#### Response
```json
{
  "success": true,
  "data": {
    "id": "order-001",
    "number": "ORD-2024-001",
    "name": "Giám định máy phát điện 1250KVA",
    "description": "Kiểm tra máy phát điện Caterpillar",
    "status": "COMPLETED",
    "priority": "HIGH",
    "companyId": "comp-001",
    "assignedTo": "user-003",
    "createdAt": "2024-01-05T08:00:00Z",
    "updatedAt": "2024-01-18T16:30:00Z",
    "deadline": "2024-01-20T17:00:00Z",
    "progress": 100,
    "risk": "MEDIUM",
    "estimatedValue": 85000000,
    "actualValue": 82000000,
    "location": "Nhà máy Điện lực ABC",
    "contactPerson": "Nguyễn Văn Nam",
    "contactPhone": "0912345678",
    "contactEmail": "namnv@diensabc.vn",
    "company": {
      "id": "comp-001",
      "name": "Công ty Cổ phần Điện lực ABC",
      "code": "EVN_ABC",
      "email": "contact@diensabc.vn",
      "phone": "02412345678"
    },
    "assignee": {
      "id": "user-003",
      "name": "Lê Văn Supervisor",
      "email": "supervisor@eaip.vn",
      "phone": "0903456789"
    },
    "reports": [
      {
        "id": "report-001",
        "title": "Báo cáo giám định máy phát điện",
        "status": "APPROVED",
        "submissionDate": "2024-01-18T16:30:00Z"
      }
    ],
    "tasks": [
      {
        "id": "task-001",
        "title": "Chuẩn bị thiết bị đo lường",
        "status": "COMPLETED",
        "completedDate": "2024-01-19T15:30:00Z"
      }
    ]
  }
}
```

### ✏️ Update Order
```http
PUT /api/orders/[id]
```

#### Request Body
```json
{
  "name": "Giám định máy phát điện 1250KVA (Updated)",
  "description": "Kiểm tra, đo lường và đánh giá tình trạng kỹ thuật - Updated scope",
  "status": "IN_PROGRESS",
  "priority": "CRITICAL",
  "assignedTo": "user-004",
  "progress": 75,
  "risk": "HIGH",
  "actualValue": 83000000,
  "deadline": "2024-01-28T17:00:00Z"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "order-001",
    "number": "ORD-2024-001",
    "name": "Giám định máy phát điện 1250KVA (Updated)",
    "description": "Kiểm tra, đo lường và đánh giá tình trạng kỹ thuật - Updated scope",
    "status": "IN_PROGRESS",
    "priority": "CRITICAL",
    "companyId": "comp-001",
    "assignedTo": "user-004",
    "createdAt": "2024-01-05T08:00:00Z",
    "updatedAt": "2024-01-20T11:00:00Z",
    "deadline": "2024-01-28T17:00:00Z",
    "progress": 75,
    "risk": "HIGH",
    "estimatedValue": 85000000,
    "actualValue": 83000000,
    "location": "Nhà máy Điện lực ABC",
    "contactPerson": "Nguyễn Văn Nam",
    "contactPhone": "0912345678",
    "contactEmail": "namnv@diensabc.vn"
  },
  "message": "Order updated successfully"
}
```

### 🗑️ Delete Order
```http
DELETE /api/orders/[id]
```

#### Response
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

## 📊 Statistics Endpoints

### 📈 Get Order Statistics
```http
GET /api/orders/stats
```

#### Query Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| period | string | No | month | 'day', 'week', 'month', 'year' |
| companyId | string | No | - | Filter by company |

#### Response
```json
{
  "success": true,
  "data": {
    "overview": {
      "total": 156,
      "pending": 32,
      "approved": 25,
      "inProgress": 25,
      "completed": 89,
      "cancelled": 10
    },
    "byStatus": [
      { "status": "COMPLETED", "count": 89, "percentage": 57.1 },
      { "status": "IN_PROGRESS", "count": 25, "percentage": 16.0 },
      { "status": "PENDING", "count": 32, "percentage": 20.5 },
      { "status": "CANCELLED", "count": 10, "percentage": 6.4 }
    ],
    "byPriority": [
      { "priority": "CRITICAL", "count": 15, "percentage": 9.6 },
      { "priority": "HIGH", "count": 45, "percentage": 28.8 },
      { "priority": "MEDIUM", "count": 68, "percentage": 43.6 },
      { "priority": "LOW", "count": 28, "percentage": 17.9 }
    ],
    "monthlyTrend": [
      { "month": "2023-08", "orders": 12, "revenue": 180000000 },
      { "month": "2023-09", "orders": 15, "revenue": 225000000 },
      { "month": "2023-10", "orders": 18, "revenue": 270000000 },
      { "month": "2023-11", "orders": 22, "revenue": 330000000 },
      { "month": "2023-12", "orders": 28, "revenue": 420000000 },
      { "month": "2024-01", "orders": 35, "revenue": 525000000 }
    ]
  }
}
```

## 🔍 Advanced Search

### Full-text Search
```http
GET /api/orders/search?q=máy phát điện
```

#### Response
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "order-001",
        "number": "ORD-2024-001",
        "name": "Giám định máy phát điện 1250KVA",
        "description": "Kiểm tra máy phát điện Caterpillar",
        "relevanceScore": 0.95
      }
    ],
    "total": 1,
    "searchTime": 0.045
  }
}
```

## 📝 Validation Rules

### Required Fields
- `name` (string, max 255 characters)
- `companyId` (string, must exist)
- `priority` (enum)
- `deadline` (ISO 8601 date, future date)
- `location` (string, max 500 characters)
- `contactPerson` (string, max 100 characters)
- `contactPhone` (string, valid phone format)
- `contactEmail` (string, valid email format)

### Optional Fields
- `description` (string, max 2000 characters)
- `assignedTo` (string, must exist if provided)
- `estimatedValue` (number, min 0)
- `actualValue` (number, min 0)

### Business Rules
- Order numbers are auto-generated: `ORD-YYYY-NNN`
- Progress must be 0-100
- Deadline cannot be in the past
- Only users with INSPECTOR role or higher can be assigned
- Status transitions follow workflow rules

## 🚨 Error Responses

### Validation Error (422)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format",
        "value": "invalid-email"
      },
      {
        "field": "deadline",
        "message": "Deadline must be in the future",
        "value": "2024-01-01T00:00:00Z"
      }
    ]
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Order not found",
    "details": {
      "orderId": "order-999"
    }
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "details": {
      "requiredPermission": "orders:read"
    }
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

## 🔄 Webhook Events

### Order Events
- `order.created` - New order created
- `order.updated` - Order updated
- `order.status_changed` - Order status changed
- `order.assigned` - Order assigned to user
- `order.completed` - Order completed
- `order.cancelled` - Order cancelled

### Webhook Payload
```json
{
  "event": "order.status_changed",
  "data": {
    "orderId": "order-001",
    "oldStatus": "IN_PROGRESS",
    "newStatus": "COMPLETED",
    "timestamp": "2024-01-20T10:30:00Z",
    "userId": "user-003"
  }
}
```

## 📝 Code Examples

### JavaScript/TypeScript
```typescript
// Get all orders
const response = await fetch('/api/orders?status=IN_PROGRESS&priority=HIGH')
const data = await response.json()

// Create new order
const newOrder = {
  name: "Giám định máy biến áp",
  companyId: "comp-001",
  priority: "HIGH",
  deadline: "2024-02-01T17:00:00Z",
  // ... other fields
}

const createResponse = await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token'
  },
  body: JSON.stringify(newOrder)
})

const result = await createResponse.json()
```

### cURL
```bash
# Get orders
curl -X GET "http://localhost:3000/api/orders?page=1&limit=10" \
  -H "Authorization: Bearer your-token"

# Create order
curl -X POST "http://localhost:3000/api/orders" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "name": "Giám định máy phát điện",
    "companyId": "comp-001",
    "priority": "HIGH",
    "deadline": "2024-02-01T17:00:00Z"
  }'
```

---

© 2024 EMS SOLUTION - API Documentation for Nghiệp Đoàn DC