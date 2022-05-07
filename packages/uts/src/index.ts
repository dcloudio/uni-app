import path from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'

import { watch } from 'chokidar'

import { InputKotlinOptions, toKotlin } from './api'
import { OutputKotlinOptions, UtsKotlinOptions } from './types'
import { printStartup, printUtsResult, printUtsResults, timeEnd } from './utils'

export const enum UtsTarget {
  KOTLIN = 'kotlin',
  SWIFT = 'swift',
}

export type UtsMode = 'dev' | 'build'

const targetDirs = {
  [UtsTarget.KOTLIN]: 'android',
  [UtsTarget.SWIFT]: 'ios',
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
  }
}

interface ToKotlinOptions extends ToOptions {}
interface ToSwiftOptions extends ToOptions {}

function resolveDefaultOutputDir(mode: UtsMode, inputDir: string) {
  return path.resolve(inputDir, '../dist/' + mode)
}
function parseOptions(
  mode: UtsMode,
  target: UtsTarget,
  opts: Partial<ToKotlinOptions>
) {
  const { input } = opts
  if (!input?.dir) {
    throw new Error(`input.dir is required.`)
  }
  if (!fs.existsSync(input.dir)) {
    throw new Error(`${input} is not found.`)
  }
  let inputSrcDir: string = ''
  if (target === UtsTarget.KOTLIN) {
    inputSrcDir = resolveKotlinSrcDir(input.dir)
  } else {
    throw new Error(`${target} is unsupported.`)
  }

  if (!fs.existsSync(inputSrcDir)) {
    throw new Error(`${inputSrcDir} is not found.`)
  }

  if (!opts.output) {
    opts.output = {
      dir: '',
      sourceMap: '',
    }
  }
  if (!opts.output.dir) {
    opts.output.dir = resolveDefaultOutputDir(mode, input.dir)
  }
  opts.silent = opts.silent === true
  return opts as ToKotlinOptions
}

const EXTNAME = '.uts'

function resolveKotlinSrcDir(dir: string) {
  return path.join(dir, targetDirs[UtsTarget.KOTLIN] + '/src')
}

function initInputKotlinOptions(root: string): InputKotlinOptions {
  return {
    root,
    filename: '',
  }
}

function initOutputKotlinOptions(
  outDir: string,
  sourceMap: string | boolean,
  inlineSourcesContent: boolean
): OutputKotlinOptions {
  return {
    outDir,
    sourceMap,
    inlineSourcesContent,
  }
}
function watchSwift(_: ToSwiftOptions) {}
function buildSwift(_: ToSwiftOptions) {}
function watchKotlin({
  silent,
  input: { dir: inputDir, extname },
  output: { dir: outputDir, sourceMap, inlineSourcesContent },
}: ToKotlinOptions) {
  fs.emptyDirSync(outputDir)

  extname = extname || EXTNAME

  const inputSrcDir = resolveKotlinSrcDir(inputDir)
  const outputSrcDir = resolveKotlinSrcDir(outputDir)

  const input = initInputKotlinOptions(inputSrcDir)
  const output = initOutputKotlinOptions(
    outputSrcDir,
    sourceMap,
    !!inlineSourcesContent
  )

  watch('**/*' + extname, {
    cwd: inputSrcDir,
    ignored: ['**/*.d' + extname],
  })
    .on('add', (filename) => {
      buildKotlinFile(path.resolve(inputSrcDir, filename), input, output).then(
        (res) => {
          !silent && printUtsResult(res)
        }
      )
    })
    .on('change', (filename) => {
      buildKotlinFile(path.resolve(inputSrcDir, filename), input, output).then(
        (res) => {
          !silent && printUtsResult(res)
        }
      )
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
function buildKotlin({
  silent,
  input: { dir: inputDir, extname },
  output: { dir: outputDir, sourceMap, inlineSourcesContent },
}: ToKotlinOptions) {
  fs.emptyDirSync(outputDir)

  extname = extname || EXTNAME

  const inputSrcDir = resolveKotlinSrcDir(inputDir)
  const outputSrcDir = resolveKotlinSrcDir(outputDir)

  const input = initInputKotlinOptions(inputSrcDir)
  const output = initOutputKotlinOptions(
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
    files.map((filename) => buildKotlinFile(filename, input, output))
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
  const kotlinRootDir = path.join(inputDir, targetDirs[UtsTarget.KOTLIN])
  const swiftRootDir = path.join(inputDir, targetDirs[UtsTarget.SWIFT])
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
      return ![extname, '.ts'].includes(path.extname(src))
    },
  })
}

function buildKotlinFile(
  filename: string,
  input: InputKotlinOptions,
  output: OutputKotlinOptions
) {
  const toKotlinOptions: UtsKotlinOptions = {
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
  return toKotlin(toKotlinOptions).then((res) => {
    res.time = timeEnd(start)
    return res
  })
}

export function runDev(target: UtsTarget, opts: ToOptions) {
  opts = parseOptions('dev', target, opts)
  !opts.silent && printStartup(target, 'development')
  switch (target) {
    case UtsTarget.KOTLIN:
      return watchKotlin(opts)
    case UtsTarget.SWIFT:
      return watchSwift(opts)
  }
}

export function runBuild(target: UtsTarget, opts: ToOptions) {
  opts = parseOptions('build', target, opts)
  !opts.silent && printStartup(target, 'production')
  switch (target) {
    case UtsTarget.KOTLIN:
      return buildKotlin(opts)
    case UtsTarget.SWIFT:
      return buildSwift(opts)
  }
}
