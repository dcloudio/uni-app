import path from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'

import chokidar from 'chokidar'

import { toKotlin, toSwift } from './api'
import {
  UtsInputOptions,
  UtsOptions,
  UtsOutputOptions,
  UtsResult,
  UtsTarget,
} from './types'
import {
  printDone,
  printStartup,
  printUtsResult,
  printUtsResults,
  timeEnd,
} from './utils'

export { UtsTarget } from './types'

export type UtsMode = 'dev' | 'build'

const UtsTargetDirs = {
  [UtsTarget.KOTLIN]: 'app-android',
  [UtsTarget.SWIFT]: 'app-ios',
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
    sourceMap?: boolean | string
    /**
     * sourceMap 中是否包含源码
     */
    inlineSourcesContent?: boolean
    extname?: string
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
  if (!opts.output.extname) {
    opts.output.extname = UtsTargetExtNames[target]
  }
  opts.silent = opts.silent === true
  return opts as ToOptions
}

const EXTNAME = '.uts'

function resolveSrcDir(target: UtsTarget, dir: string) {
  return path.join(dir, UtsTargetDirs[target])
}

function initInputOptions(_: UtsTarget, root: string): UtsInputOptions {
  return {
    root,
    filename: '',
  }
}

function initOutputOptions(
  target: UtsTarget,
  outDir: string,
  sourceMap: string | boolean | undefined,
  inlineSourcesContent: boolean
): UtsOutputOptions {
  return {
    outDir,
    sourceMap: sourceMap ? sourceMap : false,
    inlineSourcesContent,
    extname: UtsTargetExtNames[target],
  }
}

function initOptions(
  target: UtsTarget,
  {
    input: { dir: inputDir },
    output: { dir: outputDir, sourceMap, inlineSourcesContent },
  }: ToOptions
) {
  const inputSrcDir = resolveSrcDir(target, inputDir)
  const outputSrcDir = resolveSrcDir(target, outputDir)

  const input = initInputOptions(target, inputSrcDir)
  const output = initOutputOptions(
    target,
    outputSrcDir,
    sourceMap,
    !!inlineSourcesContent
  )
  return { input, output }
}

async function watch(target: UtsTarget, toOptions: ToOptions) {
  fs.emptyDirSync(toOptions.output.dir)

  const { input, output } = initOptions(target, toOptions)
  const inputDir = toOptions.input.dir
  const outputDir = toOptions.output.dir
  const inputSrcDir = input.root
  const outputSrcDir = output.outDir
  const extname = toOptions.input.extname || EXTNAME
  const silent = !!toOptions.silent
  // 先完整编译后，再启用监听
  doBuild(target, {
    watch: true,
    input,
    output,
    inputDir,
    outputDir,
    inputSrcDir,
    outputSrcDir,
    extname,
    silent,
  }).then(() => {
    // TODO 监听动态添加的资源文件
    chokidar
      .watch('**/*' + extname, {
        cwd: inputSrcDir,
        ignored: ['**/*.d' + extname],
        ignoreInitial: true,
      })
      .on('add', (filename) => {
        buildFile(
          target,
          path.resolve(inputSrcDir, filename),
          input,
          output
        ).then((res) => {
          if (!silent) {
            printUtsResult(res)
            printDone(true)
          }
        })
      })
      .on('change', (filename) => {
        buildFile(
          target,
          path.resolve(inputSrcDir, filename),
          input,
          output
        ).then((res) => {
          if (!silent) {
            printUtsResult(res)
            printDone(true)
          }
        })
      })
      .on('unlink', (filename) => {
        try {
          fs.unlinkSync(path.resolve(outputSrcDir, filename))
        } catch (e) {}
      })
  })
}

interface DoBuildOptions {
  watch: boolean
  silent: boolean
  input: UtsInputOptions
  output: UtsOutputOptions
  inputDir: string
  inputSrcDir: string
  outputDir: string
  outputSrcDir: string
  extname: string
}

function doBuild(
  target: UtsTarget,
  { watch, silent, extname, inputSrcDir, input, output }: DoBuildOptions
) {
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
  ).then((res) => {
    !silent && printUtsResults(res, watch)
    return res
  })
}

function build(target: UtsTarget, toOptions: ToOptions) {
  fs.emptyDirSync(toOptions.output.dir)
  const { input, output } = initOptions(target, toOptions)
  const inputDir = toOptions.input.dir
  const outputDir = toOptions.output.dir
  const inputSrcDir = input.root
  const outputSrcDir = output.outDir
  const extname = toOptions.input.extname || EXTNAME
  const silent = !!toOptions.silent
  return doBuild(target, {
    watch: false,
    input,
    output,
    inputDir,
    outputDir,
    inputSrcDir,
    outputSrcDir,
    extname,
    silent,
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

export { parse, bundle } from './api'

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
