import fs from 'fs'
import path from 'path'
import { normalizePath } from '../vite/plugins/vitejs/utils'
import { parseMiniProgramPagesJson } from '../json'

const EXTNAMES = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.json',
  '.cer',
  '.mp3',
  '.aac',
  '.m4a',
  '.mp4',
  '.wav',
  '.ogg',
  '.silk',
  '.wasm',
  '.br',
  '.cert',
]
export function isMiniProgramAssetFile(filename: string) {
  if (!path.isAbsolute(filename)) {
    return false
  }
  return EXTNAMES.includes(path.extname(filename))
}

export function createCopyComponentDirs(dir: string) {
  const dirs = [dir]
  const uniModulesDir = 'uni_modules/*/' + dir + '/**/*'
  dirs.push(uniModulesDir)
  const inputDir = process.env.UNI_INPUT_DIR
  const platform = process.env.UNI_PLATFORM
  if (!inputDir || !platform) {
    return dirs
  }
  const { appJson } = parseMiniProgramPagesJson(
    fs.readFileSync(
      path.resolve(normalizePath(inputDir), 'pages.json'),
      'utf8'
    ),
    platform,
    { subpackages: true }
  )
  const roots: string[] = Object.values(
    appJson.subPackages || appJson.subpackages || {}
  )
    .map(({ root }) => root)
    .filter(Boolean)
  roots.forEach((root) => {
    dirs.push(
      normalizePath(path.join(root, dir)),
      normalizePath(path.join(root, uniModulesDir))
    )
  })
  return dirs
}
