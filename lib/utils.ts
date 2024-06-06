import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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

export default slug
