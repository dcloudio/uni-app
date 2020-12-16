import fs from 'fs'
import path from 'path'

interface EasycomOption {
  dirs?: string[]
  rootDir?: string
  custom?: EasycomCustom
}
interface EasycomMatcher {
  pattern: RegExp
  replacement: string
}
interface EasycomCustom {
  [key: string]: string
}

const easycoms: EasycomMatcher[] = []

const easycomsCache = new Map<string, string>()
const easycomsInvalidCache = new Set<string>()

function clearEasycoms() {
  easycoms.length = 0
  easycomsCache.clear()
  easycomsInvalidCache.clear()
}

export function initEasycoms({ dirs, rootDir, custom }: EasycomOption) {
  clearEasycoms()
  const easycomsObj = Object.create(null)
  if (dirs && rootDir) {
    Object.assign(easycomsObj, initAutoScanEasycoms(dirs, rootDir))
  }
  if (custom) {
    Object.assign(easycomsObj, custom)
  }
  Object.keys(easycomsObj).forEach(name => {
    easycoms.push({
      pattern: new RegExp(name),
      replacement: easycomsObj[name]
    })
  })
  return easycoms
}

export function matchEasycom(tag: string) {
  let source = easycomsCache.get(tag)
  if (source) {
    return source
  }
  if (easycomsInvalidCache.has(tag)) {
    return false
  }
  const matcher = easycoms.find(matcher => matcher.pattern.test(tag))
  if (!matcher) {
    easycomsInvalidCache.add(tag)
    return false
  }
  source = tag.replace(matcher.pattern, matcher.replacement)
  easycomsCache.set(tag, source)
  return source
}

const isDir = (path: string) => fs.lstatSync(path).isDirectory()

function initAutoScanEasycom(
  dir: string,
  rootDir: string
): Record<string, string> {
  const easycoms = Object.create(null)
  if (!fs.existsSync(dir)) {
    return easycoms
  }
  fs.readdirSync(dir).forEach(name => {
    const folder = path.resolve(dir, name)
    if (!isDir(folder)) {
      return
    }
    const importDir = path.relative(rootDir, folder)
    const files = fs.readdirSync(folder)
    if (files.find(file => path.parse(file).name === name)) {
      easycoms[`^${name}$`] = `@/${importDir}/${name}`
    }
  })
  return easycoms
}

function initAutoScanEasycoms(dirs: string[], rootDir: string) {
  return dirs.reduce<Record<string, string>>(
    (easycoms: Record<string, string>, dir: string) => {
      const curEasycoms = initAutoScanEasycom(dir, rootDir)
      Object.keys(curEasycoms).forEach(name => {
        // Use the first component when name conflict
        if (!easycoms[name]) {
          easycoms[name] = curEasycoms[name]
        }
      })
      return easycoms
    },
    Object.create(null)
  )
}
