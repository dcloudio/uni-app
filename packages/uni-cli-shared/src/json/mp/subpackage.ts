import path from 'path'
import { normalizePath } from '../../utils'

export const MP_INDEPENDENT_ROOT_QUERY = 'uni_mp_independent_root'
export const MP_INDEPENDENT_MAIN_PREFIX = '\0uni:mp-independent-main'
export const MP_INDEPENDENT_VIRTUAL_ROOT_QUERY = 'root'

export interface IndependentSubPackage {
  root: string
  pages: string[]
  independent: true
}

export function parseIndependentSubPackages(
  pagesJson: UniApp.PagesJson | undefined
): IndependentSubPackage[] {
  if (!pagesJson) {
    return []
  }
  const subPackages = pagesJson.subPackages || pagesJson.subpackages || []
  if (!Array.isArray(subPackages)) {
    return []
  }
  return subPackages.reduce<IndependentSubPackage[]>((packages, subPackage) => {
    if (!subPackage || subPackage.independent !== true) {
      return packages
    }
    const root = normalizeSubPackageRoot(subPackage.root)
    const pages = normalizeSubPackagePages(subPackage.pages)
    if (!root || !pages.length) {
      return packages
    }
    packages.push({
      root,
      pages,
      independent: true,
    })
    return packages
  }, [])
}

let independentSubPackages: IndependentSubPackage[] = []
let independentRootMatchers: IndependentRootMatcher[] = []

interface IndependentRootMatcher {
  root: string
  normalizedRoot: string
}

export function setIndependentSubPackages(
  packages: IndependentSubPackage[]
): void {
  independentSubPackages = packages.reduce<IndependentSubPackage[]>(
    (result, pkg) => {
      const root = normalizeIndependentRoot(pkg.root)
      if (root) {
        result.push({
          ...pkg,
          root,
        })
      }
      return result
    },
    []
  )
  independentRootMatchers = independentSubPackages
    .map(({ root }) => ({
      root,
      normalizedRoot: root,
    }))
    .sort((a, b) => b.normalizedRoot.length - a.normalizedRoot.length)
}

export function getIndependentSubPackages(): IndependentSubPackage[] {
  return independentSubPackages
}

export function getIndependentRoots(): Set<string> {
  return new Set(independentSubPackages.map(({ root }) => root))
}

export function getIndependentRootByFilename(
  filename: string,
  inputDir: string | undefined
): string | undefined {
  const cleanFilename = splitIdQuery(withoutIndependentRoot(filename)).filename
  if (!inputDir || !path.isAbsolute(cleanFilename)) {
    return
  }
  const relativeFilename = normalizePath(path.relative(inputDir, cleanFilename))
  const matcher = independentRootMatchers.find(({ normalizedRoot }) => {
    return (
      relativeFilename === normalizedRoot ||
      relativeFilename.startsWith(`${normalizedRoot}/`)
    )
  })
  return matcher?.root
}

export function resolveIndependentRoot(
  id: string,
  importer: string | undefined,
  inputDir: string | undefined,
  platform: string | undefined
): string | undefined {
  if (!platform?.startsWith('mp-')) {
    return
  }
  const root =
    parseIndependentRoot(id) ||
    (importer
      ? parseIndependentRoot(importer) ||
        getIndependentRootByFilename(importer, inputDir)
      : undefined)
  const normalizedRoot = root && normalizeIndependentRoot(root)
  if (normalizedRoot && getIndependentRoots().has(normalizedRoot)) {
    return normalizedRoot
  }
}

export function withIndependentRootIfNeeded(
  id: string,
  root: string | undefined,
  inputDir: string | undefined
) {
  if (
    !root ||
    !inputDir ||
    parseIndependentRoot(id) ||
    isIndependentStyleRequest(id)
  ) {
    return id
  }
  if (isInIndependentRoot(id, inputDir, root) || isAppPagesJson(id, inputDir)) {
    return withIndependentRoot(id, root)
  }
  return id
}

export function isInIndependentRoot(
  filename: string,
  inputDir: string,
  root: string
) {
  const cleanFilename = normalizePath(withoutIndependentRoot(filename)).split(
    '?'
  )[0]
  const normalizedInputDir = normalizePath(inputDir)
  const normalizedRoot = normalizeIndependentRoot(root)
  const rootDir = `${normalizedInputDir}/${normalizedRoot}`
  return cleanFilename === rootDir || cleanFilename.startsWith(`${rootDir}/`)
}

export function isAppPagesJson(filename: string, inputDir: string) {
  const cleanFilename = normalizePath(withoutIndependentRoot(filename)).split(
    '?'
  )[0]
  const pagesJson = normalizePath(path.join(inputDir, 'pages.json'))
  // uni-app x 的 UTS resolver 会把 JSON 文件映射为 .json.ts 参与类型编译。
  return cleanFilename === pagesJson || cleanFilename === `${pagesJson}.ts`
}

export function stringifyIndependentRoots(
  packages: IndependentSubPackage[]
): string {
  return packages
    .map(({ root }) => normalizeIndependentRoot(root))
    .filter(Boolean)
    .sort()
    .join('\n')
}

export function normalizeIndependentRoot(root: string): string {
  return normalizePath(root).replace(/^\/+|\/+$/g, '')
}

function isIndependentStyleRequest(id: string) {
  const cleanId = withoutIndependentRoot(id)
  // 这里保持独立判断，避免 json/mp 基础能力反向依赖 Vite CSS 插件实现。
  return /\.(?:css|less|sass|scss|styl|stylus|pcss|postcss)(?:$|\?)/.test(
    cleanId
  )
}

function normalizeSubPackageRoot(root: unknown) {
  if (typeof root !== 'string') {
    return ''
  }
  return normalizeIndependentRoot(root.trim())
}

function normalizeSubPackagePages(pages: unknown) {
  if (!Array.isArray(pages)) {
    return []
  }
  return pages.reduce<string[]>((paths, page) => {
    if (typeof page === 'string' && page) {
      paths.push(normalizePath(page))
    } else if (page && typeof page.path === 'string' && page.path) {
      paths.push(normalizePath(page.path))
    }
    return paths
  }, [])
}

export function parseIndependentRoot(id: string): string | undefined {
  const query = splitIdQuery(id).query
  if (!query) {
    return
  }
  for (const item of query.split('&')) {
    const [name, value = ''] = splitQueryItem(item)
    if (name === MP_INDEPENDENT_ROOT_QUERY) {
      return decodeURIComponent(value)
    }
  }
}

export function withIndependentRoot(id: string, root: string): string {
  const cleanId = withoutIndependentRoot(id)
  const { filename, query } = splitIdQuery(cleanId)
  const rootQuery = `${MP_INDEPENDENT_ROOT_QUERY}=${encodeURIComponent(root)}`
  return `${normalizePath(filename)}?${query ? query + '&' : ''}${rootQuery}`
}

export function withoutIndependentRoot(id: string): string {
  const { filename, query } = splitIdQuery(id)
  if (!query) {
    return id
  }
  const nextQuery = query
    .split('&')
    .filter((item) => splitQueryItem(item)[0] !== MP_INDEPENDENT_ROOT_QUERY)
    .join('&')
  return nextQuery ? `${filename}?${nextQuery}` : filename
}

export function hasIndependentRoot(id: string): boolean {
  return parseIndependentRoot(id) !== undefined
}

export function formatIndependentVirtualId(
  prefix: string,
  root: string
): string {
  return `${prefix}?${MP_INDEPENDENT_VIRTUAL_ROOT_QUERY}=${encodeURIComponent(
    root
  )}`
}

export function parseIndependentMainRoot(id: string): string | undefined {
  return parseIndependentVirtualRoot(id, MP_INDEPENDENT_MAIN_PREFIX)
}

export function parseIndependentVirtualRoot(
  id: string,
  prefix: string
): string | undefined {
  if (!id.startsWith(`${prefix}?`)) {
    return
  }
  const { query } = splitIdQuery(id)
  if (!query) {
    return
  }
  for (const item of query.split('&')) {
    const [name, value = ''] = splitQueryItem(item)
    if (name === MP_INDEPENDENT_VIRTUAL_ROOT_QUERY) {
      return decodeURIComponent(value)
    }
  }
}

function splitIdQuery(id: string) {
  const queryIndex = id.indexOf('?')
  if (queryIndex === -1) {
    return { filename: id, query: '' }
  }
  return {
    filename: id.slice(0, queryIndex),
    query: id.slice(queryIndex + 1),
  }
}

function splitQueryItem(item: string) {
  const equalIndex = item.indexOf('=')
  if (equalIndex === -1) {
    return [item, ''] as const
  }
  return [item.slice(0, equalIndex), item.slice(equalIndex + 1)] as const
}
