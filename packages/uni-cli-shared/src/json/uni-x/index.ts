import fs from 'fs'
import path from 'path'
import { extend, isArray, isString } from '@vue/shared'
import type { CompilerError } from '@vue/compiler-core'
import {
  type Node,
  type ParseError,
  parseTree,
  printParseErrorCode,
} from 'jsonc-parser'
import { parseJson } from '../json'
import {
  filterPlatformPages,
  isUniPageFile,
  pagesCacheSet,
  removePlatformStyle,
  validatePages,
} from '../pages'
import { normalizePath } from '../../utils'
import { normalizeAppUniRoutes } from '../app/pages/uniRoutes'
import { normalizeAppXUniConfig } from './uniConfig'
import { offsetToLineColumn } from '../../vite/plugins/vitejs/utils'
import { preUVueJson } from '../../preprocess'

export * from './manifest'
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

export function normalizeUniAppXAppPagesJson(jsonStr: string) {
  // 先条件编译
  jsonStr = preUVueJson(jsonStr, 'pages.json')
  checkPagesJson(jsonStr, process.env.UNI_INPUT_DIR)
  const pagesJson: UniApp.PagesJson = {
    pages: [],
    globalStyle: {} as UniApp.PagesJson['globalStyle'],
  }
  let userPagesJson: UniApp.PagesJson = {
    pages: [],
    globalStyle: {} as UniApp.PagesJson['globalStyle'],
  }
  try {
    // 此处不需要条件编译了
    userPagesJson = parseJson(jsonStr, false, 'pages.json')
  } catch (e) {
    console.error(`[vite] Error: pages.json parse failed.\n`, jsonStr, e)
  }
  // pages
  validatePages(userPagesJson, jsonStr)
  userPagesJson.subPackages =
    userPagesJson.subPackages || userPagesJson.subpackages
  // subPackages
  if (userPagesJson.subPackages) {
    userPagesJson.pages.push(...normalizeSubPackages(userPagesJson.subPackages))
  }
  pagesJson.pages = userPagesJson.pages

  // pageStyle
  normalizePages(pagesJson.pages)
  // globalStyle
  pagesJson.globalStyle = normalizePageStyle(userPagesJson.globalStyle) as any
  // tabBar
  if (userPagesJson.tabBar) {
    pagesJson.tabBar = userPagesJson.tabBar
  }
  // condition
  if (userPagesJson.condition) {
    pagesJson.condition = userPagesJson.condition
  }
  // uniIdRouter
  if (userPagesJson.uniIdRouter) {
    pagesJson.uniIdRouter = userPagesJson.uniIdRouter
  }
  // 是否应该用 process.env.UNI_UTS_PLATFORM
  filterPlatformPages(process.env.UNI_PLATFORM, pagesJson)

  // 缓存页面列表
  pagesCacheSet.clear()
  pagesJson.pages.forEach((page) => pagesCacheSet.add(page.path))

  return pagesJson
}

function normalizeSubPackages(
  subPackages?: UniApp.PagesJsonSubpackagesOptions[]
) {
  const pages: UniApp.PagesJsonPageOptions[] = []
  if (isArray(subPackages)) {
    subPackages.forEach(({ root, pages: subPages }) => {
      if (root && subPages.length) {
        subPages.forEach((subPage) => {
          subPage.path = normalizePath(path.join(root, subPage.path))
          subPage.style = subPage.style
          pages.push(subPage)
        })
      }
    })
  }
  return pages
}

function normalizePages(pages: UniApp.PagesJsonPageOptions[]) {
  pages.forEach((page) => {
    page.style = normalizePageStyle(page.style) as any
  })
}

function normalizePageStyle(
  pageStyle: UniApp.PagesJsonPageStyle | undefined
): Record<string, any> {
  if (pageStyle) {
    extend(pageStyle, pageStyle['app'])
    removePlatformStyle(pageStyle)
    return pageStyle
  }
  return {}
}

/**
 * TODO 应该闭包，通过globalThis赋值？
 * @param pagesJson
 * @param manifestJson
 * @returns
 */
export function normalizeUniAppXAppConfig(
  pagesJson: UniApp.PagesJson,
  manifestJson: Record<string, any>
) {
  const uniConfig = normalizeAppXUniConfig(pagesJson, manifestJson)
  const tabBar = uniConfig.tabBar
  delete uniConfig.tabBar
  let appConfigJs = `const __uniConfig = ${JSON.stringify(uniConfig)};
__uniConfig.getTabBarConfig = () =>  {return ${
    tabBar ? JSON.stringify(tabBar) : 'undefined'
  }};
__uniConfig.tabBar = __uniConfig.getTabBarConfig();
const __uniRoutes = ${normalizeAppUniRoutes(
    pagesJson
  )}.map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute)).concat(typeof __uniSystemRoutes !== 'undefined' ? __uniSystemRoutes : []);

`
  if (process.env.UNI_UTS_PLATFORM === 'app-harmony') {
    appConfigJs += `globalThis.__uniConfig = __uniConfig;
globalThis.__uniRoutes = __uniRoutes;`
  }
  return appConfigJs
}

export function isUniXPageFile(
  source: string,
  importer: string,
  inputDir = process.env.UNI_INPUT_DIR
) {
  if (source.startsWith('@/')) {
    return isUniPageFile(source.slice(2), inputDir)
  }
  if (source.startsWith('.')) {
    return isUniPageFile(path.resolve(path.dirname(importer), source), inputDir)
  }
  return false
}

export function getUniXPagePaths() {
  return Array.from(pagesCacheSet)
}
