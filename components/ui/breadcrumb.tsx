'use client'

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

const Breadcrumb = ({admin}: {admin?: boolean}) => {
    const pathname = usePathname()
    const link = pathname.split("/")
    const params = useParams()
    link.shift()
    

    const getLink = (index: number) => {
        const result = link.slice(0, index + 1)        
        const data = result.join('/')

        return `/${data}`
    }
    
  return (
    <div className="flex items-center justify-center gap-2">
        <Link href={admin ? '/admin' : '/'}>
            <Home className="text-sky-700 w-4 h-4" />
        </Link>
        <ChevronRight className="w-3 h-3 font-extralight text-slate-500" />
        {link.map((item, index) => (
            <div key={item} className="flex items-center justify-center gap-2">
                {index === link.length - 1 ? (
                    <div className="capitalize text-slate-600 dark:text-slate-300">
                        {!params.id ? item : params.id === 'add' ? 'add' : 'edit'}
                    </div>
                ) : (
                    <>
                        <Link 
                            className="capitalize text-sky-600"
                            href={getLink(index)}
                        >
                            {item}
                        </Link>
                        <ChevronRight className="w-3 h-3 font-extralight text-slate-500" />
                    </>
                )}
            </div>
        ))}
    </div>
  )
}

export default Breadcrumb