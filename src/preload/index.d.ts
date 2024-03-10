import { GetNotes, CreateNote, DeleteNote, ReadContent, WriteContent } from '@shared/types'
import { OpenDialogReturnValue } from 'electron'
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
      isAtWorkingDir: () => Promise<boolean>
      openDir: () => Promise<OpenDialogReturnValue>
    }
  }
}
