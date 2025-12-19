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

import {
  offsetToLineColumn,
  offsetToStartAndEnd,
} from '../vite/plugins/vitejs/utils'
import { M } from '../messages'
import { type CompileLogError, onCompileLog } from '../logs'

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
  for (const node of pagePathNodes) {
    const pagePath = node.value ?? ''
    if (pagePath.startsWith('/')) {
      throwCompilerError(
        jsonStr,
        node,
        M['pages.json.page.slash'].replace('{pagePath}', pagePath)
      )
    }
  }
  findRootNode(root, ['subPackages', 'subpackages']).forEach((node) => {
    const subPackageRootNode = findSubPackageRoot(node)
    if (subPackageRootNode) {
      const subPackageRoot = subPackageRootNode.value ?? ''
      if (subPackageRoot.startsWith('/')) {
        throwCompilerError(
          jsonStr,
          subPackageRootNode,
          M['pages.json.page.slash'].replace('{pagePath}', subPackageRoot)
        )
      }
      findRootNode(node, ['pages']).forEach((subNode) => {
        walkNodes(subNode.children ?? []).forEach((node) => {
          const pagePath = node.value ?? ''
          if (pagePath.startsWith('/')) {
            throwCompilerError(
              jsonStr,
              node,
              M['pages.json.page.slash'].replace('{pagePath}', pagePath)
            )
          }
          pagePathNodes.push({
            ...node,
            value: normalizePath(path.join(subPackageRoot, pagePath)),
          })
        })
      })
    }
  })

  for (const node of pagePathNodes) {
    const pagePath: string = node.value ?? ''
    if (!pageExistsWithCaseSync(path.join(inputDir, pagePath))) {
      throwCompilerError(
        jsonStr,
        node,
        M['pages.json.page.notfound'].replace('{pagePath}', pagePath)
      )
    }
  }

  return true
}

function throwCompilerError(jsonStr: string, node: Node, message: string) {
  const error: CompileLogError = new Error(message)
  error.loc = offsetToStartAndEnd(
    jsonStr,
    node.offset,
    node.offset + node.length
  )
  error.customPrint = () => {
    onCompileLog('error', error, jsonStr, 'pages.json')
  }
  throw error
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
    return child.children[1]
  }
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
