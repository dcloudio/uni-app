import path from 'path'
import { extend, isArray } from '@vue/shared'
import { parseJson } from './json'
import { removePlatformStyle, validatePages } from './pages'
import { normalizePath } from '../utils'

export function normalizeUniAppXAppPagesJson(jsonStr: string) {
  let pagesJson: UniApp.PagesJson = {
    pages: [],
    globalStyle: {
      navigationBar: {},
    },
  }
  // preprocess
  try {
    pagesJson = parseJson(jsonStr, true)
  } catch (e) {
    console.error(`[vite] Error: pages.json parse failed.\n`, jsonStr, e)
  }
  // pages
  validatePages(pagesJson, jsonStr)
  pagesJson.subPackages = pagesJson.subPackages || pagesJson.subpackages
  delete pagesJson.subpackages
  // subPackages
  if (pagesJson.subPackages) {
    pagesJson.pages.push(...normalizeSubPackages(pagesJson.subPackages))
    delete pagesJson.subPackages
  } else {
    delete pagesJson.subPackages
  }
  // pageStyle
  normalizePages(pagesJson.pages)
  // globalStyle
  pagesJson.globalStyle = normalizePageStyle(pagesJson.globalStyle) as any
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
