import { TransformOptions } from 'esbuild'

export function transformWithEsbuild(code: string, options: TransformOptions) {
  return import('esbuild').then((esbuild) => {
    return esbuild.transform(code, options)
  })
}
