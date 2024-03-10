import { NoteInfo } from './models'

export type GetNotes = () => Promise<NoteInfo[] | false>
export type CreateNote = (title: string) => Promise<false | NoteInfo>
export type DeleteNote = (title: string) => Promise<boolean>
export type ReadContent = (title: string) => Promise<false | string>
export type WriteContent = (title: string, content: string) => Promise<number | false>
export type RenameFile = (preName: string, name: string) => Promise<boolean>
