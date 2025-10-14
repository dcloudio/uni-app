import { DOM2_APP_PLATFORM, DOM2_APP_TARGET } from './types'

export function getDom2ToString(
  platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET
) {
  if (
    platform === DOM2_APP_PLATFORM.APP_HARMONY &&
    target === DOM2_APP_TARGET.DOM_C
  ) {
    return objToCppString
  }
  return JSON.stringify
}

function objToCppString(
  obj: Record<string, unknown>,
  depth: number = 0
): string {
  const method =
    depth === 0
      ? 'make_style_sheet'
      : depth === 1
      ? 'make_property_map'
      : 'make_styles'
  const entries = Object.entries(obj).map(([key, value]) => {
    const keyString = key.includes('::') ? key : `"${key}"`
    if (depth >= 2) {
      return `{ ${keyString}, ${value} }`
    }
    return `{ ${keyString}, ${objToCppString(
      value as Record<string, unknown>,
      depth + 1
    )} }`
  })
  return `${method}({ ${entries.join(',')} })`
}
