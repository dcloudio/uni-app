import { CompilerOptions } from './options'

export function genRenderFunctionDecl({
  targetLanguage,
  filename,
}: CompilerOptions): string {
  return `${
    targetLanguage === 'kotlin' ? '@Suppress("UNUSED_PARAMETER") ' : ''
  }function ${filename}Render(ctx: ${filename}): VNode | null`
}
