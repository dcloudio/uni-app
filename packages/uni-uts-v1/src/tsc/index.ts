import type { CompilerOptions, EmitResult } from 'typescript'

export { uts2js } from './javascript'
export { createUniXCompiler } from './compiler'

export interface UTSEmitDeclarationOptions {
  typescript?: typeof import('typescript')
  inputDir: string
  rootFiles: string[]
  compilerOptions?: CompilerOptions
}

export function emitDeclaration(
  options: UTSEmitDeclarationOptions
): EmitResult {
  return require('../../lib/uts').emitDeclaration({
    typescript: require('../../lib/typescript'),
    ...options,
  })
}

export function getTypeScript() {
  return require('../../lib/typescript')
}
