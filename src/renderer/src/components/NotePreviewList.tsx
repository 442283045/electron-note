import { notesMock } from '@/store/mocks'
import { NotePreview } from '@/components'

export const NotePreviewList = () => {
  return (
    <ul>
      {notesMock.map((note) => (
        <NotePreview key={note.title + note.lastEditTime} {...note}></NotePreview>
      ))}
    </ul>
  )
}
