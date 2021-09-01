import fs from 'fs'
import path from 'path'
import { parseJson } from '../../json'

export function getLocales(inputDir: string) {
  const localesDir = path.resolve(inputDir, 'locale')
  if (fs.existsSync(localesDir)) {
    return fs.readdirSync(localesDir).reduce((res, filename) => {
      if (path.extname(filename) === '.json') {
        res[filename.replace('.json', '')] =
          parseJson(fs.readFileSync(path.join(localesDir, filename), 'utf8')) ||
          {}
      }
      return res
    }, {} as Record<string, Record<string, string>>)
  }
  return {}
}
