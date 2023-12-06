import { minimatch } from 'minimatch'
import { slash } from '../utils'
import { basename } from 'node:path'

export function matchGlobs(filepath: string, globs: string[]) {
  for (const glob of globs) {
    if (minimatch(slash(filepath), glob)) return true
  }
  return false
}

export function parseTag(filename: string) {
  return removeExtname(basename(filename))
}

export function removeExtname(filename: string) {
  return filename.replace(/\.\w+$/, '')
}
