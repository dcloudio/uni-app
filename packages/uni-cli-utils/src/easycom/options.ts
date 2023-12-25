import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { parse } from 'jsonc-parser'
import { sync } from 'resolve'
import type {
  EasyComCustom,
  EasyComOptions,
  Options,
  ResolvedOptions,
} from './types'
import { slash } from '../utils'

const AUTO_SCAN_GLOBS = [
  'components/**/*.{vue,uvue,nvue}',
  'uni_modules/*/components/**/*.{vue,uvue,nvue}',
]

function normalizeGlob(str: string, replace = '*') {
  // 将所有 $0、$1 等占位符，替换为*
  return str.replace(/\$\d+/g, replace)
}

export function resolveOptions(rawOptions: Options) {
  const options: ResolvedOptions = {
    dts: resolve(rawOptions.outputDir, '../.dts/easycom.d.ts'),
    allowOverrides: false,
    ...rawOptions,
    ...initGlobs(rawOptions.inputDir),
  }
  return options
}

function initGlobs(inputDir: string) {
  const customGlobs: EasyComCustom[] = []
  let autoScan = true
  const pagesJsonFilename = resolve(inputDir, 'pages.json')
  if (existsSync(pagesJsonFilename)) {
    const pagesJson = parse(readFileSync(pagesJsonFilename, 'utf8')) as {
      easycom?: EasyComOptions
    }
    const easyComOptions = pagesJson?.easycom
    if (easyComOptions) {
      if (easyComOptions.autoscan === false) {
        autoScan = false
      }
      const customOptions = easyComOptions.custom
      if (customOptions) {
        Object.keys(customOptions).forEach((tag) => {
          customGlobs.push(parseEasyComTag(tag, customOptions[tag], inputDir))
        })
      }
    }
  }

  return { globs: autoScan ? AUTO_SCAN_GLOBS : [], customGlobs }
}

export function parseGlob(glob: string, inputDir: string): string {
  const parts = glob.split('/')
  const index = parts.findIndex((part) => part.includes('*'))
  let globParts: string[] = []
  if (index > -1) {
    globParts = parts.splice(index)
  }
  const popParts: string[] = []
  function findPath(parts: string[]): string {
    if (parts.length === 0) {
      return glob
    }

    const checkPath = parts.join('/')
    try {
      const resolvedPath = sync(checkPath, {
        basedir: inputDir,
        packageFilter(pkg) {
          if (!pkg.main) {
            pkg.main = 'package.json'
          }
          return pkg
        },
        // preserveSymlinks: false,
      })
      return slash(join(dirname(resolvedPath), ...popParts, ...globParts))
    } catch (err) {
      const part = parts.pop()
      if (part) {
        popParts.push(part)
      }
      return findPath(parts)
    }
  }
  return findPath(parts)
}

export function parseEasyComTag(
  tag: string,
  path: string,
  inputDir: string
): EasyComCustom {
  let glob = normalizeGlob(path)
  // 项目根目录
  if (glob.startsWith('@/')) {
    glob = glob.slice(2)
  } else {
    // npm
    glob = parseGlob(glob, inputDir)
  }
  const mappings: [number, number][] = []
  const matches = path.match(/\$\d+/g)
  if (matches) {
    matches.forEach((m, index) => {
      mappings.push([index + 1, parseInt(m.slice(1))])
    })
  }
  /**
   * 映射关系
   * @dcloudio/uni-ui/lib/uni-$1/uni-$1.vue 会被转换为 @dcloudio/uni-ui/lib/uni-(.*)/uni-(.*).vue
   * [[1, 1],[2, 1]]
   * 第一个元素是转换后的(.*)索引位置，第二个元素是转换前的索引位置
   */
  const regex = normalizeGlob(path, '(.*)')

  return {
    tag,
    path,
    glob,
    parseTag(filename) {
      const matches = filename.match(regex)
      if (matches) {
        let newTag = replaceWithIndexes(tag)
        for (let i = mappings.length - 1; i >= 0; i--) {
          const mapping = mappings[i]
          newTag = newTag.replace('$' + mapping[1], matches[mapping[0]])
        }
        return newTag
      }
      return ''
    },
  }
}

function replaceWithIndexes(pattern: string) {
  // 匹配(.*)的正则表达式
  const regex = /\(\.\*\)/g
  let index = 1

  // 替换所有的(.*)为$+索引的形式
  let replaced = pattern.replace(regex, function () {
    return '$' + index++
  })
  if (replaced.startsWith('^')) {
    replaced = replaced.slice(1)
  }
  if (replaced.endsWith('$')) {
    replaced = replaced.slice(0, -1)
  }
  return replaced
}
