import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRef } from 'react'
import { throttle } from 'lodash'
import { autoSaveInterval } from '@shared/constants'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)
  const handleAutoSaving = throttle(
    async (content: string) => {
      if (!selectedNote) return
      await saveNote(content)
    },
    autoSaveInterval,
    { leading: false, trailing: true }
  )
  const handleBlur = async () => {
    if (!selectedNote) return
    await handleAutoSaving.flush()
    // handleAutoSaving.cancel()
    // await saveNote(content)
  }
  return { selectedNote, handleAutoSaving, editorRef, handleBlur }
}
