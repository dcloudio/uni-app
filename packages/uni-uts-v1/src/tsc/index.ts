export { uts2js } from './javascript'
export { runUTS2KotlinDev } from './kotlin'

import type { CompilerOptions, EmitResult } from 'typescript'

export interface UTSEmitDeclarationOptions {
  typescript: typeof import('typescript')
  inputDir: string
  rootFiles: string[]
  compilerOptions: CompilerOptions
}

export function emitDeclaration(
  options: UTSEmitDeclarationOptions
): EmitResult {
  return require('../../../lib/uts').emitDeclaration(options)
}
