import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { type NoteInfo } from '@shared/models'

const loadNotes = async () => {
  const notes = await window.context.getNotes()
  if (notes === false) return []
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}
export const isAtWokingDir = () => {
  return window.context.isAtWorkingDir()
}
export const isAtDirPromise = atom<boolean | Promise<boolean>>(isAtWokingDir())
export const isAtDir = unwrap(isAtDirPromise, (prev) => prev ?? false)
export const notesAtomPromise = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())
export const notesAtom = unwrap(notesAtomPromise, (prev) => (prev ? prev : []))
export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtomPromise = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)
  if (selectedNoteIndex === null) return null
  const selectedNote = notes[selectedNoteIndex]
  const result = await window.context.readContent(selectedNote.title)
  if (result === false) return

  return { ...selectedNote, content: result }
})
export const selectedNoteAtom = unwrap(
  selectedNoteAtomPromise,
  (prev) =>
    prev ?? {
      title: '',
      lastEditTime: Date.now(),
      content: ''
    }
)
export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const title = `Note ${notes.length + 1}`
  const result = await window.context.createNote(title)
  if (result === false) return
  const newNote: NoteInfo = {
    title,
    lastEditTime: result.lastEditTime
  }
  set(notesAtom, [newNote, ...notes])
  set(selectedNoteIndexAtom, 0)
})
export const saveNoteAtom = atom(null, async (get, set, content: string) => {
  const selectedNote = get(selectedNoteAtom)
  const notes = get(notesAtom)
  if (!selectedNote || !notes) return
  const result = await window.context.writeContent(selectedNote.title, content)
  if (result === false) return
  set(
    notesAtom,
    notes.map((note) => {
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: result
        }
      }
      return note
    })
  )
})
export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote) return
  const result = await window.context.deleteNote(selectedNote.title)
  if (!result) {
    // TODO: Warn user that the operate is failed
    return
  }
  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )
  set(selectedNoteIndexAtom, null)
})

export const openDir = atom(null, async (_, set) => {
  const result = await window.context.openDir()
  if (!result) return
  set(isAtDir, true)
  set(notesAtom, loadNotes())
})
