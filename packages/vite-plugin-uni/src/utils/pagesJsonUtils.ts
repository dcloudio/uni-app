import path from 'path'

import slash from 'slash'

import { parseJson } from '@dcloudio/uni-cli-shared'

interface PageOptions {
  path: string
  style?: Record<string, any>
}
interface SubpackagesOptions {
  root: string
  pages: PageOptions[]
}

interface PageRouteOptions {
  name: string
  path: string
  props: Record<string, any>
  meta: {
    isQuit: boolean
    isEntry: boolean
    isTabBar: boolean
    tabBarIndex: boolean
    windowTop: number
  }
}

function formatPages(pagesJson: Record<string, any>, jsonStr: string) {
  if (!Array.isArray(pagesJson.pages)) {
    pagesJson.pages = []
    console.error(`[vite] Error: pages.json->pages parse failed.\n`, jsonStr)
  } else if (!pagesJson.pages.length) {
    console.error(
      `[vite] Error: pages.json->pages must contain at least 1 page.\n`,
      jsonStr
    )
  }
}

function removePlatformStyle(globalStyle: Record<string, any>) {
  delete globalStyle['app-plus']
  delete globalStyle['h5']
  Object.keys(globalStyle).forEach(name => {
    if (name.startsWith('mp-') || name.startsWith('quickapp')) {
      delete globalStyle[name]
    }
  })
  return globalStyle
}

function formatPageStyle(pageStyle?: Record<string, any>) {
  if (pageStyle) {
    const appGlobalStyle = pageStyle['app-plus']
    if (appGlobalStyle) {
      Object.assign(pageStyle, appGlobalStyle)
    }
    const h5GlobalStyle = pageStyle['h5']
    if (h5GlobalStyle) {
      Object.assign(pageStyle, h5GlobalStyle)
    }
    return removePlatformStyle(pageStyle)
  }
}

function formatSubpackages(subpackages: SubpackagesOptions[]) {
  const pages: PageOptions[] = []
  if (Array.isArray(subpackages)) {
    subpackages.forEach(({ root, pages: subPages }) => {
      if (root && subPages.length) {
        subPages.forEach((subPage: { path: string }) => {
          subPage.path = slash(path.join(root, subPage.path))
          pages.push(subPage)
        })
      }
    })
  }
  return pages
}

function formatPagesJson(jsonStr: string) {
  let pagesJson: Record<string, any> = {
    pages: []
  }
  //TODO preprocess
  try {
    pagesJson = parseJson(jsonStr, true)
  } catch (e) {
    console.error(`[vite] Error: pages.json parse failed.\n`, jsonStr, e)
  }
  // pages
  formatPages(pagesJson, jsonStr)
  // subpackages
  pagesJson.pages.push(
    ...formatSubpackages(pagesJson.subPackages || pagesJson.subpackages)
  )
  // globalStyle
  formatPageStyle(pagesJson.globalStyle)
  return pagesJson
}

function formatPageIdentifier(path: string) {
  return path.replace(/\//g, '')
}

function generatePageDefineCode(pageOptions: PageOptions) {
  return `const ${formatPageIdentifier(
    pageOptions.path
  )} = defineAsyncComponent(() => import('./${pageOptions.path}.vue'))`
}

function generatePagesDefineCode(pagesJson: Record<string, any>) {
  return (pagesJson.pages as PageOptions[])
    .map(pageOptions => generatePageDefineCode(pageOptions))
    .join('\n')
}

function formatPagesRoute(pagesJson: Record<string, any>): PageRouteOptions[] {
  const firstPagePath = pagesJson.pages[0].path
  const tabBarList = (pagesJson.tabBar && pagesJson.tabBar.list) || []
  return (pagesJson.pages as PageOptions[]).map(pageOptions => {
    const path = pageOptions.path
    const name = formatPageIdentifier(path)
    const isEntry = firstPagePath === path
    const tabBarIndex = tabBarList.findIndex(
      (tabBarPage: { pagePath: string }) => tabBarPage.pagePath === path
    )
    const isTabBar = tabBarIndex !== -1
    const props = formatPageStyle(pageOptions.style) || {}

    let windowTop = 0
    const meta = {
      isQuit: isEntry || isTabBar,
      isEntry,
      isTabBar,
      tabBarIndex,
      windowTop
    }
    Object.assign(props, meta)
    return {
      name,
      path: pageOptions.path,
      props,
      meta
    }
  })
}

function generatePageRoute({ name, path, props, meta }: PageRouteOptions) {
  return `{
  path:'/${meta.isEntry ? '' : path}',
  component:{
    render() {
      return (openBlock(), createBlock(PageComponent, Object.assign({}, __uniConfig.globalStyle, ${JSON.stringify(
        props
      )}), {page: withCtx(() => [createVNode(${name})]), _: 1}, 16))
    }
  }
}`
}

function generatePagesRoute(pagesRouteOptions: PageRouteOptions[]) {
  return pagesRouteOptions.map(pageOptions => generatePageRoute(pageOptions))
}

function generateRoutes(pagesJson: Record<string, any>) {
  return [
    `{ path: '/${pagesJson.pages[0].path}', redirect: '/' }`,
    ...generatePagesRoute(formatPagesRoute(pagesJson))
  ]
}

function generateConfig(pagesJson: Record<string, any>) {
  delete pagesJson.pages
  delete pagesJson.subPackages
  delete pagesJson.subpackages
  pagesJson.router = {} // TODO
  return JSON.stringify(pagesJson)
}

export function parsePagesJson(jsonStr: string) {
  const pagesJson = formatPagesJson(jsonStr)
  const definePagesCode = generatePagesDefineCode(pagesJson)
  const uniRoutesCode = generateRoutes(pagesJson).join(',')
  const uniConfigCode = generateConfig(pagesJson)
  return `
import {
    defineAsyncComponent,
    resolveComponent,
    createVNode,
    withCtx,
    openBlock,
    createBlock
} from 'vue'

import {
    PageComponent
} from '@dcloudio/uni-h5'
${definePagesCode}
window.__uniConfig=${uniConfigCode}
window.__uniRoutes=[${uniRoutesCode}]
`
}
