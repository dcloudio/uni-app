import {
  type Node,
  isCallExpression,
  isIdentifier,
  isMemberExpression,
  isStringLiteral,
} from '@babel/types'
import { walk } from 'estree-walker'
import { parseProgram } from './ast'

export function parseWxsCallMethods(code: string) {
  if (!code.includes('callMethod')) {
    return []
  }
  const ast = parseProgram(code, '', {})
  const wxsCallMethods = new Set<string>()
  ;(walk as any)(ast, {
    enter(child: Node) {
      if (!isCallExpression(child)) {
        return
      }
      const { callee } = child
      // .callMethod
      if (
        !isMemberExpression(callee) ||
        !isIdentifier(callee.property) ||
        callee.property.name !== 'callMethod'
      ) {
        return
      }
      // .callMethod('test',...)
      const args = child.arguments
      if (!args.length) {
        return
      }
      const [name] = args
      if (!isStringLiteral(name)) {
        return
      }
      wxsCallMethods.add(name.value)
    },
  })
  return [...wxsCallMethods]
}

export function genWxsCallMethodsCode(code: string) {
  const wxsCallMethods = parseWxsCallMethods(code)
  if (!wxsCallMethods.length) {
    return `export default {}`
  }
  return `export default (Component) => {
  if(!Component.wxsCallMethods){
    Component.wxsCallMethods = []
  }
  Component.wxsCallMethods.push(${wxsCallMethods
    .map((m) => `'${m}'`)
    .join(', ')})
}
`
}
