'use client'

import { ColumnDef } from "@tanstack/react-table"

import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import TitleBreadcrumb from '@/components/ui/title-breadcrumb'
import { CellAction } from "@/components/ui/cell-action"
import { useSearchParams } from "next/navigation"
import { useModal } from "@/hooks/use-modal"

export default function CategoriesClientPage() {
    const url = '/api/admin/users'
    const { isOpen, onOpen, setData } = useModal()

    const searchParams = useSearchParams()

    const perPage = (searchParams.get('take')) ?? 10
    const page = searchParams.get('page') ?? 1

    interface CategoriesProps {
        id: string
        name: string
        slug: string
        code: string
    }

    const handleOnOpen = () => {
        onOpen()
        setData({tes: 'Ini tes'})
    }

    console.log(isOpen);
    

    const columns: ColumnDef<CategoriesProps>[] = [
        {
            accessorKey: "number",
            header: "No.",
            cell: ({row}) => row.index + 1 + (Number(page) - 1) * Number(perPage)
        },
        {
            accessorKey: "name",
            header: "Name"
        },
        {
            accessorKey: "username",
            header: "Username"
        },
        {
            accessorKey: "email",
            header: "Email"
        },
        {
            accessorKey: "actions",
            cell: ({row}) => <CellAction data={row.original} url={url} onOpen={handleOnOpen} />
        }
    ]

    return (
        <>
            <TitleBreadcrumb title='Kategori' />
            <Card>
                <CardContent>
                    <DataTable
                        clickAdd={onOpen}
                        apiUrl={url}
                        columns={columns}
                    />
                </CardContent>
            </Card>
        </>
    )
}
