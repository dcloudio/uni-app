import { default as hash } from 'hash-sum'

export const JS_STYLE_PLACEHOLDER_MARKER = '__js_style_placeholder__'
export function createJsStylePlaceholder(id: string) {
  const hashId = hash(id)
  return JSON.stringify({
    [JS_STYLE_PLACEHOLDER_MARKER]: hashId,
  })
}
export function createJsStylePlaceholderRegExp(id: string) {
  const hashId = hash(id)
  return new RegExp(
    `\\{\\s*"${JS_STYLE_PLACEHOLDER_MARKER}"\\s*:\\s*"${hashId}"\\s*\\}`,
    'g'
  )
}
export const ANY_JS_STYLE_PLACEHOLDER_RE = new RegExp(
  `\\{\\s*"${JS_STYLE_PLACEHOLDER_MARKER}"\\s*:\\s*".+?"\\s*\\}`,
  'g'
)
