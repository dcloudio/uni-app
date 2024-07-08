import path from 'path'
import fs from 'fs-extra'
export function isModule(pluginDir: string) {
  return fs.existsSync(path.resolve(pluginDir, 'index.module.uts'))
}
