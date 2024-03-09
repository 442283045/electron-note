import { CreateNote, DeleteNote, GetNotes } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('context', {
      locale: navigator.language,
      getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
      createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
      deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args),
      readContent: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('readContent', ...args),
      writeContent: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('writeContent', ...args)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}
