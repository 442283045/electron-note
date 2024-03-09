import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { type NoteInfo } from '@shared/models'

const loadNotes = async () => {
  const notes = await window.context.getNotes()
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

export const notesAtomPromise = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())
export const notesAtom = unwrap(notesAtomPromise, (prev) => (prev ? prev : []))
export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)
  if (selectedNoteIndex === null) return null
  const selectedNote = notes[selectedNoteIndex]
  const content = ''
  return { ...selectedNote, content }
})

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
