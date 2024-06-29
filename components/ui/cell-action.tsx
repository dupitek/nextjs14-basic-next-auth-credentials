'use client'

import { useSWRConfig } from 'swr'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios'

import { AlertModal } from '@/components/ui/alert-modal'
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    data: any
    url: string
    onOpen?: () => void
    id?: string
    push?: string
}

export const CellAction = (
    {data, url, onOpen, id, push}: Props
) => {
    const { mutate } = useSWRConfig()
    const router = useRouter()
    const searchParams = useSearchParams()

    const search = searchParams.get('search') ?? ""
    const take = searchParams.get('take') ?? 10
    const page = searchParams.get('page') ?? 1

    const apiUrl = `${url}?search=${search}&page=${page}&take=${take}`

    const onConfirm = async () => {
        try {
           const res = await axios.delete(`${url}/${data.id}`)
           toast.success(res.data.message)
           mutate(apiUrl)
        } catch (error: any) {
            toast.error("Gagal menghapus data")
        }
    }

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Berhasil mengcopy ID")
    }

    const onEdit = () => {
        if (push) {
            router.push(push)
        }
        if (onOpen) {
            onOpen()
        }
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className='outline-none'>
                    <Button variant="ghost" className='w-8 p-0 outline-none h--8 active:border-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='w-4 h-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='z-50 outline-none'>
                    <DropdownMenuItem>
                        <Button onClick={() => onCopy(data.id)} variant="ghost">
                            <Copy className='w-4 h-4 mr-2' />Copy Id
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button onClick={onEdit} variant="ghost">
                            <Edit className='w-4 h-4 mr-2' />Update
                        </Button>
                    </DropdownMenuItem>
                    <div className='ml-2'>
                        <AlertModal onConfirm={onConfirm}>
                            <Button variant="ghost" className='flex gap-1'>
                                <Trash className='w-4 h-4 mr-2' />Delete
                            </Button>
                        </AlertModal>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}