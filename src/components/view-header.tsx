'use client'

import { ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'

interface ViewHeaderProps {
  title: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  actions?: ReactNode
  children?: ReactNode // slot for filters or extra controls
  className?: string
}

export function ViewHeader({
  title,
  searchValue = '',
  onSearchChange,
  actions,
  children,
  className,
}: ViewHeaderProps) {
  return (
    <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 ${className ?? ''}`}>
      <h1 className="text-2xl font-bold text-[#1A365D]">{title}</h1>
      <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
        {onSearchChange && (
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748B]" />
            <Input
              placeholder="Tìm kiếm..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-[#D1E5F0]"
            />
          </div>
        )}
        {children}
        {actions}
      </div>
    </div>
  )
}