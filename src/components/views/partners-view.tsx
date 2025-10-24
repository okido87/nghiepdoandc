'use client'

import { useState } from 'react'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPlus, Edit, Trash2, Eye, Building, Users, Package, Handshake } from 'lucide-react'

// Demo data for Partners
const partnersData = {
  customers: [
    { id: 1, name: 'Công ty TNHH ABC', email: 'contact@abc.com', phone: '0901234567', address: '123 Nguyễn Huệ, Q.1, TP.HCM', contactPerson: 'Nguyễn Văn A', taxCode: '0101234567', status: 'Active', joinDate: '2022-01-15', totalOrders: 25, totalValue: '2.5 tỷ' },
    { id: 2, name: 'Tập đoàn XYZ', email: 'info@xyz.com', phone: '0902345678', address: '456 Lê Lợi, Q.3, TP.HCM', contactPerson: 'Trần Thị B', taxCode: '0102345678', status: 'Active', joinDate: '2022-03-20', totalOrders: 18, totalValue: '1.8 tỷ' },
    { id: 3, name: 'Công ty Cổ phần DEF', email: 'def@company.com', phone: '0903456789', address: '789 Đồng Khởi, Q.1, TP.HCM', contactPerson: 'Lê Văn C', taxCode: '0103456789', status: 'Inactive', joinDate: '2022-05-10', totalOrders: 12, totalValue: '1.2 tỷ' },
    { id: 4, name: 'Doanh nghiệp GHI', email: 'ghi@enterprise.com', phone: '0904567890', address: '321 Võ Văn Kiệt, Q.5, TP.HCM', contactPerson: 'Phạm Thị D', taxCode: '0104567890', status: 'Active', joinDate: '2022-07-15', totalOrders: 30, totalValue: '3.0 tỷ' },
  ],
  suppliers: [
    { id: 5, name: 'Nhà cung cấp Thiết bị A', email: 'sales@equipment-a.com', phone: '0905678901', address: '654 Hai Bà Trưng, Q.3, TP.HCM', contactPerson: 'Hoàng Văn E', taxCode: '0105678901', status: 'Active', joinDate: '2022-09-01', totalOrders: 45, totalValue: '800 triệu' },
    { id: 6, name: 'Công ty Vật tư B', email: 'info@materials-b.com', phone: '0906789012', address: '987 Cách Mạng Tháng 8, Q.10, TP.HCM', contactPerson: 'Đỗ Thị F', taxCode: '0106789012', status: 'Active', joinDate: '2022-11-10', totalOrders: 32, totalValue: '650 triệu' },
    { id: 7, name: 'Nhà phân phối C', email: 'distributor@distr-c.com', phone: '0907890123', address: '147 Nguyễn Thị Minh Khai, Q.3, TP.HCM', contactPerson: 'Bùi Văn G', taxCode: '0107890123', status: 'Active', joinDate: '2023-01-05', totalOrders: 28, totalValue: '520 triệu' },
  ],
  collaborators: [
    { id: 8, name: 'Chuyên gia Giám định A', email: 'expert.a@inspection.com', phone: '0908901234', address: '258 Trần Hưng Đạo, Q.5, TP.HCM', contactPerson: 'Vũ Văn H', taxCode: '0108901234', status: 'Active', joinDate: '2023-02-15', totalOrders: 15, totalValue: '300 triệu' },
    { id: 9, name: 'Đội ngũ Kỹ thuật B', email: 'team.b@technical.com', phone: '0909012345', address: '369 Sư Vạn Hạnh, Q.10, TP.HCM', contactPerson: 'Đinh Thị I', taxCode: '0109012345', status: 'Active', joinDate: '2023-04-20', totalOrders: 20, totalValue: '400 triệu' },
    { id: 10, name: 'Cộng tác viên C', email: 'collab.c@partner.com', phone: '0900123456', address: '741 3 Tháng 2, Q.10, TP.HCM', contactPerson: 'Ngô Văn K', taxCode: '0100123456', status: 'Inactive', joinDate: '2023-06-10', totalOrders: 8, totalValue: '150 triệu' },
  ]
}

export function PartnersView() {
  const [partners, setPartners] = useState(partnersData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState<any>(null)
  const [viewingPartner, setViewingPartner] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('customers')

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    }
    return (
      <Badge className={variants[status] || 'bg-gray-100 text-gray-800'}>
        {status === 'Active' ? 'Hoạt động' : status === 'Inactive' ? 'Không hoạt động' : 'Chờ duyệt'}
      </Badge>
    )
  }

  const getColumns = (type: string) => {
    const baseColumns = [
      {
        key: 'name',
        label: 'Tên đối tác',
        sortable: true,
        render: (value: string, row: any) => (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              {type === 'customers' && <Users className="w-3 h-3 text-blue-600" />}
              {type === 'suppliers' && <Package className="w-3 h-3 text-green-600" />}
              {type === 'collaborators' && <Handshake className="w-3 h-3 text-purple-600" />}
            </div>
            <span className="font-medium">{value}</span>
          </div>
        )
      },
      {
        key: 'email',
        label: 'Email',
        sortable: true
      },
      {
        key: 'phone',
        label: 'Điện thoại',
        sortable: true
      },
      {
        key: 'contactPerson',
        label: 'Người liên hệ',
        sortable: true
      },
      {
        key: 'totalOrders',
        label: 'Số đơn hàng',
        sortable: true,
        render: (value: number) => <span className="font-medium">{value}</span>
      },
      {
        key: 'totalValue',
        label: 'Tổng giá trị',
        sortable: true,
        render: (value: string) => <span className="font-medium text-green-600">{value}</span>
      },
      {
        key: 'status',
        label: 'Trạng thái',
        sortable: true,
        render: (value: string) => getStatusBadge(value)
      }
    ]

    return baseColumns
  }

  const handleAdd = () => {
    setEditingPartner(null)
    setIsAddDialogOpen(true)
  }

  const handleEdit = (partner: any) => {
    setEditingPartner(partner)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (partner: any) => {
    if (confirm(`Bạn có chắc chắn muốn xóa đối tác "${partner.name}"?`)) {
      const currentData = partners[activeTab as keyof typeof partners]
      setPartners({
        ...partners,
        [activeTab]: currentData.filter((p: any) => p.id !== partner.id)
      })
    }
  }

  const handleView = (partner: any) => {
    setViewingPartner(partner)
  }

  const handleExport = () => {
    const currentData = partners[activeTab as keyof typeof partners]
    const columns = getColumns(activeTab)
    
    // CSV export logic
    const csv = [
      columns.map(c => c.label).join(','),
      ...currentData.map(partner => 
        columns.map(c => partner[c.key]).join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `partners-${activeTab}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'customers': return <Users className="w-4 h-4" />
      case 'suppliers': return <Package className="w-4 h-4" />
      case 'collaborators': return <Handshake className="w-4 h-4" />
      default: return <Building className="w-4 h-4" />
    }
  }

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'customers': return 'Khách hàng'
      case 'suppliers': return 'Nhà cung cấp'
      case 'collaborators': return 'Cộng tác viên'
      default: return tab
    }
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          {Object.keys(partners).map((tab) => (
            <TabsTrigger key={tab} value={tab} className="flex items-center gap-2">
              {getTabIcon(tab)}
              {getTabLabel(tab)}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(partners).map(([tab, data]) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <DataTable
              title={`Quản lý ${getTabLabel(tab)}`}
              data={data}
              columns={getColumns(tab)}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              onExport={handleExport}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* View Partner Dialog */}
      <Dialog open={!!viewingPartner} onOpenChange={() => setViewingPartner(null)}>
        <DialogContent className="dialog-responsive">
          <DialogHeader>
            <DialogTitle>Chi tiết đối tác</DialogTitle>
          </DialogHeader>
          {viewingPartner && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {activeTab === 'customers' && <Users className="w-6 h-6 text-blue-600" />}
                  {activeTab === 'suppliers' && <Package className="w-6 h-6 text-green-600" />}
                  {activeTab === 'collaborators' && <Handshake className="w-6 h-6 text-purple-600" />}
                </div>
                <div>
                  <h3 className="font-semibold">{viewingPartner.name}</h3>
                  <p className="text-sm text-slate-600">{viewingPartner.email}</p>
                  {getStatusBadge(viewingPartner.status)}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-slate-600">Người liên hệ</Label>
                  <p>{viewingPartner.contactPerson}</p>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Điện thoại</Label>
                  <p>{viewingPartner.phone}</p>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Mã số thuế</Label>
                  <p>{viewingPartner.taxCode}</p>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Ngày tham gia</Label>
                  <p>{viewingPartner.joinDate}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-xs text-slate-600">Địa chỉ</Label>
                  <p>{viewingPartner.address}</p>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Tổng đơn hàng</Label>
                  <p className="font-medium">{viewingPartner.totalOrders}</p>
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Tổng giá trị</Label>
                  <p className="font-medium text-green-600">{viewingPartner.totalValue}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingPartner(null)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Partner Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="dialog-responsive">
          <DialogHeader>
            <DialogTitle>{editingPartner ? 'Chỉnh sửa đối tác' : 'Thêm đối tác mới'}</DialogTitle>
            <DialogDescription>
              {editingPartner ? 'Cập nhật thông tin đối tác' : 'Điền thông tin để tạo đối tác mới'}
            </DialogDescription>
          </DialogHeader>
          <div className="form-responsive">
            <div className="form-grid-responsive">
              <Label htmlFor="name" className="text-right">
                Tên đối tác
              </Label>
              <Input
                id="name"
                defaultValue={editingPartner?.name || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={editingPartner?.email || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="phone" className="text-right">
                Điện thoại
              </Label>
              <Input
                id="phone"
                defaultValue={editingPartner?.phone || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="contactPerson" className="text-right">
                Người liên hệ
              </Label>
              <Input
                id="contactPerson"
                defaultValue={editingPartner?.contactPerson || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="taxCode" className="text-right">
                Mã số thuế
              </Label>
              <Input
                id="taxCode"
                defaultValue={editingPartner?.taxCode || ''}
                className="col-span-1"
              />
            </div>
            <div className="form-grid-responsive">
              <Label htmlFor="address" className="text-right">
                Địa chỉ
              </Label>
              <Input
                id="address"
                defaultValue={editingPartner?.address || ''}
                className="col-span-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              {editingPartner ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}