import fs from 'fs'
import path from 'path'

import { once } from '@dcloudio/uni-shared'

import { parseJson } from './json'

export const parseManifestJson = (inputDir: string) => {
  return parseJson(
    fs.readFileSync(path.join(inputDir, 'manifest.json'), 'utf8')
  )
}

export const parseManifestJsonOnce = once(parseManifestJson)
