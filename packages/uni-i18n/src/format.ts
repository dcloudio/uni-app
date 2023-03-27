export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const defaultDelimiters: [string, string] = ['{', '}']
export default class BaseFormatter {
  _caches: { [key: string]: Array<Token> }

  constructor() {
    this._caches = Object.create(null)
  }

  interpolate(
    message: string,
    values?: Record<string, unknown> | Array<unknown>,
    delimiters: [string, string] = defaultDelimiters
  ): Array<unknown> {
    if (!values) {
      return [message]
    }
    let tokens: Array<Token> = this._caches[message]
    if (!tokens) {
      tokens = parse(message, delimiters)
      this._caches[message] = tokens
    }
    return compile(tokens, values)
  }
}

type Token = {
  type: 'text' | 'named' | 'list' | 'unknown'
  value: string
}

const RE_TOKEN_LIST_VALUE: RegExp = /^(?:\d)+/
const RE_TOKEN_NAMED_VALUE: RegExp = /^(?:\w)+/

export function parse(
  format: string,
  [startDelimiter, endDelimiter]: [string, string]
): Array<Token> {
  const tokens: Array<Token> = []
  let position: number = 0

  let text: string = ''
  while (position < format.length) {
    let char: string = format[position++]
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text })
      }

      text = ''
      let sub: string = ''
      char = format[position++]
      while (char !== undefined && char !== endDelimiter) {
        sub += char
        char = format[position++]
      }
      const isClosed = char === endDelimiter

      const type = RE_TOKEN_LIST_VALUE.test(sub)
        ? 'list'
        : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
        ? 'named'
        : 'unknown'
      tokens.push({ value: sub, type })
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char
    }
  }

  text && tokens.push({ type: 'text', value: text })

  return tokens
}

export function compile(
  tokens: Array<Token>,
  values: Record<string, unknown> | Array<unknown>
): Array<unknown> {
  const compiled: Array<unknown> = []
  let index: number = 0

  const mode: string = Array.isArray(values)
    ? 'list'
    : isObject(values)
    ? 'named'
    : 'unknown'
  if (mode === 'unknown') {
    return compiled
  }

  while (index < tokens.length) {
    const token: Token = tokens[index]
    switch (token.type) {
      case 'text':
        compiled.push(token.value)
        break
      case 'list':
        compiled.push(
          (values as Record<string, unknown>)[parseInt(token.value, 10)]
        )
        break
      case 'named':
        if (mode === 'named') {
          compiled.push((values as Record<string, unknown>)[token.value])
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              `Type of token '${token.type}' and format of value '${mode}' don't match!`
            )
          }
        }
        break
      case 'unknown':
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`Detect 'unknown' type of token!`)
        }
        break
    }
    index++
  }

  return compiled
}
