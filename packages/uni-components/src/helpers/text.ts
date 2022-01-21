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

export function parseText(text: string, options: DecodeOptions) {
  return text
    .replace(/\\n/g, LINEFEED)
    .split(LINEFEED)
    .map((text) => {
      return normalizeText(text, options)
    })
}

function normalizeText(text: string, { space, decode }: DecodeOptions) {
  if (!text) {
    return text
  }
  if (space && SPACE_UNICODE[space]) {
    text = text.replace(/ /g, SPACE_UNICODE[space])
  }
  if (!decode) {
    return text
  }
  return text
    .replace(/&nbsp;/g, SPACE_UNICODE.nbsp)
    .replace(/&ensp;/g, SPACE_UNICODE.ensp)
    .replace(/&emsp;/g, SPACE_UNICODE.emsp)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}
