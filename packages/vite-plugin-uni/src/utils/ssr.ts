import path from 'path'
import fs from 'fs-extra'

function serializeDefine(define: Record<string, any>): string {
  let res = `{`
  for (const key in define) {
    const val = define[key]
    res += `${JSON.stringify(key)}: ${
      typeof val === 'string' ? `(${val})` : JSON.stringify(val)
    }, `
  }
  return res + `}`
}

export function generateSSREnvCode(define: Record<string, any>): string {
  return fs
    .readFileSync(path.join(__dirname, '../../lib/ssr/env.js'), 'utf8')
    .replace('__DEFINES__', serializeDefine(define))
}

export function generateSSREntryServerCode() {
  return fs.readFileSync(
    path.join(__dirname, '../../lib/ssr/entry-server.js'),
    'utf8'
  )
}
