import path from 'path'
import type { Node } from '@babel/types'
import { type ExpressionNode, createSimpleExpression } from '@vue/compiler-core'
import { walk } from 'estree-walker'
import { parseExpression } from '@babel/parser'
import MagicString from 'magic-string'
import {
  camelize,
  genUTSComponentPublicInstanceIdent,
  normalizePath,
} from '@dcloudio/uni-cli-shared'
import type { TemplateCompilerOptions } from './options'
import { stringifyExpression } from './transforms/transformExpression'
import type { TransformContext } from './transform'
import type { CompilerError } from './errors'

export const __DEV__ = true
export const __BROWSER__ = false
export const __COMPAT__ = false

export function isCompatEnabled(...args: any[]) {
  return false
}

export function genRenderFunctionDecl({
  className,
  genDefaultAs,
  inline = false,
}: TemplateCompilerOptions & { genDefaultAs?: string }): string {
  if (inline) {
    return `(): any | null =>`
  }
  // 调整返回值类型为 any | null, 支持 <template>some text</template>
  const thisCode = genDefaultAs
    ? `this: InstanceType<typeof ${genDefaultAs}>`
    : ''
  return `function ${className || ''}Render(${thisCode}): any | null`
}

export function rewriteObjectExpression(
  exp: ExpressionNode,
  context: TransformContext
) {
  const source = stringifyExpression(exp)
  if (source.includes('{')) {
    const s = new MagicString(source)
    const ast = parseExpression(source, {
      plugins: context.expressionPlugins,
    })
    walk(ast, {
      enter(node: Node) {
        if (node.type === 'ObjectExpression') {
          s.prependLeft(
            node.start!,
            node.properties.length > 0 ? '_uM(' : '_uM<string, any | null>('
          )
          s.prependRight(node.end!, ')')
        }
      },
    })
    return createSimpleExpression(s.toString(), false, exp.loc)
  }
}

export function onCompilerError(error: CompilerError) {}

export function parseSource(fileName: string, rootDir: string) {
  if (fileName.includes('@dcloudio')) {
    return fileName
  }
  rootDir = normalizePath(rootDir)
  if (path.isAbsolute(fileName) && fileName.startsWith(rootDir)) {
    return '@/' + normalizePath(path.relative(rootDir, fileName))
  }
  return fileName
}

export function addEasyComponentAutoImports(
  easyComponentAutoImports: Record<string, [string, string]>,
  rootDir: string,
  tagName: string,
  fileName: string
) {
  if (easyComponentAutoImports[fileName]) {
    return
  }
  // 内置easycom，如 unicloud-db
  if (fileName.includes('@dcloudio')) {
    return
  }
  rootDir = normalizePath(rootDir)
  if (path.isAbsolute(fileName) && fileName.startsWith(rootDir)) {
    fileName = '@/' + normalizePath(path.relative(rootDir, fileName))
  }
  // 加密插件easycom类型导入
  if (fileName.includes('?uts-proxy')) {
    const moduleId = path.basename(fileName.split('?uts-proxy')[0])
    fileName = `uts.sdk.modules.${camelize(moduleId)}`
  }
  const ident = genUTSComponentPublicInstanceIdent(tagName)
  easyComponentAutoImports[fileName] = [ident, ident]
}
