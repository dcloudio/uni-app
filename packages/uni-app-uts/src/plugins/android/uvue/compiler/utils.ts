import path from 'path'
import { type Node } from '@babel/types'
import { ExpressionNode, createSimpleExpression } from '@vue/compiler-core'
import { MagicString, walk } from '@vue/compiler-sfc'
import { parseExpression } from '@babel/parser'
import {
  genUTSComponentPublicInstanceIdent,
  genUTSComponentPublicInstanceImported,
  normalizePath,
} from '@dcloudio/uni-cli-shared'
import { TemplateCompilerOptions } from './options'
import { stringifyExpression } from './transforms/transformExpression'
import { TransformContext } from './transform'
import { CompilerError } from './errors'

export const __DEV__ = true
export const __BROWSER__ = false
export const __COMPAT__ = false

export function genRenderFunctionDecl({
  className = '',
}: // inline = false,
TemplateCompilerOptions): string {
  // if(inline){
  //   return `(): VNode | null =>`
  // }
  // 调整返回值类型为 any | null, 支持 <template>some text</template>
  return `function ${className}Render(): any | null`
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
            node.properties.length > 0
              ? 'utsMapOf('
              : 'utsMapOf<string, any | null>('
          )
          s.prependRight(node.end!, ')')
        }
      },
    })
    return createSimpleExpression(s.toString(), false, exp.loc)
  }
}

export function onCompilerError(error: CompilerError) {}

export function addEasyComponentAutoImports(
  easyComponentAutoImports: Record<string, [string, string]>,
  rootDir: string,
  tagName: string,
  fileName: string
) {
  // 内置easycom，如 unicloud-db
  if (fileName.includes('@dcloudio')) {
    return
  }
  if (path.isAbsolute(fileName) && fileName.startsWith(rootDir)) {
    fileName = '@/' + normalizePath(path.relative(rootDir, fileName))
  }
  easyComponentAutoImports[fileName] = [
    genUTSComponentPublicInstanceImported(rootDir, fileName),
    genUTSComponentPublicInstanceIdent(tagName),
  ]
}
