import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'
// import { toKotlin } from '@dcloudio/uts'
import { normalizePath } from '@dcloudio/uni-cli-shared'

interface ToOptions {
  watch?: boolean
  input: {
    dir: string
  }
  output: {
    dir: string
    sourceMap?: boolean
  }
}

interface ToKotlinOptions extends ToOptions {}

function parseKotlinOptions(opts: Partial<ToKotlinOptions>) {
  const { input, output } = opts
  if (!input?.dir) {
    throw new Error(`input.dir is required`)
  }
  if (!output?.dir) {
    throw new Error(`output.dir is required`)
  }
  if (!fs.existsSync(input.dir)) {
    throw new Error(`${input} is not found`)
  }
  return opts as ToKotlinOptions
}

function watchKotlin(opts: ToKotlinOptions) {}
function buildKotlin({ input: { dir: inputDir } }: ToKotlinOptions) {
  const files = glob.sync(normalizePath(path.join(inputDir, '**/*.uts')))
  console.log(files)
}

export function toKotlin(opts: ToKotlinOptions) {
  opts = parseKotlinOptions(opts)
  return opts.watch ? watchKotlin(opts) : buildKotlin(opts)
}
