import fs from 'fs'
import path from 'path'

export function emptyDir(dir: string, skip: string[] = []) {
  try {
    for (const file of fs.readdirSync(dir)) {
      if (skip.includes(file)) {
        continue
      }
      // node >= 14.14.0
      fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
    }
  } catch (e) {}
}
