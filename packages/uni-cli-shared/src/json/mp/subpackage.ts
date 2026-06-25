import fs from 'fs'
import path from 'path'
import { parseJson } from '../json'
import { normalizePath } from '../../utils'

export interface IndependentSubPackage {
  root: string
  pages: string[]
  independent: true
}

export function parseIndependentSubPackages(
  inputDir: string
): IndependentSubPackage[] {
  if (process.env.UNI_PLATFORM !== 'mp-weixin') {
    return []
  }
  const pagesJsonPath = path.resolve(inputDir, 'pages.json')
  if (!fs.existsSync(pagesJsonPath)) {
    return []
  }
  const pagesJson = parseJson(
    fs.readFileSync(pagesJsonPath, 'utf8'),
    true,
    pagesJsonPath
  ) as UniApp.PagesJson
  if (!pagesJson) {
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
    if (page && typeof page.path === 'string' && page.path) {
      paths.push(normalizePath(page.path))
    }
    return paths
  }, [])
}
