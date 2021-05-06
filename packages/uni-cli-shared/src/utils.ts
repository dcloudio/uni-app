import fs from 'fs'
import os from 'os'
import path from 'path'
import slash from 'slash'
import { once } from '@dcloudio/uni-shared'
const isWindows = os.platform() === 'win32'
export function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id)
}

export const resolveMainPathOnce = once((inputDir: string) => {
  const mainTsPath = path.resolve(inputDir, 'main.ts')
  if (fs.existsSync(mainTsPath)) {
    return mainTsPath
  }
  return path.resolve(inputDir, 'main.js')
})
