'use client'

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ArrowBigLeftDash } from "lucide-react"
import Breadcrumb from "@/components/ui/breadcrumb"

interface Props {
    title: string
    link?: string
}

const TitleBreadcrumb = ({title, link}: Props) => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-start gap-4 mx-4 mb-4 md:items-center md:flex-row md:justify-between">
            {link ? (
                <Button
                    onClick={() => router.push(link)}
                    className="flex items-center gap-2 p-2 bg-sky-500 hover:bg-sky-600"
                >
                    <ArrowBigLeftDash className="w-5 h-5" />
                    <div>{title}</div>
                </Button>
            ) : (
                <div className="text-3xl font-bold text-sky-600">
                    {title}
                </div>
            )}
            <Breadcrumb />
        </div>
    )
}

export default TitleBreadcrumb