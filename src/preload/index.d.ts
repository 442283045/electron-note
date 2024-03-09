import { GetNotes, CreateNote, DeleteNote } from '@shared/types'

export declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNotes
      createNote: CreateNote
      deleteNote: DeleteNote
    }
  }
}
