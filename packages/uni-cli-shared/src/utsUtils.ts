import { matchEasycom } from './easycom'
import { camelize, capitalize, normalizeNodeModules, removeExt } from './utils'

export function matchUTSComponent(tag: string) {
  const source = matchEasycom(tag)
  return !!(source && source.includes('uts-proxy'))
}

export function genUTSClassName(fileName: string, prefix: string = 'Gen') {
  return (
    prefix +
    capitalize(
      camelize(
        verifySymbol(
          removeExt(
            normalizeNodeModules(fileName)
              .replace(/[\/|_]/g, '-')
              .replace(/-+/g, '-')
          )
        )
      )
    )
  )
}

function isValidStart(c: string): boolean {
  return !!c.match(/^[A-Za-z_-]$/)
}

function isValidContinue(c: string): boolean {
  return !!c.match(/^[A-Za-z0-9_-]$/)
}

export function verifySymbol(s: string) {
  const chars = Array.from(s)

  if (isValidStart(chars[0]) && chars.slice(1).every(isValidContinue)) {
    return s
  }

  const buf: string[] = []
  let hasStart = false

  for (const c of chars) {
    if (!hasStart && isValidStart(c)) {
      hasStart = true
      buf.push(c)
    } else if (isValidContinue(c)) {
      buf.push(c)
    }
  }

  if (buf.length === 0) {
    buf.push('_')
  }

  return buf.join('')
}
