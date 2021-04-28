import fs from 'fs'
import path from 'path'
import debug from 'debug'

import { createFilter } from '@rollup/pluginutils'

import { once } from '@dcloudio/uni-shared'
import { parsePagesJson, parsePagesJsonOnce } from '@dcloudio/uni-cli-shared'

interface EasycomOption {
  dirs?: string[]
  rootDir?: string
  extensions?: string[]
  autoscan?: boolean
  custom?: EasycomCustom
}
interface EasycomMatcher {
  pattern: RegExp
  replacement: string
}
interface EasycomCustom {
  [key: string]: string
}

export const debugEasycom = debug('uni:easycom')

const easycoms: EasycomMatcher[] = []

const easycomsCache = new Map<string, string>()
const easycomsInvalidCache = new Set<string>()

let hasEasycom = false

function clearEasycom() {
  easycoms.length = 0

  easycomsCache.clear()
  easycomsInvalidCache.clear()
}

export const initEasycomsOnce = once(
  (inputDir: string, platform: UniApp.PLATFORM) => {
    const componentsDir = path.resolve(inputDir, 'components')
    const uniModulesDir = path.resolve(inputDir, 'uni_modules')
    const initEasycomOptions = (pagesJson?: UniApp.PagesJson) => {
      // 初始化时，从once中读取缓存，refresh时，实时读取
      const { easycom } = pagesJson || parsePagesJson(inputDir, platform, false)
      const easycomOptions: EasycomOption = {
        dirs:
          easycom && easycom.autoscan === false
            ? [] // 禁止自动扫描
            : [componentsDir, ...initUniModulesEasycomDirs(uniModulesDir)],
        rootDir: inputDir,
        autoscan: !!(easycom && easycom.autoscan),
        custom: (easycom && easycom.custom) || {},
      }
      debugEasycom(easycomOptions)
      return easycomOptions
    }
    const options = initEasycomOptions(parsePagesJsonOnce(inputDir, platform))
    initEasycom(options)
    const res = {
      options,
      filter: createFilter(
        ['components/*/*.vue', 'uni_modules/*/components/*/*.vue'],
        [],
        {
          resolve: inputDir,
        }
      ),
      refresh() {
        res.options = initEasycomOptions()
        initEasycom(res.options)
      },
    }
    return res
  }
)

function initUniModulesEasycomDirs(uniModulesDir: string) {
  if (!fs.existsSync(uniModulesDir)) {
    return []
  }
  return fs
    .readdirSync(uniModulesDir)
    .map((uniModuleDir) => {
      const uniModuleComponentsDir = path.resolve(
        uniModulesDir,
        uniModuleDir,
        'components'
      )
      if (fs.existsSync(uniModuleComponentsDir)) {
        return uniModuleComponentsDir
      }
    })
    .filter<string>(Boolean as any)
}

function initEasycom({
  dirs,
  rootDir,
  custom,
  extensions = ['.vue'],
}: EasycomOption) {
  clearEasycom()
  const easycomsObj = Object.create(null)
  if (dirs && dirs.length && rootDir) {
    Object.assign(easycomsObj, initAutoScanEasycoms(dirs, rootDir, extensions))
  }
  if (custom) {
    Object.assign(easycomsObj, custom)
  }
  Object.keys(easycomsObj).forEach((name) => {
    easycoms.push({
      pattern: new RegExp(name),
      replacement: easycomsObj[name],
    })
  })
  debugEasycom(easycoms)
  hasEasycom = !!easycoms.length
  return easycoms
}

export function matchEasycom(tag: string) {
  if (!hasEasycom) {
    return
  }
  let source = easycomsCache.get(tag)
  if (source) {
    return source
  }
  if (easycomsInvalidCache.has(tag)) {
    return false
  }
  const matcher = easycoms.find((matcher) => matcher.pattern.test(tag))
  if (!matcher) {
    easycomsInvalidCache.add(tag)
    return false
  }
  source = tag.replace(matcher.pattern, matcher.replacement)
  easycomsCache.set(tag, source)
  debugEasycom('matchEasycom', tag, source)
  return source
}

const isDir = (path: string) => fs.lstatSync(path).isDirectory()

function initAutoScanEasycom(
  dir: string,
  rootDir: string,
  extensions: string[]
): Record<string, string> {
  if (!path.isAbsolute(dir)) {
    dir = path.resolve(rootDir, dir)
  }
  const easycoms = Object.create(null)
  if (!fs.existsSync(dir)) {
    return easycoms
  }
  fs.readdirSync(dir).forEach((name) => {
    const folder = path.resolve(dir, name)
    if (!isDir(folder)) {
      return
    }
    const importDir = path.relative(rootDir, folder)
    const files = fs.readdirSync(folder)
    // 读取文件夹文件列表，比对文件名（fs.existsSync在大小写不敏感的系统会匹配不准确）
    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i]
      if (files.includes(name + ext)) {
        easycoms[`^${name}$`] = `@/${importDir}/${name}${ext}`
        break
      }
    }
  })
  return easycoms
}

function initAutoScanEasycoms(
  dirs: string[],
  rootDir: string,
  extensions: string[]
) {
  return dirs.reduce<Record<string, string>>(
    (easycoms: Record<string, string>, dir: string) => {
      const curEasycoms = initAutoScanEasycom(dir, rootDir, extensions)
      Object.keys(curEasycoms).forEach((name) => {
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
