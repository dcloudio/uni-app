import fs from 'fs'
import path from 'path'
import { isString } from '@vue/shared'
import type { CompilerError } from '@vue/compiler-core'
import {
  type Node,
  type ParseError,
  parseTree,
  printParseErrorCode,
} from 'jsonc-parser'

import { normalizePath } from '../utils'

import { offsetToLineColumn } from '../vite/plugins/vitejs/utils'

interface CheckPagesJsonError extends CompilerError {
  offsetStart: number
  offsetEnd: number
}

export function checkPagesJson(jsonStr: string, inputDir: string) {
  if (!inputDir) {
    return false
  }
  const errors: ParseError[] = []
  const root = parseTree(jsonStr, errors)
  if (!root) {
    if (errors.length) {
      for (const error of errors) {
        const { line, column } = offsetToLineColumn(jsonStr, error.offset)
        throw {
          name: 'SyntaxError',
          code: error.error,
          message: printParseErrorCode(error.error),
          loc: {
            start: { line, column },
          },
          offsetStart: error.offset,
          offsetEnd: error.offset + error.length,
        } as CheckPagesJsonError
      }
    }
    return false
  }
  const pagePathNodes = walkNodes(findRootNode(root, ['pages']))
  findRootNode(root, ['subPackages', 'subpackages']).forEach((node) => {
    const subPackageRoot = findSubPackageRoot(node)
    if (subPackageRoot) {
      findRootNode(node, ['pages']).forEach((subNode) => {
        walkNodes(subNode.children ?? []).forEach((node) => {
          pagePathNodes.push({
            ...node,
            value: normalizePath(path.join(subPackageRoot, node.value)),
          })
        })
      })
    }
  })

  if (pagePathNodes.length) {
    for (const node of pagePathNodes) {
      const pagePath: string = node.value ?? ''
      if (pageExistsWithCaseSync(path.join(inputDir, pagePath))) {
        continue
      }
      const { line, column } = offsetToLineColumn(jsonStr, node.offset)
      throw {
        name: 'CompilerError',
        code: 'CompilerError',
        message: `The page path "${pagePath}" does not exist`,
        loc: {
          start: { line, column },
        },
        offsetStart: node.offset,
        offsetEnd: node.offset + node.length,
      } as unknown as CheckPagesJsonError
    }
  }
  return true
}

function pageExistsWithCaseSync(pagePath: string) {
  try {
    const files = fs.readdirSync(path.dirname(pagePath))
    const basename = path.basename(pagePath)
    const uvuePage = basename + '.uvue'
    const vuePage = basename + '.vue'
    return files.some((file) => file === uvuePage || file === vuePage)
  } catch (e) {
    return false
  }
}

function findSubPackageRoot(node: Node) {
  const child = node.children?.find(
    (child) =>
      child.type === 'property' &&
      child.children &&
      child.children.find(
        (child) => child.type === 'string' && child.value === 'root'
      )
  )
  if (child && child.children?.length === 2) {
    return child.children[1].value
  }
  return ''
}

function findRootNode(node: Node, property: string[]) {
  const { type, children } = node
  if (type === 'object' && children) {
    const child = children.find(
      (child) =>
        child.type === 'property' &&
        child.children &&
        child.children.find(
          (child) => child.type === 'string' && property.includes(child.value)
        )
    )
    if (child) {
      const node = child.children!.find((child) => child.type === 'array')
      return node?.children ?? []
    }
  }
  return []
}

function walkNodes(node: Node[]) {
  const pagePathNodes: Node[] = []
  node.forEach((node) => walkNode(node, pagePathNodes))
  return pagePathNodes
}

function walkNode(node: Node, pagePathNodes: Node[]) {
  const { type, children } = node
  if (type === 'property' && children && children.length === 2) {
    const maybePagePathNode = children[0]
    const maybePagePathValueNode = children[1]
    if (
      maybePagePathNode.type === 'string' &&
      maybePagePathNode.value === 'path' &&
      maybePagePathValueNode.type === 'string' &&
      isString(maybePagePathValueNode.value)
    ) {
      pagePathNodes.push(maybePagePathValueNode)
    }
  }
  if (children) {
    children.forEach((node) => walkNode(node, pagePathNodes))
  }
}
