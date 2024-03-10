import { GetNotes, CreateNote, DeleteNote, ReadContent, WriteContent } from '@shared/types'

export declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNotes
      createNote: CreateNote
      deleteNote: DeleteNote
      readContent: ReadContent
      writeContent: WriteContent
      minimizeWindow: () => void
      maximizeWindow: () => void
      closeWindow: () => void
    }
  }
}
