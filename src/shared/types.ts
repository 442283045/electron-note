import { NoteInfo } from './models'

export type GetNotes = () => Promise<NoteInfo[]>
export type CreateNote = (title: string) => Promise<false | NoteInfo>
export type DeleteNote = (title: string) => Promise<boolean>
