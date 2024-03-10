export const fileEncoding = 'utf8'
export const autoSaveInterval = 3000
export const workingDirInfo: WorkingDirInfo = {
  workingDir: undefined,
  openFileName: undefined
}

interface WorkingDirInfo {
  workingDir: undefined | string
  openFileName: undefined | string
}
