import path from 'path'
import {
  type IndependentSubPackage,
  MP_INDEPENDENT_ROOT_QUERY,
  normalizePath,
} from '@dcloudio/uni-cli-shared'

export const INDEPENDENT_SUBPACKAGE_PLUGIN_NAME =
  'uni:mp-independent-subpackage'
export const INDEPENDENT_MAIN_PREFIX = '\0uni:mp-independent-main'
export const APP_FACTORY_PREFIX = '\0uni:mp-app-factory'
export const INDEPENDENT_PAGES_PREFIX = '\0uni:mp-independent-pages'
export const INDEPENDENT_PAGE_PREFIX = '\0uni:mp-independent-page'
export const VUE_EXPORT_HELPER_ID = '\0plugin-vue:export-helper'
export const UNI_MP_RUNTIME_ID = 'uni-mp-runtime'
export const INDEPENDENT_ROOT_QUERY = MP_INDEPENDENT_ROOT_QUERY
export const INDEPENDENT_ROOT_PARAM = 'root'
export const INDEPENDENT_PAGE_PARAM = 'page'

let independentSubPackages: IndependentSubPackage[] = []
let independentRootMatchers: IndependentRootMatcher[] = []
let initialIndependentRootsSignature: string | undefined

interface IndependentRootMatcher {
  root: string
  normalizedRoot: string
}

export interface UpdateIndependentSubPackagesResult {
  rootsChanged: boolean
  initialRoots: string
  currentRoots: string
}

export function initIndependentSubPackages(
  packages: IndependentSubPackage[]
): void {
  setIndependentSubPackages(packages)
  initialIndependentRootsSignature = stringifyIndependentRoots(packages)
}

export function updateIndependentSubPackages(
  packages: IndependentSubPackage[]
): UpdateIndependentSubPackagesResult {
  const currentRoots = stringifyIndependentRoots(packages)
  if (initialIndependentRootsSignature === undefined) {
    initialIndependentRootsSignature = currentRoots
  }
  const rootsChanged = currentRoots !== initialIndependentRootsSignature
  if (!rootsChanged) {
    setIndependentSubPackages(packages)
  }
  return {
    rootsChanged,
    initialRoots: initialIndependentRootsSignature,
    currentRoots,
  }
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

export function formatIndependentVirtualId(
  prefix: string,
  root: string
): string {
  return `${prefix}?${INDEPENDENT_ROOT_PARAM}=${encodeURIComponent(root)}`
}

export function formatIndependentPageVirtualId(
  root: string,
  page: string
): string {
  return `${formatIndependentVirtualId(
    INDEPENDENT_PAGE_PREFIX,
    root
  )}&${INDEPENDENT_PAGE_PARAM}=${encodeURIComponent(page)}`
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

function setIndependentSubPackages(packages: IndependentSubPackage[]): void {
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

function normalizeIndependentRoot(root: string): string {
  return normalizePath(root).replace(/^\/+|\/+$/g, '')
}

export function parseIndependentRoot(id: string): string | undefined {
  const query = splitIdQuery(id).query
  if (!query) {
    return
  }
  for (const item of query.split('&')) {
    const [name, value = ''] = splitQueryItem(item)
    if (name === INDEPENDENT_ROOT_QUERY) {
      return decodeURIComponent(value)
    }
  }
}

export function withIndependentRoot(id: string, root: string): string {
  const cleanId = withoutIndependentRoot(id)
  const { filename, query } = splitIdQuery(cleanId)
  const rootQuery = `${INDEPENDENT_ROOT_QUERY}=${encodeURIComponent(root)}`
  return `${filename}?${query ? query + '&' : ''}${rootQuery}`
}

export function withoutIndependentRoot(id: string): string {
  const { filename, query } = splitIdQuery(id)
  if (!query) {
    return id
  }
  const nextQuery = query
    .split('&')
    .filter((item) => splitQueryItem(item)[0] !== INDEPENDENT_ROOT_QUERY)
    .join('&')
  return nextQuery ? `${filename}?${nextQuery}` : filename
}

export function hasIndependentRoot(id: string): boolean {
  return parseIndependentRoot(id) !== undefined
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
