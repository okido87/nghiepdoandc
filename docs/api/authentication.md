# 🔐 Authentication API Documentation

API endpoints for authentication and authorization in WebApp Quản Lý Giám Định Nghiệp Đoàn DC.

## 🔗 Base URL
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/register
POST   /api/auth/refresh
GET    /api/auth/me
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

## 🔑 Authentication Methods

### 📧 Email & Password
Default authentication method using email and password.

### 🔑 JWT Token
JSON Web Token for API authentication.

### 🔄 Refresh Token
Long-lived token for obtaining new JWT tokens.

## 📊 Data Models

### Login Request
```typescript
interface LoginRequest {
  email: string      // User email
  password: string   // User password
  rememberMe?: boolean // Remember login session
}
```

### Login Response
```typescript
interface LoginResponse {
  success: boolean
  data: {
    user: {
      id: string
      email: string
      name: string
      role: UserRole
      avatar?: string
      permissions: string[]
    }
    tokens: {
      accessToken: string    // JWT token (15 min)
      refreshToken: string   // Refresh token (7 days)
      expiresIn: number      // Token expiry in seconds
    }
  }
  message: string
}
```

### User Object
```typescript
interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: UserRole
  department: string
  position: string
  avatar?: string
  status: UserStatus
  createdAt: string
  updatedAt: string
  lastLogin?: string
  permissions: string[]
}
```

### Enums
```typescript
type UserRole = 'ADMIN' | 'MANAGER' | 'SUPERVISOR' | 'INSPECTOR' | 'USER'
type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
```

## 🚀 API Endpoints

### 🔐 Login
```http
POST /api/auth/login
```

#### Request Body
```json
{
  "email": "admin@gpems.net",
  "password": "password123",
  "rememberMe": true
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-001",
      "email": "admin@gpems.net",
      "name": "Nguyễn Van Admin",
      "role": "ADMIN",
      "department": "IT",
      "position": "System Administrator",
      "avatar": "https://example.com/avatar.jpg",
      "status": "ACTIVE",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-20T08:00:00Z",
      "lastLogin": "2024-01-20T07:30:00Z",
      "permissions": [
        "orders:read",
        "orders:write",
        "orders:delete",
        "users:read",
        "users:write",
        "users:delete",
        "system:admin"
      ]
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 900
    }
  },
  "message": "Login successful"
}
```

### 📝 Register
```http
POST /api/auth/register
```

#### Request Body
```json
{
  "email": "newuser@gpems.net",
  "password": "password123",
  "name": "Nguyễn Văn Mới",
  "phone": "0901234567",
  "department": "Inspection",
  "position": "Inspector"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-002",
      "email": "newuser@gpems.net",
      "name": "Nguyễn Văn Mới",
      "phone": "0901234567",
      "role": "USER",
      "department": "Inspection",
      "position": "Inspector",
      "status": "ACTIVE",
      "createdAt": "2024-01-20T10:30:00Z",
      "updatedAt": "2024-01-20T10:30:00Z",
      "permissions": [
        "orders:read",
        "reports:read"
      ]
    }
  },
  "message": "User registered successfully"
}
```

### 🔄 Refresh Token
```http
POST /api/auth/refresh
```

#### Request Body
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 900
    }
  },
  "message": "Token refreshed successfully"
}
```

### 👤 Get Current User
```http
GET /api/auth/me
```

#### Headers
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-001",
      "email": "admin@gpems.net",
      "name": "Nguyễn Van Admin",
      "role": "ADMIN",
      "department": "IT",
      "position": "System Administrator",
      "avatar": "https://example.com/avatar.jpg",
      "status": "ACTIVE",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-20T08:00:00Z",
      "lastLogin": "2024-01-20T07:30:00Z",
      "permissions": [
        "orders:read",
        "orders:write",
        "orders:delete",
        "users:read",
        "users:write",
        "users:delete",
        "system:admin"
      ]
    }
  }
}
```

### 🚪 Logout
```http
POST /api/auth/logout
```

#### Request Body
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### 📧 Forgot Password
```http
POST /api/auth/forgot-password
```

#### Request Body
```json
{
  "email": "admin@gpems.net"
}
```

#### Response
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

### 🔧 Reset Password
```http
POST /api/auth/reset-password
```

#### Request Body
```json
{
  "token": "reset-token-here",
  "newPassword": "newPassword123"
}
```

#### Response
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

## 🔐 Authorization & Permissions

### Role-Based Access Control (RBAC)

#### ADMIN
- Full system access
- User management
- System configuration
- All permissions

#### MANAGER
- Order management
- Report approval
- Team management
- Most permissions except system admin

#### SUPERVISOR
- Order assignment
- Report review
- Team supervision
- Limited management permissions

#### INSPECTOR
- Order execution
- Report creation
- Basic permissions

#### USER
- Read-only access
- Limited permissions

### Permission System

#### Format
```
resource:action
```

#### Resources
- `orders` - Order management
- `users` - User management
- `reports` - Report management
- `assets` - Asset management
- `companies` - Company management
- `system` - System administration

#### Actions
- `read` - View/access
- `write` - Create/edit
- `delete` - Delete
- `admin` - Administrative actions

#### Permission Examples
```typescript
const permissions = {
  // Order permissions
  'orders:read': true,      // View orders
  'orders:write': true,     // Create/edit orders
  'orders:delete': false,   // Cannot delete orders
  
  // User permissions
  'users:read': true,       // View users
  'users:write': false,     // Cannot create/edit users
  'users:delete': false,    // Cannot delete users
  
  // System permissions
  'system:admin': false     // No system admin access
}
```

## 🔒 Security Features

### 🛡️ Password Security
- Minimum 8 characters
- Must contain uppercase, lowercase, numbers
- Hashed using bcrypt
- Password history tracking

### 🚦 Rate Limiting
- Login attempts: 5 per 15 minutes
- Registration: 3 per hour
- Password reset: 3 per hour

### 🔐 Session Management
- JWT tokens with 15-minute expiry
- Refresh tokens with 7-day expiry
- Secure token storage
- Automatic token refresh

### 🌐 Secure Headers
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

## 📝 Validation Rules

### Email Validation
- Valid email format
- Unique email address
- Domain verification (optional)

### Password Validation
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character
- Cannot contain email address
- Cannot be common passwords

### Name Validation
- Required field
- 2-100 characters
- Valid characters only
- No special characters

## 🚨 Error Responses

### Invalid Credentials (401)
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

### Account Locked (423)
```json
{
  "success": false,
  "error": {
    "code": "ACCOUNT_LOCKED",
    "message": "Account temporarily locked due to too many failed attempts",
    "details": {
      "unlockTime": "2024-01-20T10:45:00Z",
      "remainingTime": 900
    }
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

### Token Expired (401)
```json
{
  "success": false,
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Access token has expired",
    "details": {
      "expiredAt": "2024-01-20T10:15:00Z"
    }
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

### Insufficient Permissions (403)
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You don't have permission to perform this action",
    "details": {
      "requiredPermission": "users:delete",
      "userRole": "INSPECTOR"
    }
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

## 🔄 Integration Examples

### Frontend Integration
```typescript
// Auth service
class AuthService {
  async login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    const data = await response.json()
    if (data.success) {
      localStorage.setItem('accessToken', data.data.tokens.accessToken)
      localStorage.setItem('refreshToken', data.data.tokens.refreshToken)
      return data.data.user
    }
    throw new Error(data.error.message)
  }
  
  async logout() {
    const refreshToken = localStorage.getItem('refreshToken')
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    })
    
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
  
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    })
    
    const data = await response.json()
    if (data.success) {
      localStorage.setItem('accessToken', data.data.tokens.accessToken)
      localStorage.setItem('refreshToken', data.data.tokens.refreshToken)
    }
  }
}
```

### API Client with Auth
```typescript
class ApiClient {
  private baseURL = '/api'
  
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('accessToken')
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
    
    let response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers
    })
    
    // Handle token refresh
    if (response.status === 401) {
      await this.authService.refreshToken()
      const newToken = localStorage.getItem('accessToken')
      response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newToken}`
        }
      })
    }
    
    return response.json()
  }
  
  async getOrders() {
    return this.request('/orders')
  }
  
  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    })
  }
}
```

## 📊 Monitoring & Logging

### Authentication Events
- Login attempts (success/failure)
- Password changes
- Permission changes
- Token refresh
- Account lock/unlock

### Security Metrics
- Failed login attempts per IP
- Account lockouts
- Suspicious activity detection
- Token usage patterns

---

© 2024 EMS SOLUTION - Authentication API Documentation for Nghiệp Đoàn DC