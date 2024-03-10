import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type WindowsButtonProps = ComponentProps<'button'>

export const WindowsButton = ({ className, children, ...props }: WindowsButtonProps) => {
  return (
    <button
      className={twMerge('w-10 h-8 cursor-pointer hover:bg-zinc-600/80 leading-10', className)}
      {...props}
    >
      {children}
    </button>
  )
}
