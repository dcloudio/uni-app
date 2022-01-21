import { parseVueRequest } from './vite/utils/url'

const WXS_RE = /vue&type=wxs/
export function isWxs(id: string) {
  return WXS_RE.test(id)
}
const SJS_RE = /vue&type=sjs/
export function isSjs(id: string) {
  return SJS_RE.test(id)
}
const RENDERJS_RE = /vue&type=renderjs/
export function isRenderjs(id: string) {
  return RENDERJS_RE.test(id)
}

type FilterType = 'wxs' | 'renderjs' | 'sjs'

export function parseRenderjs(id: string) {
  if (isWxs(id) || isRenderjs(id) || isSjs(id)) {
    const { query, filename } = parseVueRequest(id)
    return {
      type: query.type as FilterType,
      name: (query as any).name as string,
      filename,
    }
  }
  return {
    type: '',
    name: '',
    filename: '',
  } as const
}

export function missingModuleName(type: FilterType, code: string) {
  return `<script module="missing module name" lang="${type}">
${code}
</script>`
}

const moduleRE = /module=["'](.*?)["']/

export function parseFilterNames(lang: string, code: string) {
  const names: string[] = []
  const scriptTags = code.match(/<script\b[^>]*>/gm)
  if (!scriptTags) {
    return names
  }
  const langRE = new RegExp(`lang=["']${lang}["']`)
  scriptTags.forEach((scriptTag) => {
    if (langRE.test(scriptTag)) {
      const matches = scriptTag.match(moduleRE)
      if (matches) {
        names.push(matches[1])
      }
    }
  })
  return names
}
