'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronsUpDown, Home, List, PersonStanding, PersonStandingIcon, Plus, School, Settings } from "lucide-react"
import { useSession } from "next-auth/react"

export const menu = [
    {
        name: 'Home',
        link: '/dashboard',
        icon: Home
    },
    {
        name: 'Jasa',
        link: '/dashboard/services',
        icon: School,
        settings: [
            {
                name: 'Semua Jasa',
                link: '/dashboard/services',
                icon: PersonStandingIcon,
            },
            {
                name: 'Kategori',
                link: '/dashboard/service-categories',
                icon: List,
            },
            {
                name: 'Tambah',
                link: '/dashboard/services/add',
                icon: Plus
            }
        ]
    },
    {
        name: 'Settings',
        link: '/dashboard/profile',
        icon: Settings,
        settings: [
            {
                name: 'Umum',
                link: '/dashboard/settings',
                icon: Settings,
            },
            {
                name: 'User',
                link: '/dashboard/settings/users',
                icon: PersonStanding,
            },
            {
                name: 'Profile',
                link: '/dashboard/settings/profile',
                icon: PersonStanding
            },
        ]
    },
]

const AdminSidebar = ({sheetClose}: {sheetClose?: boolean}) => {
    const pathname = usePathname()
    const {data} = useSession()
    
    return (
        <div className="bg-white dark:bg-slate-900">
            <aside id="sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform" aria-label="Sidebar">
                <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-white border-r border-slate-200 dark:border-slate-700 dark:bg-slate-900">
                    <Link href="#" className="flex items-center px-3 py-2 mb-10 rounded-lg text-slate-900 dark:text-white">
                        <svg className="w-5 h-5 text-sky-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></svg>
                        <span className="ml-3 text-base font-semibold">Shanum</span>
                    </Link>
                    <ul className="space-y-2 text-xs font-medium">
                        {menu.map((item) => (
                            sheetClose ?
                                <li key={item.name}>
                                    {item.settings ? (
                                        <Collapsible>
                                            <CollapsibleTrigger asChild>
                                                <div className="flex items-center justify-between px-3 rounded-lg cursor-pointer text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
                                                    <div className="flex items-center">
                                                        <item.icon className="text-sky-600 h-4 w-4" />
                                                        <h4 className="ml-3 whitespace-nowrap">
                                                            {item.name}
                                                        </h4>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="p-0 w-9">
                                                        <ChevronsUpDown className="w-4 h-4" />
                                                        <span className="sr-only">Toggle</span>
                                                    </Button>
                                                </div>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="pl-5 space-y-2">
                                                {item?.settings?.map((data) => (
                                                    <SheetClose key={data.link} asChild>
                                                        <Link href={data.link} className={cn(
                                                            "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700",
                                                            pathname === data.link && "bg-slate-100 cursor-default dark:bg-slate-700",
                                                        )}>
                                                            <data.icon className="text-sky-600 w-4 h-4" />
                                                            <span className="flex-1 ml-3 whitespace-nowrap">{data.name}</span>
                                                        </Link>
                                                    </SheetClose>
                                                ))}
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ) : (
                                        <SheetClose asChild>
                                            <Link href={item.link} className={cn(
                                                "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700",
                                                pathname === item.link && "bg-slate-100 cursor-default dark:bg-slate-700",
                                            )}>
                                                <item.icon className="text-sky-600 w-4 h-4" />
                                                <span className="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
                                            </Link>
                                        </SheetClose>
                                    )}
                                </li>
                                :
                                <li key={item.name}>
                                    {item.settings ? (
                                        <Collapsible>
                                            <CollapsibleTrigger asChild>
                                                <div className="flex items-center justify-between px-3 rounded-lg cursor-pointer text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
                                                    <div className="flex items-center">
                                                        <item.icon className="text-sky-600 h-4 w-4" />
                                                        <h4 className="ml-3 whitespace-nowrap">
                                                            {item.name}
                                                        </h4>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="p-0 w-9">
                                                        <ChevronsUpDown className="w-4 h-4" />
                                                        <span className="sr-only">Toggle</span>
                                                    </Button>
                                                </div>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="pl-5 space-y-2">
                                                {item?.settings?.map((data) => (
                                                    <Link key={data.link} href={data.link} className={cn(
                                                        "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700",
                                                        pathname === data.link && "bg-slate-100 cursor-default dark:bg-slate-700",
                                                    )}>
                                                        <data.icon className="text-sky-600 w-4 h-4" />
                                                        <span className="flex-1 ml-3 whitespace-nowrap">{data.name}</span>
                                                    </Link>
                                                ))}
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ) : (
                                        <Link href={item.link} className={cn(
                                            "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700",
                                            pathname === item.link && "bg-slate-100 cursor-default dark:bg-slate-700",
                                        )}>
                                            <item.icon className="text-sky-600 w-4 h-4" />
                                            <span className="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
                                        </Link>
                                    )}
                                </li>
                        ))}
                    </ul>
                    <div className="flex mt-auto">
                        <div className="flex justify-between w-full">
                        <span className="text-sm font-medium text-black dark:text-white">{data?.user.name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-roledescription="more menu" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-black dark:text-white" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                        </svg>
                        </div>
                    </div>
                </div>
            </aside>
        </div>

    )
}

export default AdminSidebar