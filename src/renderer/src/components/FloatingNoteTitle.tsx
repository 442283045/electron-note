import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type FloatingNoteTitleProps = ComponentProps<'div'>

export const FloatingNoteTitle = ({ className, ...props }: FloatingNoteTitleProps) => {
  const note = useAtomValue(selectedNoteAtom)
  if (!note) return <></>
  return (
    <div className={twMerge('flex justify-center sticky top-2', className)} {...props}>
      <span className="text-gray-400">{note.title}</span>
    </div>
  )
}
