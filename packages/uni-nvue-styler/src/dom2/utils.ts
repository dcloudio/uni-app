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
  if (depth === 0 && Object.keys(obj).length === 0) {
    return '{}'
  }
  const method =
    depth === 0
      ? 'make_style_sheet'
      : depth === 1
      ? 'make_property_map'
      : 'make_styles'
  const entries: string[] = []
  const variableEntries: string[] = []
  Object.entries(obj).forEach(([key, value]) => {
    if (value == 'null') {
      value = 'nullptr'
    }
    const keyString = key.includes('::') ? key : `"${key}"`
    if (depth >= 2) {
      if (key.startsWith('--')) {
        variableEntries.push(`{"${key}", "${value}"}`)
      } else {
        if (keyString[0] === '!') {
          entries.push(
            `{${keyString.slice(1)}, UniCSSPropertyValueImportant(${value})}`
          )
        } else {
          entries.push(`{${keyString}, ${value}}`)
        }
      }
    } else {
      entries.push(
        `{${keyString}, ${objToCppString(
          value as Record<string, unknown>,
          depth + 1
        )}}`
      )
    }
  })
  if (variableEntries.length) {
    entries.unshift(
      `{UniCSSPropertyID::Variable, UniCSSPropertyValueVariable{${variableEntries.join(
        ', '
      )}}}`
    )
  }
  return `${method}({${entries.join(',')}})`
}
