import { AdminNavbar } from '@/components/admin/view/admin-navbar'
import AdminSidebar from '@/components/admin/view/admin-sidebar'
import React from 'react'

export default async function AdminLayout({
    children
}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 w-full h-full min-h-screen gap-2 lg:pl-64">
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="flex flex-col w-full min-h-full px-2 pt-2 gap-y-4">
          <AdminNavbar />
          <div className='mb-auto'>
            {children}
          </div>
          <div className="pb-6">
              <div className="text-sm text-center text-slate-500">
                © 2024 Shanumdev | All Rights Reserved
              </div>
          </div>
        </div>
    </div>
  )
}
