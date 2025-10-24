'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  Plus, 
  Download, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  RefreshCw
} from 'lucide-react'

interface Column {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  title: string
  data: any[]
  columns: Column[]
  onAdd?: () => void
  onEdit?: (item: any) => void
  onDelete?: (item: any) => void
  onView?: (item: any) => void
  onExport?: () => void
  searchable?: boolean
  filterable?: boolean
  pagination?: boolean
}

export function DataTable({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  onView,
  onExport,
  searchable = true,
  filterable = true,
  pagination = true
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter data based on search term
  const filteredData = data.filter(item => {
    if (!searchTerm) return true
    return columns.some(column => {
      const value = item[column.key]
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = pagination 
    ? sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : sortedData

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return null
    return sortDirection === 'asc' ? '↑' : '↓'
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-medium">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            {onExport && (
              <Button variant="outline" size="sm" onClick={onExport} className="text-[13px]">
                <Download className="w-4 h-4 mr-2" />
                Xuất
              </Button>
            )}
            {onAdd && (
              <Button size="sm" onClick={onAdd} className="text-[13px]">
                <Plus className="w-4 h-4 mr-2" />
                Thêm mới
              </Button>
            )}
          </div>
        </div>
        
        {searchable && (
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {filterable && (
              <Button variant="outline" size="sm" className="text-[13px]">
                <Filter className="w-4 h-4 mr-2" />
                Lọc
              </Button>
            )}
            <Button variant="outline" size="sm" className="text-[13px]">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="table-responsive">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className="text-[13px] whitespace-nowrap">
                    {column.sortable ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-semibold text-[13px]"
                        onClick={() => handleSort(column.key)}
                      >
                        {column.label}
                        <span className="ml-1">{getSortIcon(column.key)}</span>
                      </Button>
                    ) : (
                      column.label
                    )}
                  </TableHead>
                ))}
                <TableHead className="text-[13px] w-20 whitespace-nowrap">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow 
                  key={index} 
                  className="hover:bg-slate-50 cursor-pointer"
                  onClick={() => onView && onView(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className="text-[13px] whitespace-nowrap">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </TableCell>
                  ))}
                  <TableCell className="text-[13px] whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(row)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Sao chép
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {onDelete && (
                          <DropdownMenuItem 
                            onClick={() => onDelete(row)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {pagination && totalPages > 1 && (
          <div className="pagination-responsive mt-4">
            <div className="text-[13px] text-slate-600">
              Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến {Math.min(currentPage * itemsPerPage, sortedData.length)} của {sortedData.length} mục
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="button-responsive text-[13px]"
              >
                Trước
              </Button>
              <span className="text-[13px]">
                Trang {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="button-responsive text-[13px]"
              >
                Sau
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}