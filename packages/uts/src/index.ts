import path from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'

import chokidar from 'chokidar'

import { toKotlin, toSwift } from './api'
import type {
  UtsInputOptions,
  UtsOptions,
  UtsOutputOptions,
  UtsResult,
} from './types'
import { printStartup, printUtsResult, printUtsResults, timeEnd } from './utils'

export enum UtsTarget {
  KOTLIN = 'kotlin',
  SWIFT = 'swift',
}

export type UtsMode = 'dev' | 'build'

const UtsTargetDirs = {
  [UtsTarget.KOTLIN]: 'android',
  [UtsTarget.SWIFT]: 'ios',
} as const

export const UtsTargetExtNames = {
  [UtsTarget.KOTLIN]: 'kt',
  [UtsTarget.SWIFT]: 'swift',
} as const
export interface ToOptions {
  /**
   * 为 true 时，禁用日志输出，默认为 false
   */
  silent?: boolean
  input: {
    /**
     * 插件根目录
     */
    dir: string
    /**
     * 文件后缀，默认 .uts
     */
    extname?: string
  }
  output: {
    /**
     * 输出目录
     */
    dir: string
    /**
     * 是否生成 sourceMap，为 string 时，表示生成的 sourceMap 目标目录
     */
    sourceMap: boolean | string
    /**
     * sourceMap 中是否包含源码
     */
    inlineSourcesContent?: boolean
    extname: string
  }
}

function resolveDefaultOutputDir(mode: UtsMode, inputDir: string) {
  return path.resolve(inputDir, '../dist/' + mode)
}
function parseOptions(
  mode: UtsMode,
  target: UtsTarget,
  opts: Partial<ToOptions>
): ToOptions {
  const { input } = opts
  if (!input?.dir) {
    throw new Error(`input.dir is required.`)
  }
  if (!fs.existsSync(input.dir)) {
    throw new Error(`${input} is not found.`)
  }

  const inputSrcDir: string = resolveSrcDir(target, input.dir)

  if (!fs.existsSync(inputSrcDir)) {
    throw new Error(`${inputSrcDir} is not found.`)
  }

  if (!opts.output) {
    opts.output = {
      dir: '',
      sourceMap: '',
      extname: UtsTargetExtNames[target],
    }
  }
  if (!opts.output.dir) {
    opts.output.dir = resolveDefaultOutputDir(mode, input.dir)
  }
  opts.silent = opts.silent === true
  return opts as ToOptions
}

const EXTNAME = '.uts'

function resolveSrcDir(target: UtsTarget, dir: string) {
  return path.join(dir, UtsTargetDirs[target] + '/src')
}

function initInputOptions(root: string): UtsInputOptions {
  return {
    root,
    filename: '',
  }
}

function initOutputOptions(
  target: UtsTarget,
  outDir: string,
  sourceMap: string | boolean,
  inlineSourcesContent: boolean
): UtsOutputOptions {
  return {
    outDir,
    sourceMap,
    inlineSourcesContent,
    extname: UtsTargetExtNames[target],
  }
}

function watch(
  target: UtsTarget,
  {
    silent,
    input: { dir: inputDir, extname },
    output: { dir: outputDir, sourceMap, inlineSourcesContent },
  }: ToOptions
) {
  fs.emptyDirSync(outputDir)

  extname = extname || EXTNAME

  const inputSrcDir = resolveSrcDir(UtsTarget.KOTLIN, inputDir)
  const outputSrcDir = resolveSrcDir(UtsTarget.KOTLIN, outputDir)

  const input = initInputOptions(inputSrcDir)
  const output = initOutputOptions(
    target,
    outputSrcDir,
    sourceMap,
    !!inlineSourcesContent
  )

  chokidar
    .watch('**/*' + extname, {
      cwd: inputSrcDir,
      ignored: ['**/*.d' + extname],
    })
    .on('add', (filename) => {
      buildFile(
        target,
        path.resolve(inputSrcDir, filename),
        input,
        output
      ).then((res) => {
        !silent && printUtsResult(res)
      })
    })
    .on('change', (filename) => {
      buildFile(
        target,
        path.resolve(inputSrcDir, filename),
        input,
        output
      ).then((res) => {
        !silent && printUtsResult(res)
      })
    })
    .on('unlink', (filename) => {
      try {
        fs.unlinkSync(path.resolve(outputSrcDir, filename))
      } catch (e) {}
    })
    .on('ready', () => {
      copyAssets(UtsTarget.KOTLIN, inputDir, outputDir, extname!)
    })
}

function build(
  target: UtsTarget,
  {
    silent,
    input: { dir: inputDir, extname },
    output: { dir: outputDir, sourceMap, inlineSourcesContent },
  }: ToOptions
) {
  extname = extname || EXTNAME

  const inputSrcDir = resolveSrcDir(target, inputDir)
  const outputSrcDir = resolveSrcDir(target, outputDir)
  // fs.emptyDirSync(outputSrcDir)
  const input = initInputOptions(inputSrcDir)
  const output = initOutputOptions(
    target,
    outputSrcDir,
    sourceMap,
    !!inlineSourcesContent
  )

  const files = glob.sync('**/*' + extname, {
    absolute: true,
    cwd: inputSrcDir,
    ignore: ['**/*.d' + extname],
  })

  return Promise.all(
    files.map((filename) =>
      buildFile(target, filename, input, output).catch((error) => {
        return {
          error,
        } as UtsResult
      })
    )
  )
    .then((res) => {
      return copyAssets(UtsTarget.KOTLIN, inputDir, outputDir, extname!).then(
        () => res
      )
    })
    .then((res) => {
      !silent && printUtsResults(res)
      return res
    })
}

function copyAssets(
  target: UtsTarget,
  inputDir: string,
  outputDir: string,
  extname: string
) {
  inputDir = path.resolve(inputDir)
  outputDir = path.resolve(outputDir)
  const kotlinRootDir = path.join(inputDir, UtsTargetDirs[UtsTarget.KOTLIN])
  const swiftRootDir = path.join(inputDir, UtsTargetDirs[UtsTarget.SWIFT])
  return fs.copy(inputDir, outputDir, {
    filter(src) {
      if (target === UtsTarget.KOTLIN) {
        if (src === swiftRootDir) {
          return false
        }
      } else if (target === UtsTarget.SWIFT) {
        if (src === kotlinRootDir) {
          return false
        }
      }
      if (path.basename(src).startsWith('.')) {
        return false
      }
      if (fs.lstatSync(src).isDirectory()) {
        return false
      }
      return ![extname, '.ts'].includes(path.extname(src))
    },
  })
}

function buildFile(
  target: UtsTarget,
  filename: string,
  input: UtsInputOptions,
  output: UtsOutputOptions
) {
  const toOptions: UtsOptions = {
    input: {
      ...input,
      filename,
      namespace: '',
    },
    output: {
      ...output,
    },
  }
  const start = process.hrtime()
  return (
    target === UtsTarget.KOTLIN ? toKotlin(toOptions) : toSwift(toOptions)
  ).then((res) => {
    res.time = timeEnd(start)
    return res
  })
}

export function runDev(target: UtsTarget, opts: ToOptions) {
  opts = parseOptions('dev', target, opts)
  !opts.silent && printStartup(target, 'development')
  watch(target, opts)
}

export function runBuild(target: UtsTarget, opts: ToOptions) {
  opts = parseOptions('build', target, opts)
  !opts.silent && printStartup(target, 'production')
  build(target, opts)
}
