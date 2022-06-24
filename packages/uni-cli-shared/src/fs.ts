import { emptyDirSync } from 'fs-extra'
export function emptyDir(dir: string): void {
  return emptyDirSync(dir)
}
