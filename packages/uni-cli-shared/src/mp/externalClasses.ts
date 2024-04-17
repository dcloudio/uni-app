import {
  type Node,
  type Program,
  isArrayExpression,
  isIdentifier,
  isObjectProperty,
  isStringLiteral,
} from '@babel/types'
import { walk } from 'estree-walker'

const externalClassesCache = new Map<string, string[]>()

export function hasExternalClasses(code: string) {
  return code.includes('externalClasses')
}

export function findMiniProgramComponentExternalClasses(filename: string) {
  return externalClassesCache.get(filename)
}

export function updateMiniProgramComponentExternalClasses(
  filename: string,
  classes: string[]
) {
  externalClassesCache.set(filename, classes)
}

export function parseExternalClasses(ast: Program) {
  const classes: string[] = []
  ;(walk as any)(ast, {
    enter(child: Node, parent: Node) {
      if (!isIdentifier(child) || child.name !== 'externalClasses') {
        return
      }
      // export default { externalClasses: ['my-class'] }
      if (!isObjectProperty(parent)) {
        return
      }
      if (!isArrayExpression(parent.value)) {
        return
      }
      parent.value.elements.forEach((element) => {
        if (isStringLiteral(element)) {
          classes.push(element.value)
        }
      })
    },
  })
  return classes
}
