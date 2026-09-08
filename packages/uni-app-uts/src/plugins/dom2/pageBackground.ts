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

interface PageSelectorBackgroundConfig {
  global?: PageSelectorBackgroundColor
  pages?: Record<string, PageSelectorBackgroundColor>
}

export const PAGE_SELECTOR_BACKGROUND_COLOR = 'pageSelectorBackgroundColor'

const globalBackgroundColor: PageSelectorBackgroundColor = {}
const pageBackgroundColors = new Map<string, PageSelectorBackgroundColor>()
const pageBackgroundColorCache = new Map<
  string,
  PageSelectorBackgroundColor | undefined
>()

export function resetPageSelectorBackgroundColors() {
  delete globalBackgroundColor.light
  delete globalBackgroundColor.dark
  pageBackgroundColors.clear()
}

export function collectPageSelectorBackgroundColor(
  filename: string,
  backgroundColor: PageSelectorBackgroundColor | undefined
) {
  const target = getTarget(filename)
  if (!target) return
  pageBackgroundColorCache.set(filename, backgroundColor)
  clearTarget(target)
  if (!backgroundColor) return
  if (target === 'global') {
    Object.assign(globalBackgroundColor, backgroundColor)
  } else {
    pageBackgroundColors.set(target, backgroundColor)
  }
}

export function restoreCachedPageSelectorBackgroundColor(filename: string) {
  if (pageBackgroundColorCache.has(filename)) {
    collectPageSelectorBackgroundColor(
      filename,
      pageBackgroundColorCache.get(filename)
    )
  }
}

function clearTarget(target: 'global' | string) {
  if (target === 'global') {
    delete globalBackgroundColor.light
    delete globalBackgroundColor.dark
  } else {
    pageBackgroundColors.delete(target)
  }
}

export function applyPageSelectorBackgroundColors(pagesJson: UniApp.PagesJson) {
  const config: PageSelectorBackgroundConfig = {}
  if (
    globalBackgroundColor.light !== undefined ||
    globalBackgroundColor.dark !== undefined
  ) {
    config.global = {
      ...globalBackgroundColor,
    }
  }
  const pages: Record<string, PageSelectorBackgroundColor> = {}
  pagesJson.pages.forEach((page) => {
    const backgroundColor = pageBackgroundColors.get(page.path)
    if (!backgroundColor) return
    pages[page.path] = { ...backgroundColor }
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
