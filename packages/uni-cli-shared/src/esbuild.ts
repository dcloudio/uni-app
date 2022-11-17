import type { BuildOptions } from 'esbuild'
import path from 'path'

export function transformWithEsbuild(
  code: string,
  filename: string,
  options: BuildOptions
) {
  options.stdin = {
    contents: code,
    resolveDir: path.dirname(filename),
  }
  return import('esbuild').then((esbuild) => {
    return esbuild.build(options)
  })
}

export function esbuild(options: BuildOptions) {
  return import('esbuild').then((esbuild) => {
    return esbuild.build(options)
  })
}
