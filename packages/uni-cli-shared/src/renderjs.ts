import { parseVueRequest } from './vite/utils/url'

const WXS_RE = /vue&type=wxs/
export function isWxs(id: string) {
  return WXS_RE.test(id)
}

const RENDERJS_RE = /vue&type=renderjs/
export function isRenderjs(id: string) {
  return RENDERJS_RE.test(id)
}

export function parseRenderjs(id: string) {
  if (isWxs(id)) {
    return {
      type: 'wxs',
      name: (parseVueRequest(id).query as any).name as string,
    } as const
  }
  if (isRenderjs(id)) {
    return {
      type: 'renderjs',
      name: (parseVueRequest(id).query as any).name as string,
    } as const
  }
  return {
    type: '',
    name: '',
  } as const
}

export function missingModuleName(type: 'wxs' | 'renderjs', code: string) {
  return `<script module="missing module name" lang="${type}">
${code}
</script>`
}
