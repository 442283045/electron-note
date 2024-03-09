import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type FloatingNoteTitleProps = ComponentProps<'div'>

export const FloatingNoteTitle = ({ className, ...props }: FloatingNoteTitleProps) => {
  const note = useAtomValue(selectedNoteAtom)
  console.log(note)

  const title = note ? note.title : ''
  return (
    <div className={twMerge('flex justify-center sticky top-2', className)} {...props}>
      <span className="text-gray-400">{title}</span>
    </div>
  )
}