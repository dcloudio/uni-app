import { resolve } from 'path'
import { emptyDirSync, lstatSync, readdirSync, unlinkSync } from 'fs-extra'
import { rmdirSync } from 'fs'
export function emptyDir(dir: string, skip: string[] = []) {
  for (const file of readdirSync(dir)) {
    if (skip.includes(file)) {
      continue
    }
    const abs = resolve(dir, file)
    // baseline is Node 12 so can't use rmSync :(
    if (lstatSync(abs).isDirectory()) {
      emptyDirSync(abs)
      rmdirSync(abs)
    } else {
      unlinkSync(abs)
    }
  }
}
