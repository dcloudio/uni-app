import type { Node, Program } from '@babel/types'
import MagicString from 'magic-string'
import { walk } from 'estree-walker'

export function rewriteSourceMap(
  ast: Program,
  s: MagicString,
  {
    fileName,
    startLine,
    startOffset,
  }: {
    fileName: string
    startLine: number
    startOffset: number
  }
) {
  // 暂时屏蔽
  if (true) {
    return
  }
  if (fileName.includes('/@dcloudio/')) {
    return
  }
  walk(ast, {
    enter(node: Node, _parent?: Node) {
      // const a = {}
      if (
        node.type === 'VariableDeclarator' &&
        node.init &&
        node.init.loc &&
        node.id.type === 'Identifier'
      ) {
        const { id, init } = node
        if (init.type === 'ObjectExpression') {
          let isJsonObj = false
          if (!id.typeAnnotation) {
            isJsonObj = true
          } else if (
            id.typeAnnotation &&
            id.typeAnnotation.type === 'TSTypeAnnotation' &&
            id.typeAnnotation.typeAnnotation.type === 'TSTypeReference'
          ) {
            const { typeName } = id.typeAnnotation.typeAnnotation
            if (
              typeName.type === 'Identifier' &&
              typeName.name === 'UTSJSONObject'
            ) {
              isJsonObj = true
            }
          }
          if (isJsonObj) {
            const start = init.loc!.start
            s.appendRight(
              startOffset + init.start! + 1,
              `__$originalPosition: new UTSSourceMapPosition("${
                id.name
              }", "${fileName}", ${startLine + start.line}, ${
                start.column + 1
              }),`
            )
          }
        } else if (
          init.type === 'TSAsExpression' &&
          init.typeAnnotation.type === 'TSTypeReference' &&
          init.expression.type === 'ObjectExpression'
        ) {
          const { typeName } = init.typeAnnotation
          if (
            typeName.type === 'Identifier' &&
            typeName.name === 'UTSJSONObject'
          ) {
            const start = init.loc!.start
            s.appendRight(
              startOffset + init.start! + 1,
              `\n__$originalPosition: new UTSSourceMapPosition("${
                id.name
              }", "${fileName}", ${startLine + start.line}, ${
                start.column + 1
              }),\n`
            )
          }
        }
      } else if (
        node.type === 'TSTypeAliasDeclaration' &&
        node.typeAnnotation.type === 'TSTypeLiteral' &&
        node.id.type === 'Identifier'
      ) {
        const start = node.loc!.start
        s.appendRight(
          startOffset + node.typeAnnotation.start! + 1,
          `\n__$originalPosition: UTSSourceMapPosition<"${
            node.id.name
          }", "${fileName}", ${startLine + start.line}, ${start.column + 1}>\n`
        )
      }
    },
  })
}
