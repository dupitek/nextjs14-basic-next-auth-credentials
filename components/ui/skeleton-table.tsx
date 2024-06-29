'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonTable = () => {
  return (
    <div className='flex flex-col justify-center gap-2'>
        <div className='flex items-center justify-center w-full gap-2'>
            <Skeleton className='w-[80px] h-[50px]' />
            <Skeleton className='w-full h-[50px]' />
            <Skeleton className='w-full h-[50px]' />
        </div>
        <div className='flex items-center justify-center w-full gap-2'>
            <Skeleton className='w-[80px] h-[50px]' />
            <Skeleton className='w-full h-[50px]' />
            <Skeleton className='w-full h-[50px]' />
        </div>
        <div className='flex items-center justify-center w-full gap-2'>
            <Skeleton className='w-[80px] h-[50px]' />
            <Skeleton className='w-full h-[50px]' />
            <Skeleton className='w-full h-[50px]' />
        </div>
        <div className='flex items-center justify-center w-full gap-2'>
            <Skeleton className='w-[80px] h-[50px]' />
            <Skeleton className='w-full h-[50px]' />
            <Skeleton className='w-full h-[50px]' />
        </div>
    </div>
  )
}

export default SkeletonTable