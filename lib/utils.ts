import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import 'moment-timezone'
import 'moment/locale/id'
import moment from 'moment'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//convert title to slug
export const slug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

export function getApiUrl(url: string) {
  const apiUrl = String(process.env.NEXT_PUBLIC_BACKEND_URL)
  return `${apiUrl}${url}`
}

export function dateFormatted(schedule: Date | string) {
  return moment(schedule).format('DD MMMM YYYY')
}

export function rupiah(amount: number) {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
return formatted
}
