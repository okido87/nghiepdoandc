'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AppLayout } from '@/components/app-layout'
import { UsersView } from '@/components/views/users-view'
import { 
  FileCheck, 
  ClipboardList, 
  CheckSquare, 
  FileText, 
  TrendingUp, 
  Users,
  Clock,
  AlertTriangle,
  Calendar,
  Building,
  Eye,
  Edit,
  BarChart3,
  Activity,
  Timer,
  CheckCircle
} from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  // Compact KPI data
  const statsData = [
    { title: 'Orders', value: '156', change: '+12%', icon: FileCheck, color: 'text-blue-600' },
    { title: 'Tài sản', value: '89', change: '+8%', icon: ClipboardList, color: 'text-green-600' },
    { title: 'Task', value: '234', change: '+15%', icon: CheckSquare, color: 'text-purple-600' },
    { title: 'Báo cáo', value: '67', change: '+22%', icon: FileText, color: 'text-orange-600' }
  ]

  // Recent orders with compact display
  const recentOrders = [
    { 
      id: 1, 
      number: 'ORD-2024-001', 
      name: 'Giám định máy phát điện', 
      status: 'Đã duyệt', 
      company: 'Công ty ABC', 
      progress: 100,
      deadline: '2024-01-20',
      isOverdue: false
    },
    { 
      id: 2, 
      number: 'ORD-2024-002', 
      name: 'Kiểm tra hệ thống điện', 
      status: 'Đang xử lý', 
      company: 'Công ty XYZ', 
      progress: 65,
      deadline: '2024-01-18',
      isOverdue: false
    },
    { 
      id: 3, 
      number: 'ORD-2024-003', 
      name: 'Giám định thiết bị nâng', 
      status: 'Chờ duyệt', 
      company: 'Công ty DEF', 
      progress: 30,
      deadline: '2024-01-16',
      isOverdue: true
    }
  ]

  // Quick actions
  const quickActions = [
    { title: 'Tạo Order', icon: FileCheck, color: 'bg-blue-500', route: '/orders' },
    { title: 'Tạo báo cáo', icon: FileText, color: 'bg-green-500', route: '/reports' },
    { title: 'Lập kế hoạch', icon: Calendar, color: 'bg-purple-500', route: '/plans' },
    { title: 'Tạo task', icon: CheckSquare, color: 'bg-orange-500', route: '/tasks' }
  ]

  // Recent activities
  const recentActivities = [
    { user: 'Nguyễn Văn A', action: 'đã duyệt Order', target: 'ORD-2024-001', time: '5 phút trước', avatar: 'NA' },
    { user: 'Trần Thị B', action: 'đã tạo báo cáo', target: 'Kiểm tra hệ thống điện', time: '15 phút trước', avatar: 'TB' },
    { user: 'Lê Văn C', action: 'đã hoàn thành task', target: 'Khảo sát hiện trường', time: '1 giờ trước', avatar: 'LC' },
    { user: 'Admin', action: 'đã phân công', target: 'Giám định viên cho ORD-2024-004', time: '2 giờ trước', avatar: 'AD' }
  ]

  // Status overview
  const statusOverview = [
    { label: 'Đã hoàn thành', value: 45, color: 'bg-green-500' },
    { label: 'Đang xử lý', value: 30, color: 'bg-blue-500' },
    { label: 'Chờ duyệt', value: 15, color: 'bg-yellow-500' },
    { label: 'Quá hạn', value: 10, color: 'bg-red-500' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã duyệt': return 'bg-green-100 text-green-800'
      case 'Đang xử lý': return 'bg-blue-100 text-blue-800'
      case 'Chờ duyệt': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleTabChange = (value: string) => {
    if (value !== 'overview') {
      // Navigate to the corresponding page
      const routeMap: { [key: string]: string } = {
        'orders': '/orders',
        'plans': '/plans',
        'rasci': '/rasci',
        'reports': '/reports',
        'users': '/users',
        'partners': '/partners',
        'branches': '/branches',
        'permissions': '/permissions',
        'master-data': '/master-data'
      }
      
      const route = routeMap[value]
      if (route) {
        router.push(route)
        return
      }
    }
    setActiveTab(value)
  }

  return (
    <AppLayout>
      <div className="space-y-3">
        {/* Compact KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statsData.map((stat, index) => (
            <Card key={index} className="border-[#D1E5F0] bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-[13px] text-[#6B7280] mb-1">{stat.title}</p>
                    <p className="text-[20px] font-semibold text-[#1A365D]">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-[13px] text-green-500">{stat.change}</span>
                      <span className="text-[13px] text-[#6B7280]">vs tháng trước</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-[#E8F1FA] rounded-full flex items-center justify-center ml-2">
                    <stat.icon className={`w-4 h-4 ${stat.color.replace('text-', 'text-')}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-3">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-10 h-8 text-[13px]">
            <TabsTrigger value="overview" className="text-[13px]">Tổng quan</TabsTrigger>
            <TabsTrigger value="orders" className="text-[13px]">Orders</TabsTrigger>
            <TabsTrigger value="plans" className="text-[13px]">Kế hoạch</TabsTrigger>
            <TabsTrigger value="rasci" className="text-[13px]">Nhân sự</TabsTrigger>
            <TabsTrigger value="reports" className="text-[13px]">Báo cáo</TabsTrigger>
            <TabsTrigger value="users" className="text-[13px]">Users</TabsTrigger>
            <TabsTrigger value="partners" className="text-[13px]">Đối tác</TabsTrigger>
            <TabsTrigger value="branches" className="text-[13px]">Chi nhánh</TabsTrigger>
            <TabsTrigger value="permissions" className="text-[13px]">Phân quyền</TabsTrigger>
            <TabsTrigger value="master-data" className="text-[13px]">Master Data</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-[15px]">Thao tác nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickActions.map((action, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start h-8 text-[13px]"
                      onClick={() => router.push(action.route)}
                    >
                      <div className={`w-4 h-4 rounded ${action.color} flex items-center justify-center mr-2`}>
                        <action.icon className="w-3 h-3 text-white" />
                      </div>
                      {action.title}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm-plus">Hoạt động gần đây</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs-plus">{activity.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs-plus text-slate-900">
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-slate-600"> {activity.action} </span>
                            <span className="font-medium">{activity.target}</span>
                          </p>
                          <p className="text-xs-plus text-slate-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Status Overview */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm-plus">Tình trạng chung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {statusOverview.map((status, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${status.color}`}></div>
                          <span className="text-xs-plus">{status.label}</span>
                        </div>
                        <span className="text-xs-plus font-medium">{status.value}%</span>
                      </div>
                    ))}
                    <div className="pt-2">
                      <Progress value={75} className="h-2" />
                      <p className="text-xs-plus text-slate-500 mt-1">75% hoàn thành</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compact Recent Orders */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm-plus">Orders gần đây</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => router.push('/orders')} className="text-xs-plus">Xem tất cả</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs-plus font-medium">{order.number}</span>
                          <Badge className={`text-xs-plus ${getStatusColor(order.status)}`}>
                            {order.status}
                          </Badge>
                          {order.isOverdue && (
                            <Badge variant="destructive" className="text-xs-plus">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Quá hạn
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs-plus text-slate-600 mt-1">{order.name}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs-plus text-slate-500">{order.company}</span>
                          <span className="text-xs-plus text-slate-500">Deadline: {order.deadline}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <Progress value={order.progress} className="h-1 w-16" />
                          <p className="text-xs-plus text-slate-500 mt-1">{order.progress}%</p>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs (simplified) */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm-plus">Quản lý Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs-plus text-slate-600">Nội dung quản lý Orders sẽ được hiển thị tại đây.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm-plus">Kế hoạch giám định</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs-plus text-slate-600">Nội dung kế hoạch giám định sẽ được hiển thị tại đây.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rasci">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm-plus">Nhân sự RASCI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs-plus text-slate-600">Quản lý nhân sự và ma trận phân công theo PDCA sẽ được hiển thị tại đây.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm-plus">Báo cáo hiện trường</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs-plus text-slate-600">Nội dung báo cáo hiện trường sẽ được hiển thị tại đây.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <UsersView />
          </TabsContent>

          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm-plus">Phân quyền</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs-plus text-slate-600">Nội dung phân quyền sẽ được hiển thị tại đây.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="master-data">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm-plus">Cài đặt Master Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs-plus text-slate-600">Nội dung master data sẽ được hiển thị tại đây.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm-plus">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs-plus text-slate-600">Timeline công việc sẽ được hiển thị tại đây.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}