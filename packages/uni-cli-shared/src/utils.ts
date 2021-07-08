import fs from 'fs'
import os from 'os'
import path from 'path'
import slash from 'slash'
import { camelize, capitalize } from '@vue/shared'
import { once } from '@dcloudio/uni-shared'
const isWindows = os.platform() === 'win32'
export function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id)
}

export const resolveMainPathOnce = once((inputDir: string) => {
  const mainTsPath = path.resolve(inputDir, 'main.ts')
  if (fs.existsSync(mainTsPath)) {
    return normalizePath(mainTsPath)
  }
  return normalizePath(path.resolve(inputDir, 'main.js'))
})

export function resolveBuiltIn(path: string) {
  return require.resolve(path, { paths: [process.env.UNI_CLI_CONTEXT] })
}

export function normalizeIdentifier(str: string) {
  return capitalize(camelize(str.replace(/\//g, '-')))
}
