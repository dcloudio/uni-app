import MagicString from 'magic-string'
import { parse } from '@babel/parser'

import { rewriteConsole } from '../../src/plugins/android/uvue/sfc/compiler/script/rewriteConsole'
import { rewriteDebugError } from '../../src/plugins/android/uvue/sfc/compiler/script/rewriteDebugError'

function assertRewrite(input: string, startLine = 0, startOffset = 0): void {
  const ast = parse(input, {
    plugins: ['typescript'],
    sourceType: 'module',
  }).program
  const s = new MagicString(input)
  const options = {
    fileName: `test.uvue`,
    startLine,
    startOffset,
  }
  rewriteDebugError(ast, s, options)
  rewriteConsole(ast, s, options)
  expect(s.toString()).toMatchSnapshot()
}

describe('rewrite', () => {
  test(`console`, () => {
    assertRewrite(`console.log(1)`)
    assertRewrite(`

console.log()
`)
  })
  assertRewrite(`UTSAndroid.consoleDebugError(JSON.parse('{"a":1}'))`)
  assertRewrite(`
// 变量
const msg = 'Hello!'

// 函数
function log() {
    console.log(msg)
}  
  `)

  test(`JSON.parse`, () => {
    assertRewrite(
      `JSON.parse('{"a":1}');JSON.parseObject('{"a":1}');JSON.parseArray('[1,2,3]')`
    )
    assertRewrite(
      `JSON.parse('{"a":1}');
JSON.parseObject('{"a":1}');
JSON.parseArray('[1,2,3]')`
    )
  })
  test(`decode/encode`, () => {
    assertRewrite(
      `
decodeURI('')
decodeURIComponent('')
encodeURI('')
encodeURIComponent('')
`
    )
  })
})
