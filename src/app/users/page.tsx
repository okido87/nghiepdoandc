'use client'

import { UsersView } from '@/components/views/users-view'
import { AppLayout } from '@/components/app-layout'

export default function UsersPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-[#F8FBFF] p-2">
        <UsersView />
      </div>
    </AppLayout>
  )
}