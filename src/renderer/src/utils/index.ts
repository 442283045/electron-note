import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}

const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short'
})

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)
