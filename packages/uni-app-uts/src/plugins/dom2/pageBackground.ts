import path from 'node:path'
import {
  isUniPageFile,
  normalizePath,
  removeExt,
} from '@dcloudio/uni-cli-shared'

export interface PageSelectorBackgroundColor {
  light?: string
  dark?: string
}

export interface PageSelectorBackgroundDeclaration {
  vars: Record<string, string>
  backgroundValue?: string
}

export interface PageSelectorBackgroundDeclarations {
  base: PageSelectorBackgroundDeclaration
  light: PageSelectorBackgroundDeclaration
  dark: PageSelectorBackgroundDeclaration
}

interface PageSelectorBackgroundConfig {
  global?: PageSelectorBackgroundColor
  pages?: Record<string, PageSelectorBackgroundColor>
}

type Theme = 'light' | 'dark'
type ThemeBackgroundDeclarations = Record<
  Theme,
  PageSelectorBackgroundDeclaration
>
export type PageSelectorBackgroundValueResolver = (
  value: string,
  vars: Record<string, string>
) => string | undefined

export const PAGE_SELECTOR_BACKGROUND_COLOR = 'pageSelectorBackgroundColor'

let globalBackgroundDeclarations: PageSelectorBackgroundDeclarations | undefined
let pageSelectorBackgroundValueResolver:
  | PageSelectorBackgroundValueResolver
  | undefined
const pageBackgroundDeclarations = new Map<
  string,
  PageSelectorBackgroundDeclarations
>()
const pageBackgroundDeclarationCache = new Map<
  string,
  PageSelectorBackgroundDeclarations | undefined
>()

export function resetPageSelectorBackgroundColors() {
  globalBackgroundDeclarations = undefined
  pageBackgroundDeclarations.clear()
}

// 由 CSS 插件注入 compiler 的同一解析器，避免构建链维护两套 CSS 变量语义。
export function setPageSelectorBackgroundValueResolver(
  resolver: PageSelectorBackgroundValueResolver
) {
  pageSelectorBackgroundValueResolver = resolver
}

export function collectPageSelectorBackgroundDeclarations(
  filename: string,
  declarations: PageSelectorBackgroundDeclarations | undefined
) {
  const target = getTarget(filename)
  if (!target) return
  pageBackgroundDeclarationCache.set(filename, declarations)
  clearTarget(target)
  if (!declarations) return
  if (target === 'global') {
    globalBackgroundDeclarations = declarations
  } else {
    pageBackgroundDeclarations.set(target, declarations)
  }
}

// 保留旧的构建测试和外部调用方式，预解析颜色按原始声明接入同一条聚合链路。
export function collectPageSelectorBackgroundColor(
  filename: string,
  color: PageSelectorBackgroundColor | undefined
) {
  collectPageSelectorBackgroundDeclarations(
    filename,
    color ? colorToDeclarations(color) : undefined
  )
}

export function restoreCachedPageSelectorBackgroundColor(filename: string) {
  if (pageBackgroundDeclarationCache.has(filename)) {
    collectPageSelectorBackgroundDeclarations(
      filename,
      pageBackgroundDeclarationCache.get(filename)
    )
  }
}

function clearTarget(target: 'global' | string) {
  if (target === 'global') {
    globalBackgroundDeclarations = undefined
  } else {
    pageBackgroundDeclarations.delete(target)
  }
}

export function applyPageSelectorBackgroundColors(pagesJson: UniApp.PagesJson) {
  const config: PageSelectorBackgroundConfig = {}
  const globalDeclarations = resolveThemeDeclarations(
    globalBackgroundDeclarations
  )
  const globalColor = resolveBackgroundColor(globalDeclarations)
  if (globalColor) {
    config.global = globalColor
  }

  const pages: Record<string, PageSelectorBackgroundColor> = {}
  pagesJson.pages.forEach((page) => {
    const pageColor = resolvePageBackgroundColor(
      globalDeclarations,
      pageBackgroundDeclarations.get(page.path),
      globalColor
    )
    if (pageColor) {
      pages[page.path] = pageColor
    }
  })
  if (Object.keys(pages).length) {
    config.pages = pages
  }
  if (config.global || config.pages) {
    ;(pagesJson as any)[PAGE_SELECTOR_BACKGROUND_COLOR] = config
  } else {
    delete (pagesJson as any)[PAGE_SELECTOR_BACKGROUND_COLOR]
  }
}

function resolveBackgroundColor(
  declarations: ThemeBackgroundDeclarations
): PageSelectorBackgroundColor | undefined {
  const color: PageSelectorBackgroundColor = {}
  const light = declarations.light.backgroundValue
    ? resolveCssValue(
        declarations.light.backgroundValue,
        declarations.light.vars
      )
    : undefined
  const dark = declarations.dark.backgroundValue
    ? resolveCssValue(declarations.dark.backgroundValue, declarations.dark.vars)
    : undefined
  if (light !== undefined) color.light = light
  if (dark !== undefined) color.dark = dark
  return Object.keys(color).length ? color : undefined
}

function resolvePageBackgroundColor(
  global: ThemeBackgroundDeclarations,
  page: PageSelectorBackgroundDeclarations | undefined,
  globalColor: PageSelectorBackgroundColor | undefined
): PageSelectorBackgroundColor | undefined {
  if (!page) return
  const color: PageSelectorBackgroundColor = {}
  const pageDeclarations = resolveThemeDeclarations(page)
  const light = resolvePageThemeBackgroundColor(
    global.light,
    pageDeclarations.light,
    globalColor?.light
  )
  const dark = resolvePageThemeBackgroundColor(
    global.dark,
    pageDeclarations.dark,
    globalColor?.dark
  )
  if (light !== undefined) color.light = light
  if (dark !== undefined) color.dark = dark
  return Object.keys(color).length ? color : undefined
}

function resolvePageThemeBackgroundColor(
  globalDeclaration: PageSelectorBackgroundDeclaration,
  pageDeclaration: PageSelectorBackgroundDeclaration,
  globalColor: string | undefined
) {
  const backgroundValue =
    pageDeclaration.backgroundValue ?? globalDeclaration.backgroundValue
  if (!backgroundValue) return undefined

  const vars = { ...globalDeclaration.vars, ...pageDeclaration.vars }
  const color = resolveCssValue(backgroundValue, vars)
  if (color === undefined) return undefined

  const hasPageBackground = pageDeclaration.backgroundValue !== undefined
  const hasPageVariableOverride = Object.keys(pageDeclaration.vars).length > 0
  if (!hasPageBackground && !hasPageVariableOverride) return undefined
  if (!hasPageBackground && color === globalColor) return undefined
  return color
}

function resolveThemeDeclaration(
  declarations: PageSelectorBackgroundDeclarations | undefined,
  theme: Theme
): PageSelectorBackgroundDeclaration {
  const base = declarations?.base
  const variant = declarations?.[theme]
  return {
    vars: { ...(base?.vars || {}), ...(variant?.vars || {}) },
    backgroundValue: variant?.backgroundValue ?? base?.backgroundValue,
  }
}

function resolveThemeDeclarations(
  declarations: PageSelectorBackgroundDeclarations | undefined
): ThemeBackgroundDeclarations {
  return {
    light: resolveThemeDeclaration(declarations, 'light'),
    dark: resolveThemeDeclaration(declarations, 'dark'),
  }
}

function resolveCssValue(value: string, vars: Record<string, string>) {
  if (!/\bvar\s*\(/i.test(value)) return value.trim()
  return pageSelectorBackgroundValueResolver?.(value, vars)
}

function colorToDeclarations(
  color: PageSelectorBackgroundColor
): PageSelectorBackgroundDeclarations {
  return {
    base: { vars: {} },
    light: { vars: {}, backgroundValue: color.light },
    dark: { vars: {}, backgroundValue: color.dark },
  }
}

function getTarget(filename: string): 'global' | string | undefined {
  filename = filename.split('?')[0]
  if (filename === 'App.uvue' || filename === 'App.vue') return 'global'
  const relative = normalizePath(
    path.relative(process.env.UNI_INPUT_DIR, filename)
  )
  if (relative === 'App.uvue' || relative === 'App.vue') return 'global'
  if (!isUniPageFile(filename)) return
  return removeExt(relative)
}
