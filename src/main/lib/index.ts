import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, GetNotes, ReadContent, WriteContent } from '@shared/types'
import { access, createFile, ensureDir, readFile, readdir, rm, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import { resolve } from 'path'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })
  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))
  return Promise.all(notes.map(getNoteInfoFromFilename))
}
export const createNote: CreateNote = async (title: string) => {
  const titleName = title.replace(/\.md$/, '') + '.md'
  try {
    await access(titleName)
    return false
  } catch {
    await createFile(resolve(getRootDir(), titleName))
    const fileStat = await stat(resolve(getRootDir(), titleName))
    return {
      title: titleName,
      lastEditTime: fileStat.mtimeMs
    }
  }
}
export const deleteNote = async (title: string) => {
  const fullName = title + '.md'
  const pathName = resolve(getRootDir(), fullName)
  try {
    await stat(pathName)
    await rm(pathName)
    return true
  } catch {
    return false
  }
}
export const readContent: ReadContent = async (title: string) => {
  const fullName = title + '.md'
  const pathName = resolve(getRootDir(), fullName)
  try {
    const content = await readFile(pathName, { encoding: fileEncoding })
    return content
  } catch (error) {
    console.log(error)
    return false
  }
}
export const writeContent: WriteContent = async (title: string, content: string) => {
  const fullName = title + '.md'
  const pathName = resolve(getRootDir(), fullName)
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
  const fileStats = await stat(`${getRootDir()}/${filename}`)
  return {
    title: filename.replace(/.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}
