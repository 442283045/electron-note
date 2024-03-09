import { NotePreview } from '@/components'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '@/hooks/useNotesList'
import { ComponentProps } from 'react'
export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}
export const NotePreviewList = ({ onSelect }: NotePreviewListProps) => {
  const { handleNoteSelect, notes, selectedNoteIndex } = useNotesList({ onSelect })
  if (notes.length === 0) {
    return <ul className={twMerge('text-center pt-4')}>No Notes Yet</ul>
  }
  return (
    <ul>
      {notes.map((note, index) => (
        <NotePreview
          onClick={handleNoteSelect(index)}
          key={note.title + note.lastEditTime}
          isActive={index === selectedNoteIndex}
          {...note}
        ></NotePreview>
      ))}
    </ul>
  )
}
