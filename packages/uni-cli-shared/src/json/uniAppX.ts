import path from 'path'
import { extend, isArray } from '@vue/shared'
import { parseJson } from './json'
import { removePlatformStyle, validatePages } from './pages'
import { normalizePath } from '../utils'

export function normalizeUniAppXAppPagesJson(jsonStr: string) {
  const pagesJson: UniApp.PagesJson = {
    pages: [],
    globalStyle: {} as UniApp.PagesJson['globalStyle'],
  }
  let userPagesJson: UniApp.PagesJson = {
    pages: [],
    globalStyle: {} as UniApp.PagesJson['globalStyle'],
  }
  // preprocess
  try {
    userPagesJson = parseJson(jsonStr, true)
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
