import { LINEFEED } from '@dcloudio/uni-shared'

const SPACE_UNICODE = {
  ensp: '\u2002',
  emsp: '\u2003',
  nbsp: '\u00a0',
}

export interface DecodeOptions {
  space?: keyof typeof SPACE_UNICODE
  decode?: boolean
}

function normalizeText(text: string, { space, decode }: DecodeOptions) {
  let result = ''
  let isEscape = false
  for (let char of text) {
    if (space && SPACE_UNICODE[space] && char === ' ') {
      char = SPACE_UNICODE[space]
    }
    if (isEscape) {
      if (char === 'n') {
        result += LINEFEED
      } else if (char === '\\') {
        result += '\\'
      } else {
        result += '\\' + char
      }
      isEscape = false
    } else {
      if (char === '\\') {
        isEscape = true
      } else {
        result += char
      }
    }
  }
  if (!decode) {
    return result
  }
  return result
    .replace(/&nbsp;/g, SPACE_UNICODE.nbsp)
    .replace(/&ensp;/g, SPACE_UNICODE.ensp)
    .replace(/&emsp;/g, SPACE_UNICODE.emsp)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

export function parseText(text: string, options: DecodeOptions) {
  return normalizeText(text, options).split(LINEFEED)
}
