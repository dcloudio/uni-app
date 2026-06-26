import { normalizePath } from '../../utils'

export const MP_INDEPENDENT_ROOT_QUERY = 'uni_mp_independent_root'

export interface IndependentSubPackage {
  root: string
  pages: string[]
  independent: true
}

export function parseIndependentSubPackages(
  pagesJson: UniApp.PagesJson | undefined,
  platform: UniApp.PLATFORM | string | undefined = process.env.UNI_PLATFORM
): IndependentSubPackage[] {
  if (platform !== 'mp-weixin' || !pagesJson) {
    return []
  }
  const subPackages = pagesJson.subPackages || pagesJson.subpackages || []
  if (!Array.isArray(subPackages)) {
    return []
  }
  return subPackages.reduce<IndependentSubPackage[]>((packages, subPackage) => {
    const subPackageOptions =
      subPackage as UniApp.PagesJsonSubpackagesOptions & {
        independent?: boolean
      }
    if (!subPackageOptions || subPackageOptions.independent !== true) {
      return packages
    }
    const root = normalizeSubPackageRoot(subPackageOptions.root)
    const pages = normalizeSubPackagePages(subPackageOptions.pages)
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

function normalizeSubPackageRoot(root: unknown) {
  if (typeof root !== 'string') {
    return ''
  }
  return normalizePath(root.trim()).replace(/^\/+|\/+$/g, '')
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
  return `${filename}?${query ? query + '&' : ''}${rootQuery}`
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
