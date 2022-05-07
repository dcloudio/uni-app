import path from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'

import { watch } from 'chokidar'

import { InputKotlinOptions, toKotlin } from './api'
import { OutputKotlinOptions, UtsKotlinOptions } from './types'
import { normalizePath } from './utils'

export interface ToOptions {
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

function resolveDefaultOutputDir(mode: 'dev' | 'build', inputDir: string) {
  return path.resolve(inputDir, '../dist/' + mode + '/kotlin')
}
function parseOptions(mode: 'dev' | 'build', opts: Partial<ToKotlinOptions>) {
  const { input } = opts
  if (!input?.dir) {
    throw new Error(`input.dir is required`)
  }

  if (!fs.existsSync(input.dir)) {
    throw new Error(`${input} is not found`)
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
  return opts as ToKotlinOptions
}

const EXTNAME = '.uts'

function watchSwift(_: ToSwiftOptions) {}
function buildSwift(_: ToSwiftOptions) {}
function watchKotlin({
  input: { dir: inputDir, extname },
  output: { dir: outputDir, sourceMap },
}: ToKotlinOptions) {
  const input: InputKotlinOptions = {
    root: inputDir,
    filename: '',
  }
  const output: OutputKotlinOptions = {
    outDir: outputDir,
    sourceMap,
  }
  extname = extname || EXTNAME
  watch('**/*' + extname, {
    cwd: inputDir,
    ignored: ['**/*.d' + extname],
  })
    .on('add', (filename) =>
      buildKotlinFile(path.resolve(inputDir, filename), input, output)
    )
    .on('change', (filename) =>
      buildKotlinFile(path.resolve(inputDir, filename), input, output)
    )
    .on('unlink', (filename) => {
      try {
        fs.unlinkSync(path.resolve(outputDir, filename))
      } catch (e) {}
    })
    .on('ready', () => {
      copyAssets(inputDir, outputDir, extname!)
    })
}
function buildKotlin({
  input: { dir: inputDir, extname },
  output: { dir: outputDir, sourceMap, inlineSourcesContent },
}: ToKotlinOptions) {
  extname = extname || EXTNAME
  const files = glob.sync('**/*' + extname, {
    absolute: true,
    cwd: inputDir,
    ignore: ['**/*.d' + extname],
  })
  const input: InputKotlinOptions = {
    root: inputDir,
    filename: '',
  }
  const output: OutputKotlinOptions = {
    outDir: outputDir,
    sourceMap,
    inlineSourcesContent: !!inlineSourcesContent,
  }
  return Promise.all(
    files.map((filename) => buildKotlinFile(filename, input, output))
  ).then(() => {
    return copyAssets(inputDir, outputDir, extname!)
  })
}

function copyAssets(inputDir: string, outputDir: string, extname: string) {
  return fs.copy(inputDir, outputDir, {
    filter(src) {
      return path.extname(src) !== extname
    },
  })
}

function buildKotlinFile(
  filename: string,
  input: InputKotlinOptions,
  output: OutputKotlinOptions
) {
  const label = normalizePath(path.relative(input.root, filename))
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
  console.time(label)
  return toKotlin(toKotlinOptions).then(() => {
    console.timeEnd(label)
  })
}

export function runDev(target: 'kotlin' | 'swift', opts: ToOptions) {
  opts = parseOptions('dev', opts)
  switch (target) {
    case 'kotlin':
      return watchKotlin(opts)
    case 'swift':
      return watchSwift(opts)
  }
}

export function runBuild(target: 'kotlin' | 'swift', opts: ToOptions) {
  opts = parseOptions('build', opts)
  switch (target) {
    case 'kotlin':
      return buildKotlin(opts)
    case 'swift':
      return buildSwift(opts)
  }
}
