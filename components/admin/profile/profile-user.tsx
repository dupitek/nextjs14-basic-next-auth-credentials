'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const ProfileUser = () => {
  const { data } = useSession()
  
  const user = data?.user
  if (!user) {
    return null
  }
  
  return (
    <Card className='w-full md:w-[400px] pt-6'>
      <CardContent className='flex flex-col items-center justify-center'>
        <div className='text-xl text-sky-700 font-bold'>{String(user.name).toUpperCase()}</div>
        <div className='-mt-1 text-slate-400'>{`@${user.username}`}</div>
        <Image
          src={user?.image ? user.image : "/profile.png"}
          alt={user?.name as string}
          width={100}
          height={100}
          className='rounded-full mt-4'
        />
        <div className='mt-2 p-1 rounded-lg bg-green-700 text-xs text-slate-100 dark:text-slate-300'>{user.role}</div>
      </CardContent>
    </Card>
  )
}

export default ProfileUser