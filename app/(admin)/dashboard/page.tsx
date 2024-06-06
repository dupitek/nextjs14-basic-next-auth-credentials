'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <div>
        <div>Dashboard</div>
        <Button
            onClick={() => signOut()}
        >
            Logout
        </Button>
    </div>
  )
}
