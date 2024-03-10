import { workingDirInfo, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, GetNotes, ReadContent, WriteContent } from '@shared/types'
import { dialog } from 'electron'
import { access, createFile, ensureDir, readFile, readdir, rm, stat, writeFile } from 'fs-extra'
import { dirname, resolve } from 'path'

export const isAtWorkingDir = () => {
  return !!workingDirInfo.workingDir
}

export const getNotes: GetNotes = async () => {
  if (!isAtWorkingDir()) return false
  const rootDir = workingDirInfo.workingDir!

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })
  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))
  return Promise.all(notes.map(getNoteInfoFromFilename))
}
export const createNote: CreateNote = async (title: string) => {
  if (!isAtWorkingDir()) return false
  const titleName = title.replace(/\.md$/, '') + '.md'
  try {
    await access(titleName)
    return false
  } catch {
    await createFile(resolve(workingDirInfo.workingDir!, titleName))
    const fileStat = await stat(resolve(workingDirInfo.workingDir!, titleName))
    return {
      title: titleName,
      lastEditTime: fileStat.mtimeMs
    }
  }
}
export const deleteNote = async (title: string) => {
  if (!isAtWorkingDir()) return false
  const fullName = title + '.md'
  const pathName = resolve(workingDirInfo.workingDir!, fullName)
  try {
    await stat(pathName)
    await rm(pathName)
    return true
  } catch {
    return false
  }
}
export const readContent: ReadContent = async (title: string) => {
  if (!isAtWorkingDir()) return false
  const fullName = title + '.md'
  const pathName = resolve(workingDirInfo.workingDir!, fullName)
  try {
    const content = await readFile(pathName, { encoding: fileEncoding })
    return content
  } catch (error) {
    console.log(error)
    return false
  }
}
export const writeContent: WriteContent = async (title: string, content: string) => {
  if (!isAtWorkingDir()) return false
  const fullName = title + '.md'
  const pathName = resolve(workingDirInfo.workingDir!, fullName)
  try {
    await writeFile(pathName, content, { encoding: fileEncoding })
    return (await stat(pathName)).mtimeMs
  } catch (error) {
    console.log(error)
    return false
  }
}
export const getNoteInfoFromFilename = async (
  filename: string
): Promise<Pick<NoteInfo, 'title' | 'lastEditTime'>> => {
  const fileStats = await stat(`${workingDirInfo.workingDir}/${filename}`)
  return {
    title: filename.replace(/.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}
export const handleOpenFile = (...args: string[]) => {
  if (import.meta.env.DEV) {
    if (args.length >= 3) workingDirInfo.openFileName = args[2]
  } else {
    if (args.length >= 2) workingDirInfo.openFileName = args[1]
  }
  if (workingDirInfo.openFileName) {
    workingDirInfo.workingDir = dirname(workingDirInfo.openFileName)
  }
}

export const openDir = async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  if (!result) return
  workingDirInfo.workingDir = result.filePaths[0]
  return result
}
